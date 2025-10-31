// src/contexts/modals/RenameFileModal.jsx

/**
 * Rename File Modal
 * Modal dialog for renaming files.
 * Validates that the new name is unique.
 * 
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onSuccess - Callback with (fileId, newName) on successful rename
 * @param {Object} file - File object containing id and displayName
 */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { api } from "../../services/file";
import { useMessage } from "../MessageContext";
import { useError } from "../ErrorContext";
import "./modal.css";

const RenameFileModal = ({ onClose, onSuccess, file }) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  const [fileName, setFileName] = useState(file.displayName);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Fade-out animation
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Skip API if name unchanged
    if (file.displayName === fileName) {
      handleClose();
      return;
    }

    showMessage(`Renaming ${file.displayName}...`);

    const result = await api.renameFile(file.id, fileName);

    if (result.success) {
      // Fade-out animation
      setIsVisible(false);
      setTimeout(() => {
        onSuccess(file.id, result.data.displayName);
        showMessage(
        `File ${file.displayName} renamed to ${result.data.displayName}`
      );
      }, 200);
    } else {
      showError(`File Rename Error: ${result.error}`);
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
        <h2 className="name-header">Rename File</h2>
        <form onSubmit={handleSubmit} className="name-form">
          <div>
            <input
              type="text"
              className="name-input"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
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

export default RenameFileModal;