// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  pointerWithin,
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
  const [dragSuccess, setDragSuccess] = useState(false);
  const [draggedFolderId, setDraggedFolderId] = useState(null);
  const [draggedFileId, setDraggedFileId] = useState(null);
  const [folderCount, setFolderCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    if (folderId === undefined) folderId = "";
    setLoading(true);
    setDraggedFolderId(null);
    setDraggedFileId(null);
    const fetchContents = async () => {
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

    setDragSuccess(true);

    const draggedType = active.data.current.type;
    const draggedItem = active.data.current.item;

    const targetItem = over.data.current.item;

    let result;
    if (draggedType === "file") {
      result = await fileApi.updateFileLoc(draggedItem.id, targetItem.id);
      if (result.success) setDraggedFileId(draggedItem.id);
    } else if (draggedType === "folder") {
      result = await api.updateFolderLoc(draggedItem.id, targetItem.id);
      if (result.success) setDraggedFolderId(draggedItem.id);
    }

    if (!result.success) {
      showError(`Move Error: ${result.error}`);
    } else {
      showMessage(
        `${active.data.current.name} has been moved to ${over.data.current.name}`
      );
    }
    setDragSuccess(false);
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
      collisionDetection={pointerWithin}
    >
      <div className="rounded-xl bg-white mr-20 min-h-0 w-full min-w-0 overflow-hidden">
        {loading ? (
          <p className="text-center mt-50">Loading contents...</p>
        ) : (
          <div className="flex flex-col px-5 pb-5 overflow-auto h-full min-w-205">
            {folderId === undefined && (
              <h1 className="sticky top-0 w-full py-5 text-3xl bg-white z-10">
                Welcome to Drive
              </h1>
            )}

            {folderId && <Crumbs folderId={folderId} />}
            <FolderList
              initialFolders={initialFolders}
              createdFolder={createdFolder}
              onFolderDelete={itemDeleted}
              openDropdownId={openDropdownId}
              onToggleDropdown={setOpenDropdownId}
              highlightId={highlightId}
              onToggleHighlight={setHighlightId}
              draggedFolderId={draggedFolderId}
              onCountChange={setFolderCount}
            />
            <FileList
              initialFiles={initialFiles}
              createdFile={createdFile}
              onFileDelete={itemDeleted}
              openDropdownId={openDropdownId}
              onToggleDropdown={setOpenDropdownId}
              highlightId={highlightId}
              onToggleHighlight={setHighlightId}
              draggedFileId={draggedFileId}
              onCountChange={setFileCount}
            />

            {folderCount === 0 && fileCount === 0 && (
              <div className="flex flex-col h-full items-center gap-1 mt-70">
                <img
                  src="/images/emptyHome.svg"
                  alt="Empty Home"
                  className="w-70"
                />
                <h2 className="text-xl text-gray-600">
                  Use the "New" buttons to add your files and folders
                </h2>
              </div>
            )}
          </div>
        )}
      </div>

      <DragOverlay
        modifiers={[cursorOffsetModifier]}
        dropAnimation={
          dragSuccess
            ? {
                duration: 100,
                easing: "ease",
                keyframes: (values) => [{ opacity: 1 }, { opacity: 0 }],
              }
            : undefined
        }
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

export default Content;
