// src/components/ErrorToast.jsx
import { useEffect, useState } from "react";
import { useError } from "./ErrorContext";

const ErrorToast = () => {
  const { error, errorKey, clearError } = useError();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (error) {
      setIsExiting(false);

      const timer = setTimeout(() => {
        setIsExiting(true);

        setTimeout(() => {
          clearError();
        }, 100);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorKey, clearError]);

  if (!error) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#ff4444",
        color: "white",
        padding: "10px 20px",
        borderRadius: "2px",
        zIndex: 1001,
        maxWidth: "400px",
        alignItems: "center",
        gap: "10px",
        display: "flex",
        animation: isExiting
          ? "errorSlideDown 0.1s ease-out"
          : "errorSlideUp 0.1s ease-out", // ← Toggle animation
      }}
    >
      <span style={{ flex: 1, fontSize: "15px" }}>⚠️ {error}</span>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => clearError(), 100);
        }}
        style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: "25px",
          cursor: "pointer",
          padding: "0",
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes errorSlideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes errorSlideDown {
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

export default ErrorToast;
