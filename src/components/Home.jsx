// src/components/Home.jsx
import { useState, useEffect } from "react";
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
  const [newFolder, setNewFolder] = useState(null);
  const [newFile, setNewFile] = useState(null);

  // redirect to login if no valid token
  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (!result.success) navigate("/login");
    };
    verifyUser();
  }, []);

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
              onAddFolder={setNewFolder}
              onAddFile={setNewFile}
            />
            <Content
              newFolder={newFolder}
              newFile={newFile}
            />
          </div>
        </div>
      </ModalProvider>
    </ErrorProvider>
  );
};

export default Home;