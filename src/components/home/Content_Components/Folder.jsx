// src/components/home/Content_Components/Folder.jsx
import { Link } from "react-router-dom";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { api } from "../../../services/folder";
import { useError } from "../../../contexts/ErrorContext";

const Folder = ({ folder, onDelete, onRenameClick }) => {
  const { showError } = useError();

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

  const handleDeleteFolder = async () => {
    const result = await api.deleteFolder(folder.id);

    if (result.success) {
      onDelete(folder.id);
    } else {
      showError(`Delete Folder Error: ${result.error}`);
    }
  };

return (
  <div
    ref={combinedRef}
    {...attributes}
    {...listeners}
    style={{ 
      border: isOver ? "2px solid green" : "1px solid blue", 
      padding: "10px",
      // opacity: isDragging ? 0.5 : 1,
      // backgroundColor: isOver ? "#e8f5e9" : "transparent",
    }}
  >
    <h3>
      <Link to={`/folders/${folder.id}`}>{folder.name}</Link>
    </h3>
    <button onClick={onRenameClick}>RENAME</button>
    <button onClick={handleDeleteFolder}>DELETE</button>
  </div>
);
};

export default Folder;
