// src/components/Home.jsx
import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorProvider } from "../contexts/ErrorContext";
import { ModalProvider } from "../contexts/ModalContext";
import ErrorToast from "../contexts/ErrorToast";
import { api } from "../services/user";
import Navbar from "./home/Navbar";
import Sidebar from "./home/Sidebar";
import Content from "./home/Content";

const Home = () => {
  // console.log("rendered Home")
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [createdFolder, setCreatedFolder] = useState(null);
  const [createdFile, setCreatedFile] = useState(null);
  const [storageTrigger, setStorageTrigger] = useState(0);

  // redirect to login if no valid token
  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (!result.success) navigate("/login");
    };
    verifyUser();
  }, [navigate]);

  useEffect(() => {
    setCreatedFolder(null);
    setCreatedFile(null);
  }, [folderId]);

  const handleDelete = useCallback(() => {
    setStorageTrigger((prev) => prev + 1);
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
              onFolderCreated={setCreatedFolder}
              onFileCreated={setCreatedFile}
              storageTrigger={storageTrigger}
            />
            <Content
              createdFolder={createdFolder}
              createdFile={createdFile}
              itemDeleted={handleDelete}
            />
          </div>
        </div>
      </ModalProvider>
    </ErrorProvider>
  );
};

export default Home;