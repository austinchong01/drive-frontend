// src/components/home/RenameFolderModal.jsx

import { useState } from "react";
import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";

const RenameFolderModal = ({ isOpen, onClose, onSuccess, folder }) => {
  const [folderName, setFolderName] = useState(folder.name);
  const { showError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await api.renameFolder(folder.id, folderName);

    if (result.success) {
      setFolderName("");
      onSuccess();
    } else {
      showError(`Folder Rename Error: ${result.error}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        minWidth: "300px"
      }}>
        <h2>Rename Folder</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Folder Name:</label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button type="submit">Rename</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default RenameFolderModal;