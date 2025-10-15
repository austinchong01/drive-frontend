// src/components/home/File.jsx

import { useState } from "react";
import { api } from "../../services/file";
import { useError } from "../../contexts/ErrorContext";
import RenameFileModal from "./RenameFileModal";

const File = ({ file, onDelete, onRename }) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
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

  const handleRenameSuccess = (newName) => {
    onRename(file.id, newName);
    setIsRenameModalOpen(false);
  };

  return (
    <>
      <div style={{ border: "1px solid green", width: "300px" }}>
        <h3>{file.displayName}</h3>
        <p>Size: {file.size} bytes</p>
        <p>Updated: {new Date(file.updatedAt).toLocaleString()}</p>
        <button onClick={handleDownloadFile}>DOWNLOAD</button>
        <button onClick={() => setIsRenameModalOpen(true)}>RENAME</button>
        <button onClick={handleDeleteFile}>DELETE</button>
      </div>

      <RenameFileModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        onSuccess={handleRenameSuccess}
        file={file}
      />
    </>
  );
};

export default File;
