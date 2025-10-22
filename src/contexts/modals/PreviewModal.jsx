// src/components/home/NewFolderModal.jsx
import { createPortal } from "react-dom";
import { useMessage } from "../MessageContext";

const PreviewModal = ({ onClose, file }) => {
  const { showMessage } = useMessage();
  const getFileCategory = (mimetype) => {
    if (mimetype.startsWith("image/")) return "image";
    if (mimetype.startsWith("video/")) return "video";
    if (mimetype.startsWith("audio/")) return "audio";
    if (mimetype === "application/pdf") return "document";
    return "other";
  };

  const handleDownloadFile = (e) => {
    const downloadUrl = file.cloudinaryUrl.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(file.displayName)}/`
    );
    showMessage(`${file.displayName} download started...`);
    window.location.href = downloadUrl;
  };

  const category = getFileCategory(file.mimetype);
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#4c494c",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 12px 5px rgba(0, 0, 0, .2)",
        }}
      >
        {category === "image" && (
          <img
            src={file.cloudinaryUrl}
            alt="Preview"
            width="100%"
            height="100%"
          />
        )}
        {category === "video" && (
          <video
            src={file.cloudinaryUrl}
            controls
            alt="Preview"
            width="100%"
            height="100%"
          />
        )}
        {category === "audio" && (
          <audio src={file.cloudinaryUrl} controls alt="Preview" />
        )}
        {category === "document" && (
          <iframe
            src={file.cloudinaryUrl}
            title="Preview"
            alt="Preview"
            width="900px" // change to VW/ VH
            height="900px"
          />
        )}
        {category === "other" && <p>No preview available</p>}
        <button onClick={handleDownloadFile}>DOWNLOAD</button>
      </div>
    </div>,
    document.body
  );
};

export default PreviewModal;
