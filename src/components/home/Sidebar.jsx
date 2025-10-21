// src/components/home/Sidebar.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/user";
import { useError } from "../../contexts/ErrorContext";
import NewFolderModal from "../../contexts/modals/NewFolderModal";
import NewFileModal from "../../contexts/modals/NewFileModal";

const Sidebar = ({ onFileCreated, onFolderCreated, storageTrigger }) => {
  const [storage, setStorage] = useState(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const { showError } = useError();

  const fetchUserProfile = async () => {
    const result = await api.getUserProfile();

    if (result.success) {
      setStorage(result.data.storage);
    } else {
      showError(`Storage Error: ${result.error}`);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [storageTrigger]);

  const handleFileSuccess = (newFile) => {
    setIsFileModalOpen(false);
    onFileCreated(newFile);
    fetchUserProfile();
  };

  const handleFolderSuccess = (newFolder) => {
    setIsFolderModalOpen(false);
    onFolderCreated(newFolder);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => setIsFileModalOpen(true)}>New File</button>
        <button onClick={() => setIsFolderModalOpen(true)}>New Folder</button>
        <h2>{storage !== null ? storage : "Loading..."}</h2>
      </div>

      <NewFileModal
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        onSuccess={handleFileSuccess}
      />
      <NewFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onSuccess={handleFolderSuccess}
      />
    </>
  );
};

export default Sidebar;
