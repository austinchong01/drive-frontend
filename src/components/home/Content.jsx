// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { api } from "../../services/folder";
import { api as fileApi } from "../../services/file";
import { useError } from "../../contexts/ErrorContext";
import FolderList from "./Content_Components/FolderList";
import FileList from "./Content_Components/FileList";
import Crumbs from "./Content_Components/Crumbs";

const Content = ({ createdFolder, createdFile, itemDeleted }) => {
  const { showError } = useError();
  let { folderId } = useParams();
  const [initialFiles, setInitialFiles] = useState([]);
  const [initialFolders, setInitialFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

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
        showError(`Failed to load contents: ${result.error}`);
      }
      setLoading(false);
    };

    fetchContents();
  }, [folderId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
    };

    document.addEventListener("click", (handleClickOutside));
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
    // if (draggedType === "folder" && draggedItem.id === targetItem.id) return;

    let result;
    if (draggedType === "file") {
      result = await fileApi.updateFileLoc(draggedItem.id, targetItem.id);
      if (result.success) {
        setInitialFiles((prev) => prev.filter((f) => f.id !== draggedItem.id));
        showError(`File moved successfully!`);
      }
    } else if (draggedType === "folder") {
      result = await api.updateFolderLoc(draggedItem.id, targetItem.id);
      if (result.success) {
        setInitialFolders((prev) =>
          prev.filter((f) => f.id !== draggedItem.id)
        );
        showError(`Folder moved successfully!`);
      }
    }

    if (!result.success) showError(`Failed to move: ${result.error}`);
  };

  const handleDragCancel = () => {
    setActiveItem(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={(handleDragCancel)}
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
            />
            <FileList
              initialFiles={initialFiles}
              createdFile={createdFile}
              onFileDelete={itemDeleted}
              openDropdownId={openDropdownId}
              onToggleDropdown={setOpenDropdownId}
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
