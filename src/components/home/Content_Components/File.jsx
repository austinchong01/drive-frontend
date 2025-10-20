// src/components/home/Content_Components/File.jsx
import { useDraggable } from "@dnd-kit/core";
import { api } from "../../../services/file";
import { useError } from "../../../contexts/ErrorContext";

const File = ({ file, onDelete, onRenameClick }) => {
  const { showError } = useError();

  // Make this file draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
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

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        border: "1px solid green",
        width: "300px",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <h3>{file.displayName}</h3>
      <p>Size: {file.size} bytes</p>
      <p>Updated: {new Date(file.updatedAt).toLocaleString()}</p>
      <button onClick={handleDownloadFile}>DOWNLOAD</button>
      <button onClick={handleRename}>RENAME</button>
      <button onClick={handleDeleteFile}>DELETE</button>
    </div>
  );
};

export default File;