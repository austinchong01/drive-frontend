// src/components/Home.jsx

/**
 * Home Component - Main Application Container
 * Manages layout, context providers, and coordinates between Navbar, Sidebar, and Content areas.
 * Handles switching between folder browsing and search results.
 * Redirects unauthenticated users to login page.
 */

import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageProvider } from "../contexts/MessageContext";
import { ErrorProvider } from "../contexts/ErrorContext";
import { ModalProvider } from "../contexts/ModalContext";
import MessageToast from "../contexts/MessageToast";
import ErrorToast from "../contexts/ErrorToast";
import { api } from "../services/user";
import Navbar from "./home/Navbar";
import Sidebar from "./home/Sidebar";
import Content from "./home/Content";
import SearchContent from "./home/SearchContent";

const Home = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [createdFolder, setCreatedFolder] = useState(null);
  const [createdFile, setCreatedFile] = useState(null);
  const [storageTrigger, setStorageTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (!result.success) navigate("/login", { replace: true });
    };
    verifyUser();
  }, []);

  // Clear created items and search when navigating to different folder
  useEffect(() => {
    setCreatedFolder(null);
    setCreatedFile(null);
    if (folderId) setSearchQuery("");
  }, [folderId]);

  const handleDelete = useCallback(() => {
    setStorageTrigger((prev) => prev + 1);
  }, []);

  const handleSearch = useCallback(
    (query) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        setSearchQuery(trimmedQuery);
        navigate("/home");
      }
    },
    [navigate]
  );

  const handleSearchDelete = useCallback(() => {
    setStorageTrigger((prev) => prev + 1);
    setSearchTrigger((prev) => prev + 1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setCreatedFolder(null);
    setCreatedFile(null);
    setSearchQuery("");
  }, []);

  return (
    <MessageProvider>
      <ErrorProvider>
        <ModalProvider>
          <MessageToast />
          <ErrorToast />
          <div
            style={{
              display: "flex",
              height: "100vh",
              width: "100vw",
              flexDirection: "column",
              overflow: "hidden",
              paddingBottom: "20px",
            }}
          >
            <Navbar onSearch={handleSearch} onClearSearch={handleClearSearch} />
            <div
              style={{
                display: "flex",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <Sidebar
                onFolderCreated={setCreatedFolder}
                onFileCreated={setCreatedFile}
                storageTrigger={storageTrigger}
              />
              {searchQuery ? (
                <SearchContent
                  query={searchQuery}
                  createdFile={createdFile}
                  createdFolder={createdFolder}
                  itemDeleted={handleSearchDelete}
                  searchTrigger={searchTrigger}
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
    </MessageProvider>
  );
};
export default Home;
