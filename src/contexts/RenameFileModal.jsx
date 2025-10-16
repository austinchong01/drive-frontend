// src/components/home/RenameFileModal.jsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { api } from "../services/file";
import { useError } from "./ErrorContext";

const RenameFileModal = ({ isOpen, onClose, onSuccess, file }) => {
  const [fileName, setFileName] = useState("");
  const { showError } = useError();

  // Load the file's displayName whenever the file changes
  useEffect(() => {
    setFileName(file.displayName);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await api.updateFileName(file.id, fileName);

    if (result.success) {
      onSuccess(file.id, result.data.displayName);
    } else {
      showError(`File Rename Error: ${result.error}`);
      // onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
      >
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
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default RenameFileModal;