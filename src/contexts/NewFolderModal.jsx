// src/components/home/NewFolderModal.jsx
import { useState } from "react";
import { api } from "../services/folder";
import { useMessage } from "../contexts/MessageContext";
import { useError } from "./ErrorContext";
import { useParams } from "react-router-dom";

const NewFolderModal = ({ isOpen, onClose, onSuccess }) => {
  const [folderName, setFolderName] = useState("");
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  let { folderId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (folderId === undefined) folderId = "";
    showMessage(`Creating Folder ${folderName}...`);
    const result = await api.createFolder(folderName, folderId);

    if (result.success) {
      setFolderName("");
      onSuccess(result.data.folder);
      showMessage(`Created Folder ${result.data.folder.name}`)
    } else {
      showError(`Folder Creation Error: ${result.error}`);
      clearMessage();
    }
  };

  if (!isOpen) return null;

  return (
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
        <h2>Create New Folder</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Folder Name:
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                required
                autoFocus
              />
            </label>
          </div>
          <button type="submit">Create</button>
          <button
            type="button"
            onClick={() => {
              setFolderName("");
              onClose();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewFolderModal;
