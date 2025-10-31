// src/components/home/Content_Components/Crumb.jsx

/**
 * Breadcrumb Component
 * Clickable breadcrumb item that acts as both navigation link and drop target.
 * Highlights when items are dragged over it for visual feedback.
 * 
 * @param {Object} folder - Folder object containing id and name
 */

import { useNavigate } from "react-router-dom";
import { useDroppable } from "@dnd-kit/core";

const Crumb = ({ folder }) => {
  const navigate = useNavigate();

  const { setNodeRef, isOver } = useDroppable({
    id: `folder-drop-${folder.id}`,
    data: {
      type: "folder",
      item: folder,
      name: folder.name,
    },
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (folder.name === "root") navigate("/home");
    else navigate(`/folders/${folder.id}`);
  };

  return (
    <span
      ref={setNodeRef}
      onClick={handleClick}
      className={`cursor-pointer px-4 py-2 rounded-full ${
        isOver ? "outline outline-blue-700 bg-blue-100 hover:bg-blue-100" : "hover:bg-gray-200"
      } `}
    >
      {folder.name === "root" ? "My Drive" : folder.name}
    </span>
  );
};

export default Crumb;