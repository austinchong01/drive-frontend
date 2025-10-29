import { useEffect, useState } from "react";
import { useMessage } from "./MessageContext";

const MessageToast = () => {
  const { message, messageKey, clearMessage } = useMessage();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (message) {
      setIsExiting(false);

      const timer = setTimeout(() => {
        setIsExiting(true);

        setTimeout(() => {
          clearMessage();
        }, 100);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [messageKey, clearMessage]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        backgroundColor: "#000000",
        color: "white",
        padding: "10px 20px",
        borderRadius: "2px",
        zIndex: 1001,
        maxWidth: "400px",
        alignItems: "center",
        gap: "10px",
        display: "flex",
        animation: isExiting
          ? "slideDown 0.1s ease-out"
          : "slideUp 0.1s ease-out",
      }}
    >
      <span style={{ flex: 1, fontSize: "15px" }}>{message}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => clearMessage(), 100);
        }}
        style={{
          background: "none",
          border: "none",
          color: "gray",
          fontSize: "25px",
          cursor: "pointer",
          padding: "0",
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default MessageToast;
