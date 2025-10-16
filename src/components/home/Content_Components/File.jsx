// src/components/home/Content_Components/File.jsx

import { api } from "../../../services/file";
import { useError } from "../../../contexts/ErrorContext";

const File = ({ file, onDelete, onRenameClick }) => {
  const { showError } = useError();

  const handleDownloadFile = () => {
    const downloadUrl = file.cloudinaryUrl.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(file.displayName)}/`
    );
    window.location.href = downloadUrl;
  };

  const handleDeleteFile = async () => {
    const result = await api.deleteFile(file.id);

    if (result.success) {
      onDelete(file.id);
    } else {
      showError(`Delete File Error: ${result.error}`);
    }
  };

  return (
    <div style={{ border: "1px solid green", width: "300px" }}>
      <h3>{file.displayName}</h3>
      <p>Size: {file.size} bytes</p>
      <p>Updated: {new Date(file.updatedAt).toLocaleString()}</p>
      <button onClick={handleDownloadFile}>DOWNLOAD</button>
      <button onClick={onRenameClick}>RENAME</button>
      <button onClick={handleDeleteFile}>DELETE</button>
    </div>
  );
};

export default File;
