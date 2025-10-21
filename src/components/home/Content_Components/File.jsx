// src/components/home/Content_Components/File.jsx
import { useDraggable } from "@dnd-kit/core";
import { api } from "../../../services/file";
import { useError } from "../../../contexts/ErrorContext";

const File = ({
  file,
  onDelete,
  onRenameClick,
  openDropdownId,
  onToggleDropdown,
  highlightId,
  onToggleHighlight,
}) => {
  const { showError } = useError();

  const isHighlighted = highlightId === file.id;

  // Make this file draggable
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `file-${file.id}`,
    data: {
      type: "file",
      item: file,
    },
  });

  const handleDownloadFile = (e) => {
    e.stopPropagation();
    const downloadUrl = file.cloudinaryUrl.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(file.displayName)}/`
    );
    window.location.href = downloadUrl;
  };

  const handleDeleteFile = async (e) => {
    e.stopPropagation();
    const result = await api.deleteFile(file.id);

    if (result.success) {
      onDelete(file.id);
    } else {
      showError(`Delete File Error: ${result.error}`);
    }
  };

  const handleRename = (e) => {
    e.stopPropagation();
    onRenameClick();
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    onToggleDropdown(file.id);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (isHighlighted) {
      window.open(file.cloudinaryUrl, '_blank');
      // need a better preview for certain file types
    } else {
      onToggleHighlight(file.id);
    }
  };

  const isDropdownOpen = openDropdownId === file.id;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      style={{
        border: "1px solid green",
        backgroundColor: isHighlighted ? "#e0e0e0" : "transparent",
        opacity: isDragging ? 0.5 : 1, // Visual feedback
      }}
    >
      <h3>{file.displayName}</h3>
      <p>Size: {file.size} bytes</p>
      <p>Updated: {new Date(file.updatedAt).toLocaleString()}</p>
      <div onPointerDown={(e) => e.stopPropagation()}>
        <button onClick={toggleDropdown}>...</button>
        {isDropdownOpen && (
          <div>
            <button onClick={handleDownloadFile}>DOWNLOAD</button>
            <button onClick={handleRename}>RENAME</button>
            <button onClick={handleDeleteFile}>DELETE</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default File;
