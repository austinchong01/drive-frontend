// src/components/home/NewFolderModal.jsx
import { useState } from "react";
import { useMessage } from "../MessageContext";
import { useError } from "../ErrorContext";

const PreviewModal = ({ isOpen, onClose, cloudinaryUrl }) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  let { folderId } = useParams();

  const handleSubmit = async (e) => {
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
        <h2>Preview</h2>

      </div>
    </div>
  );
};

export default PreviewModal;
