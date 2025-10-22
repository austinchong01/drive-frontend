import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useMessage } from "../MessageContext";
import "./modal.css";

const PreviewModal = ({ onClose, file }) => {
  const { showMessage } = useMessage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const getFileCategory = (mimetype) => {
    if (mimetype.startsWith("image/")) return "image";
    if (mimetype.startsWith("video/")) return "video";
    if (mimetype.startsWith("audio/")) return "audio";
    if (mimetype === "application/pdf") return "document";
    return "other";
  };

  const handleDownloadFile = (e) => {
    e.stopPropagation();
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
      className="modal-background"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.1s ease",
      }}
      onClick={handleClose}
    >
      <button
        style={{
          position: "absolute",
          top: "50px",
          right: "50px",
          width: "75px",
          height: "75px",
          padding: "0px",
          borderRadius: "50%",
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
          transition: "background 0.1s ease",
          zIndex: "1001"
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        onClick={handleDownloadFile}
      >
        <img
          src="/images/download.svg"
          alt="Download"
          style={{
            width: "70%",
            filter: "brightness(0) invert(1)",
          }}
        />
      </button>

      <div
        style={{
          backgroundColor: "#4c494c",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 12px 5px rgba(0, 0, 0, .2)",
        }}
        onClick={(e) => e.stopPropagation()}
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
            width="900px"
            height="900px"
          />
        )}
        {category === "other" && <p>No preview available</p>}
      </div>
    </div>,
    document.body
  );
};

export default PreviewModal;