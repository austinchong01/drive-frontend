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
}) => {
  const { showError } = useError();
  const navigate = useNavigate();

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

  const handleOpen = (e) => {
    e.stopPropagation();
    navigate(`/folders/${folder.id}`);
  };

  const handleRename = (e) => {
    e.stopPropagation();
    onRenameClick();
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    onToggleDropdown(folder.id);
  };

  const isDropdownOpen = openDropdownId === folder.id;

  return (
    <div
      ref={combinedRef}
      {...attributes}
      {...listeners}
      style={{
        border: isOver ? "2px solid purple" : "1px solid blue",
      }}
    >
      <h3>{folder.name}</h3>
      <div onPointerDown={(e) => e.stopPropagation()}>
        <button onClick={toggleDropdown}>...</button>
        {isDropdownOpen && (
          <div>
            <button onClick={handleOpen}>OPEN</button>
            <button onClick={handleRename}>RENAME</button>
            <button onClick={handleDeleteFolder}>DELETE</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;