// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { api } from "../../services/folder";
import { api as fileApi } from "../../services/file";
import { useMessage } from "../../contexts/MessageContext";
import { useError } from "../../contexts/ErrorContext";
import FolderList from "./Content_Components/FolderList";
import FileList from "./Content_Components/FileList";
import Crumbs from "./Content_Components/Crumbs";

const Content = ({ createdFolder, createdFile, itemDeleted }) => {
  const { showMessage } = useMessage();
  const { showError } = useError();
  let { folderId } = useParams();
  const [initialFiles, setInitialFiles] = useState([]);
  const [initialFolders, setInitialFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  // load all files and folders in FOLDER
  useEffect(() => {
    if (folderId === undefined) folderId = "";
    const fetchContents = async () => {
      setLoading(true);
      const result = await api.getFolderContents(folderId);

      if (result.success) {
        setInitialFolders(result.data.subfolders);
        setInitialFiles(result.data.files);
      } else {
        showError(`Content Load Error: ${result.error}`);
      }
      setLoading(false);
    };

    fetchContents();
  }, [folderId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
      setHighlightId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveItem(event.active.data.current);
  };

  const handleDragEnd = async (event) => {
    setActiveItem(null);

    const { active, over } = event;

    // If not dropped over anything, do nothing
    if (!over) return;

    const draggedType = active.data.current.type;
    const draggedItem = active.data.current.item;
    const targetType = over.data.current.type;
    const targetItem = over.data.current.item;

    // Cannot drag into files
    if (targetType === "file") return;
    // Don't drop a folder into itself
    if (draggedType === "folder" && draggedItem.id === targetItem.id) return;

    let result;
    if (draggedType === "file") {
      result = await fileApi.updateFileLoc(draggedItem.id, targetItem.id);
      if (result.success)
        setInitialFiles((prev) => prev.filter((f) => f.id !== draggedItem.id));
    } else if (draggedType === "folder") {
      result = await api.updateFolderLoc(draggedItem.id, targetItem.id);
      if (result.success)
        setInitialFolders((prev) =>
          prev.filter((f) => f.id !== draggedItem.id)
        );
    }

    if (!result.success) {
      showError(`Move Error: ${result.error}`);
    } else {
      showMessage(
        `${active.data.current.name} has been moved to ${over.data.current.name}`
      );
    }
  };

  const handleDragCancel = () => {
    setActiveItem(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
    >
      <div style={{ flex: 1, padding: "20px", border: "1px solid black" }}>
        <Crumbs folderId={folderId} />
        {loading ? (
          <p>Loading contents...</p>
        ) : (
          <>
            <FolderList
              initialFolders={initialFolders}
              createdFolder={createdFolder}
              onFolderDelete={itemDeleted}
              openDropdownId={openDropdownId}
              onToggleDropdown={setOpenDropdownId}
              highlightId={highlightId}
              onToggleHighlight={setHighlightId}
            />
            <FileList
              initialFiles={initialFiles}
              createdFile={createdFile}
              onFileDelete={itemDeleted}
              openDropdownId={openDropdownId}
              onToggleDropdown={setOpenDropdownId}
              highlightId={highlightId}
              onToggleHighlight={setHighlightId}
            />
          </>
        )}
      </div>

      <DragOverlay>
        {activeItem ? (
          <div
            style={{
              borderRadius: "4px",
              cursor: "grabbing",
            }}
          >
            {activeItem.type === "folder" ? "📁" : "📄"}
            {activeItem.item.name || activeItem.item.displayName}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Content;
