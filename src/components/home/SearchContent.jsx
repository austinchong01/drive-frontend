// src/components/home/SearchContent.jsx
import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
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

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
      setHighlightId(null);
    };

    document.addEventListener("click", handleClickOutside);
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

    const targetItem = over.data.current.item;

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const cursorOffsetModifier = ({
    transform,
    activatorEvent,
    activeNodeRect,
  }) => {
    if (!activeNodeRect || !activatorEvent) {
      return transform;
    }

    const initialCursorX = activatorEvent.clientX;
    const initialCursorY = activatorEvent.clientY;
    const elementLeft = activeNodeRect.left;
    const elementTop = activeNodeRect.top;

    return {
      x: initialCursorX - elementLeft + transform.x,
      y: initialCursorY - elementTop + transform.y,
    };
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      sensors={sensors}
      modifiers={[cursorOffsetModifier]}
      collisionDetection={pointerWithin}
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

      <DragOverlay
        dropAnimation={{
          duration: 100,
          easing: "ease",
          keyframes: (values) => [{ opacity: 1 }, { opacity: 0 }],
        }}
      >
        {activeItem ? (
          <div className="flex items-center gap-4 p-2 font-medium w-50 rounded-xl bg-white shadow-[0_1px_5px_2px_rgba(0,0,0,0.3)]">
            {activeItem.image}
            {activeItem.item.name || activeItem.item.displayName}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SearchContent;
