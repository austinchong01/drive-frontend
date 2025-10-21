// src/components/home/Content_Components/Folder.jsx
import { useNavigate } from "react-router-dom";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { api } from "../../../services/folder";
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
    },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `folder-drop-${folder.id}`,
    data: {
      type: "folder",
      item: folder,
    },
  });

  const combinedRef = (node) => {
    setDragRef(node);
    setDropRef(node);
  };

  const handleDeleteFolder = async (e) => {
    e.stopPropagation();
    const result = await api.deleteFolder(folder.id);

    if (result.success) {
      onDelete(folder.id);
    } else {
      showError(`Delete Folder Error: ${result.error}`);
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
        border: isOver ? "2px solid purple" : "1px solid blue",
        backgroundColor: isHighlighted ? "#e0e0e0" : "transparent",
        opacity: isDragging ? 0.5 : 1, // Visual feedback
      }}
    >
      <h3>{folder.name}</h3>
      <div onPointerDown={(e) => e.stopPropagation()}>
        <button onClick={toggleDropdown}>...</button>
        {isDropdownOpen && (
          <div>
            <button onClick={handleRename}>RENAME</button>
            <button onClick={handleDeleteFolder}>DELETE</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
