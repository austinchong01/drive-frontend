// src/components/Home.jsx
import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/user";
import Navbar from "./home/Navbar";
import Sidebar from "./home/Sidebar";
import Content from "./home/Content";
import { ErrorProvider } from "../contexts/ErrorContext";
import { ModalProvider } from "../contexts/ModalContext";
import ErrorToast from "./ErrorToast";

const Home = () => {
  const navigate = useNavigate();
  const [storageUpdateTrigger, setStorageUpdateTrigger] = useState(0);

  const handleStorageChange = useCallback(() => {
    setStorageUpdateTrigger((prev) => prev + 1);
  }, []);

  const handleFolderCreated = useCallback(() => {
  }, []);

  const handleFileCreated = useCallback(() => {
    handleStorageChange();
  }, [handleStorageChange]);

  // redirect to login if no valid token
  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (!result.success) navigate("/login");
    };
    verifyUser();
  }, [navigate]);

  return (
    <ErrorProvider>
      <ModalProvider>
        <ErrorToast />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
          }}
        >
          <Navbar />
          <div
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            <Sidebar
              storageUpdateTrigger={storageUpdateTrigger}
              onFolderCreated={handleFolderCreated}
              onFileCreated={handleFileCreated}
            />
            <Content
              onItemDeleted={handleStorageChange}
              onFolderCreated={handleFolderCreated}
              onFileCreated={handleFileCreated}
            />
          </div>
        </div>
      </ModalProvider>
    </ErrorProvider>
  );
};

export default Home;