// src/contexts/modals/NewFolderModal.jsx

/**
 * New Folder Creation Modal
 * Modal dialog for creating a new folder within the current directory.
 * Validates that the name is unique.
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onSuccess - Callback with (newFolder) on successful creation
 */

import { useState, useEffect } from "react";
import { api } from "../../services/folder";
import { useMessage } from "../MessageContext";
import { useError } from "../ErrorContext";
import { useParams } from "react-router-dom";
import "./modal.css";

const NewFolderModal = ({ isOpen, onClose, onSuccess }) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  const [folderName, setFolderName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  let { folderId } = useParams();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    // Fade-out animation
    setIsVisible(false);
    setTimeout(() => {
      setFolderName("");
      onClose();
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (folderId === undefined) folderId = "";
    showMessage(`Creating Folder ${folderName}...`);
    const result = await api.createFolder(folderName, folderId);

    if (result.success) {
      // Fade-out animation
      setIsVisible(false);
      setTimeout(() => {
        setFolderName("");
        onSuccess(result.data.folder);
        showMessage(`Created Folder ${result.data.folder.name}`);
      }, 200);
    } else {
      showError(`Folder Creation Error: ${result.error}`);
      clearMessage();
    }
  };

  if (!isOpen) return null;

  return (
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
        <h2 className="name-header">New Folder</h2>
        <form onSubmit={handleSubmit} className="name-form">
          <div>
            <input
              type="text"
              className="name-input"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="name-button-div">
            <button className="name-button" type="button" onClick={handleClose}>
              Cancel
            </button>
            <button className="name-button" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFolderModal;