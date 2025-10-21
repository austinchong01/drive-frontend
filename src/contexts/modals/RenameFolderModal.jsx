// src/components/modals/RenameFolderModal.jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import { api } from "../../services/folder";
import { useMessage } from "../MessageContext";
import { useError } from "../ErrorContext";

const RenameFolderModal = ({ onClose, onSuccess, folder }) => {
  const [folderName, setFolderName] = useState(folder.name);
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (folder.name === folderName) {
      onClose();
      return;
    }

    showMessage(`Renaming ${folder.name}...`);

    const result = await api.renameFolder(folder.id, folderName);

    if (result.success) {
      onSuccess(folder.id, result.data.name);
      onClose();
      showMessage(`Folder ${folder.name} renamed to ${result.data.name}`);
    } else {
      showError(`Folder Rename Error: ${result.error}`);
      clearMessage();
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
        <h2>Rename Folder</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Folder Name:</label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onFocus={(e) => e.target.select()}
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

export default RenameFolderModal;
