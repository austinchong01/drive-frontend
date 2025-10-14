// src/components/home/Sidebar.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/user";
import { useError } from "../../contexts/ErrorContext";
import NewFolderModal from "./NewFolderModal";
import NewFileModal from "./NewFileModal";

const Sidebar = ({ onContentChange, refreshTrigger }) => {
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
  }, [refreshTrigger]);

  const handleSuccess = () => {
    setIsFileModalOpen(false);
    setIsFolderModalOpen(false);
    fetchUserProfile();
    onContentChange(); // trigger content refresh
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => setIsFileModalOpen(true)}>New File</button>
        <button onClick={() => setIsFolderModalOpen(true)}>New Folder</button>
        <h1>{storage !== null ? storage : "Loading..."}</h1>
      </div>

      <NewFileModal 
        isOpen={isFileModalOpen} 
        onClose={() => setIsFileModalOpen(false)}
        onSuccess={handleSuccess}
      />
      <NewFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => setIsFolderModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default Sidebar;