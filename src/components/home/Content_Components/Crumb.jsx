// src/components/home/Content_Components/Folder.jsx
import { useNavigate } from "react-router-dom";
import { useDroppable } from "@dnd-kit/core";
import { useError } from "../../../contexts/ErrorContext";

const Crumb = ({ folder }) => {
  const navigate = useNavigate();

  const { setNodeRef, isOver } = useDroppable({
    id: `folder-drop-${folder.id}`,
    data: {
      type: "folder",
      item: folder,
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (folder.name == "root") navigate("/home");
    else navigate(`/folders/${folder.id}`);
  };

  return (
    <span
      ref={setNodeRef}
      style={{
        color: isOver ? "purple" : "blue",
      }}
      onClick={handleClick}
    >
      {folder.name}
    </span>
  );
};

export default Crumb;
