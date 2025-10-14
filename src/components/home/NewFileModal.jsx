// src/components/home/NewFileModal.jsx
import { api } from "../../services/homeAPI";
import { useError } from "../../contexts/ErrorContext";
import { useParams } from "react-router-dom";

const NewFileModal = ({ isOpen, onClose, onSuccess }) => {
  const { showError } = useError();
  const { folderId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const result = await api.uploadFile(formData, folderId);

    if (result.success) {
      e.target.reset();
      onSuccess();
    } else {
      showError(`File Upload Error: ${result.error}`);
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
              required
            />
          </div>
          <div>
            <label>Select File:</label>
            <input
              type="file"
              name="image"
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