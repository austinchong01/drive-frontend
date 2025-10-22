// src/components/home/Content_Components/File.jsx
import { useDraggable } from "@dnd-kit/core";
import { api } from "../../../services/file";
import { useMessage } from "../../../contexts/MessageContext";
import { useError } from "../../../contexts/ErrorContext";
import { useModal } from "../../../contexts/ModalContext";

const File = ({
  file,
  onDelete,
  onRenameClick,
  openDropdownId,
  onToggleDropdown,
  highlightId,
  onToggleHighlight,
}) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  const { openPreviewModal } = useModal();

  const isHighlighted = highlightId === file.id;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `file-${file.id}`,
    data: {
      type: "file",
      item: file,
      name: file.displayName,
    },
  });

  const handleDownloadFile = (e) => {
    e.stopPropagation();
    const downloadUrl = file.cloudinaryUrl.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(file.displayName)}/`
    );
    console.log(downloadUrl)
    showMessage(`${file.displayName} download started...`);
    window.location.href = downloadUrl;
  };

  const handleDeleteFile = async (e) => {
    e.stopPropagation();
    showMessage(`Deleting ${file.displayName}...`);
    const result = await api.deleteFile(file.id);

    if (result.success) {
      showMessage(`Delete File ${file.displayName}`);
      onDelete(file.id);
    } else {
      showError(`Delete File Error: ${result.error}`);
      clearMessage();
    }
  };

  const handleRename = (e) => {
    e.stopPropagation();
    onRenameClick();
  };

  const toggleDropdown = (e) => {
    onToggleDropdown(file.id);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onToggleHighlight(file.id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    openPreviewModal(file);
  };

  const isDropdownOpen = openDropdownId === file.id;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
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
