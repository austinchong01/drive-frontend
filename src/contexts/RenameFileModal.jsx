// src/components/modals/RenameFileModal.jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import { api } from "../services/file";
import { useError } from "../contexts/ErrorContext";

const RenameFileModal = ({ onClose, onSuccess, file }) => {
  const [fileName, setFileName] = useState(file.displayName);
  const { showError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await api.updateFileName(file.id, fileName);

    if (result.success) {
      onSuccess(file.id, result.data.displayName);
      onClose();
    } else {
      showError(`File Rename Error: ${result.error}`);
      onClose(); // Close modal after error (or remove this line to keep it open)
    }
  };

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
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
        onClick={(e) => e.stopPropagation()}
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