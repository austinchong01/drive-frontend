// src/components/home/Content_Components/Folder.jsx
import { useNavigate } from "react-router-dom";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { api } from "../../../services/folder";
import { useError } from "../../../contexts/ErrorContext";

const Folder = ({ folder, onDelete, onRenameClick }) => {
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

  // Make this folder a drop target
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

  const handleOpen = (e) => {
    e.stopPropagation();
    navigate(`/folders/${folder.id}`);
  };

  return (
    <div
      ref={combinedRef}
      {...attributes}
      {...listeners}
      style={{ 
        border: isOver ? "2px solid green" : "1px solid blue", 
        padding: "10px",
      }}
    >
      <h3>{folder.name}</h3>
      <button onClick={handleOpen}>OPEN</button>
      <button onClick={handleRename}>RENAME</button>
      <button onClick={handleDeleteFolder}>DELETE</button>
    </div>
  );
};

export default Folder;