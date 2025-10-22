// src/components/modals/RenameFolderModal.jsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { api } from "../../services/folder";
import { useMessage } from "../MessageContext";
import { useError } from "../ErrorContext";
import "./modal.css";

const RenameFolderModal = ({ onClose, onSuccess, folder }) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  const [folderName, setFolderName] = useState(folder.name);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (folder.name === folderName) {
      handleClose();
      return;
    }

    showMessage(`Renaming ${folder.name}...`);

    const result = await api.renameFolder(folder.id, folderName);

    if (result.success) {
      setIsVisible(false);
      setTimeout(() => {
        onSuccess(folder.id, result.data.name);
        showMessage(`Folder ${folder.name} renamed to ${result.data.name}`);
      }, 200);
    } else {
      showError(`Folder Rename Error: ${result.error}`);
      clearMessage();
    }
  };

  return createPortal(
    <div
      className="modal-background"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
      onClick={handleClose}
    >
      <div
        className="name-div"
        style={{
          transform: isVisible ? "scale(1)" : "scale(0.9)",
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.2s ease, opacity 0.2s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="name-header">Rename Folder</h2>
        <form onSubmit={handleSubmit} className="name-form">
          <div>
            <input
              type="text"
              className="name-input"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onFocus={(e) => e.target.select()}
              required
              autoFocus
            />
          </div>
          <div className="name-button-div">
            <button className="name-button" type="button" onClick={handleClose}>
              Cancel
            </button>
            <button className="name-button-ok" type="submit">
              OK
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default RenameFolderModal;
