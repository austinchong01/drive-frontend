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
import SearchContent from "./home/SearchContent";

const Home = () => {
  const navigate = useNavigate();
  let { folderId } = useParams();
  const [createdFolder, setCreatedFolder] = useState(null);
  const [createdFile, setCreatedFile] = useState(null);
  const [storageTrigger, setStorageTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRefreshTrigger, setSearchRefreshTrigger] = useState(0);

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
    if (folderId) setSearchQuery("");
  }, [folderId]);

  const handleDelete = useCallback(() => {
    setStorageTrigger((prev) => prev + 1);
  }, []);

  const handleSearchDelete = useCallback(() => {
    setStorageTrigger((prev) => prev + 1);
    setSearchRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleSearch = useCallback((query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      setSearchQuery(trimmedQuery);
      navigate("/home");
    }
  }, []);

  const handleClearSearch = useCallback(() => {
    setCreatedFolder(null);
    setCreatedFile(null);
    setSearchQuery("");
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
          <Navbar onSearch={handleSearch} onClearSearch={handleClearSearch} />
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
            {searchQuery ? (
              <SearchContent
                refreshTrigger={searchRefreshTrigger}
                query={searchQuery}
                itemDeleted={handleSearchDelete}
                createdFolder={createdFolder}
                createdFile={createdFile}
              />
            ) : (
              <Content
                createdFolder={createdFolder}
                createdFile={createdFile}
                itemDeleted={handleDelete}
              />
            )}
          </div>
        </div>
      </ModalProvider>
    </ErrorProvider>
  );
};
export default Home;
