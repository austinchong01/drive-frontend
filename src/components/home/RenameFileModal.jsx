// src/components/home/RenameFileModal.jsx

import { useState, useEffect } from "react";
import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";

const RenameFileModal = ({ isOpen, onClose, onSuccess, file }) => {
  const [fileName, setFileName] = useState(file.displayName);
  const { showError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await api.renameFile(file.id, fileName);

    if (result.success) {
        setFileName("");
      onSuccess(result.data.displayName);
    } else {
      showError(`File Rename Error: ${result.error}`);
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
        <h2>Rename File</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>File Name:</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
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

export default RenameFileModal;