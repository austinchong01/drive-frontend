// src/components/home/NewFileModal.jsx
import { useState } from "react";
import { api } from "../../services/file";
import { useMessage } from "../MessageContext";
import { useError } from "../ErrorContext";
import { useParams } from "react-router-dom";

const NewFileModal = ({ isOpen, onClose, onSuccess }) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  const [selectedFileName, setSelectedFileName] = useState("");
  let { folderId } = useParams();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const lastDotIndex = file.name.lastIndexOf(".");
    const nameWithoutExtension =
      lastDotIndex > 0
        ? file.name.substring(0, lastDotIndex)
        : file.name;
    if (file) {
      setSelectedFileName(nameWithoutExtension);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (folderId === undefined) folderId = "";
    showMessage(`Creating file...`);
    const result = await api.createFile(formData, folderId);

    if (result.success) {
      e.target.reset();
      setSelectedFileName("")
      onSuccess(result.data.file);
      showMessage(`Created File ${result.data.file.displayName}`);
    } else {
      showError(`File Upload Error: ${result.error}`);
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
        <h2>Upload New File</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>File Name:</label>
            <input
              type="text"
              name="name"
              autoFocus
              value={selectedFileName}
              onChange={(e) => setSelectedFileName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Select File:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Upload</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewFileModal;
