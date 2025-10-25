// src/components/home/SearchContent.jsx
import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { api } from "../../services/api";
import { api as folderApi } from "../../services/folder";
import { api as fileApi } from "../../services/file";
import { useMessage } from "../../contexts/MessageContext";
import { useError } from "../../contexts/ErrorContext";
import FolderList from "./Content_Components/FolderList";
import FileList from "./Content_Components/FileList";

const SearchContent = ({
  query,
  createdFile,
  createdFolder,
  itemDeleted,
  searchTrigger,
}) => {
  const { showMessage } = useMessage();
  const { showError } = useError();
  const [foundFiles, setFoundFiles] = useState([]);
  const [foundFolders, setFoundFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  useEffect(() => {
    const fetchSearchContents = async () => {
      const result = await api.search(query);

      if (result.success) {
        setFoundFolders(result.data.folders);
        setFoundFiles(result.data.files);
      } else {
        showError(`Content Load Error: ${result.error}`);
      }
      setLoading(false);
    };

    fetchSearchContents();
  }, [query, createdFile, createdFolder, searchTrigger, showError]);

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
    } else if (draggedType === "folder") {
      result = await folderApi.updateFolderLoc(draggedItem.id, targetItem.id);
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
      <div className="flex flex-1 flex-col rounded-xl bg-white p-5 gap-7">
        <h2>Search Results for: "{query}"</h2>
        {loading ? (
          <p>Loading search results...</p>
        ) : (
          <>
            <FolderList
              initialFolders={foundFolders}
              createdFolder={undefined}
              onFolderDelete={itemDeleted}
              openDropdownId={openDropdownId}
              onToggleDropdown={setOpenDropdownId}
              highlightId={highlightId}
              onToggleHighlight={setHighlightId}
            />
            <FileList
              initialFiles={foundFiles}
              createdFile={undefined}
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

export default SearchContent;
