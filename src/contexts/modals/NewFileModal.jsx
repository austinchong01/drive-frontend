// src/components/home/NewFileModal.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/file";
import { useMessage } from "../MessageContext";
import { useError } from "../ErrorContext";
import { useParams } from "react-router-dom";
import "./modal.css";

const NewFileModal = ({ isOpen, onClose, onSuccess }) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  let { folderId } = useParams();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedFileName("");
      onClose();
    }, 200);
  };

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
    console.log(e.target)

    const formData = new FormData(e.target);
    if (folderId === undefined) folderId = "";
    showMessage(`Creating file...`);
    const result = await api.createFile(formData, folderId);

    if (result.success) {
      setIsVisible(false);
      setTimeout(() => {
        setSelectedFileName("");
        onSuccess(result.data.file);
        showMessage(`Created File ${result.data.file.displayName}`);
      }, 200);
    } else {
      showError(`File Upload Error: ${result.error}`);
      clearMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-background"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.1s ease",
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
        <h2 className="name-header">Upload File</h2>
        <form onSubmit={handleSubmit} className="name-form">
          <div>
            <input
              type="text"
              name="name"
              className="name-input"
              placeholder="Filename"
              value={selectedFileName}
              onChange={(e) => setSelectedFileName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="name-button-div">
            <button className="name-button" type="button" onClick={handleClose}>
              Cancel
            </button>
            <button className="name-button" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFileModal;
