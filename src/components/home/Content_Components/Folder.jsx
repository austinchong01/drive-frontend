// src/components/home/Content_Components/Folder.jsx
import { useNavigate } from "react-router-dom";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { api } from "../../../services/folder";
import { useMessage } from "../../../contexts/MessageContext";
import { useError } from "../../../contexts/ErrorContext";

const Folder = ({
  folder,
  onDelete,
  onRenameClick,
  openDropdownId,
  onToggleDropdown,
  highlightId,
  onToggleHighlight,
}) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  const navigate = useNavigate();

  const isHighlighted = highlightId === folder.id;

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    isDragging,
  } = useDraggable({
    id: `folder-${folder.id}`,
    data: {
      type: "folder",
      item: folder,
      name: folder.name,
    },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `folder-drop-${folder.id}`,
    data: {
      type: "folder",
      item: folder,
      name: folder.name,
    },
  });

  const combinedRef = (node) => {
    setDragRef(node);
    setDropRef(node);
  };

  const handleDeleteFolder = async (e) => {
    e.stopPropagation();
    showMessage(`Deleting ${folder.name}...`);
    const result = await api.deleteFolder(folder.id);

    if (result.success) {
      showMessage(`Delete Folder ${folder.name}`);
      onDelete(folder.id);
    } else {
      showError(`Delete Folder Error: ${result.error}`);
      clearMessage();
    }
  };

  const handleRename = (e) => {
    e.stopPropagation();
    onRenameClick();
  };

  const toggleDropdown = (e) => {
    onToggleDropdown(folder.id);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onToggleHighlight(folder.id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    navigate(`/folders/${folder.id}`);
  };

  const isDropdownOpen = openDropdownId === folder.id;

  return (
    <div
      ref={combinedRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        border: isOver ? "2px solid purple" : "none",
        opacity: isDragging ? 0.5 : 1,
      }}
      className={`flex rounded-lg p-3 ${
        isHighlighted ? "bg-[#c2e7ff]" : "bg-[#e9eef6] hover:bg-[#5f636833]"
      }`}
    >
      <div className="flex gap-2 items-center">
        <img src="/images/folder.svg" alt="folder" className="w-[25px]" />
        <h3>{folder.name}</h3>
      </div>

      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="ml-auto items-center"
      >
        <img
          src="/images/more.svg"
          alt="more"
          onClick={toggleDropdown}
          className="w-[25px] cursor-pointer"
        />
        {isDropdownOpen && (
          <div className="absolute flex flex-col bg-white border border-gray-300 rounded shadow-md z-10 origin-top animate-slideDown">
            <button
              onClick={handleRename}
              className="flex items-center gap-2 text-left hover:bg-gray-300 px-4 py-2"
            >
              <img
                src="/images/rename.svg"
                alt="rename"
                className="w-4 shrink-0"
              />
              <span>Rename</span>
            </button>
            <button
              onClick={handleDeleteFolder}
              className="flex items-center gap-2 text-left hover:bg-red-200 px-4 py-2"
            >
              <img
                src="/images/trash.svg"
                alt="delete"
                className="w-4 shrink-0"
              />
              <span>Move to trash</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
