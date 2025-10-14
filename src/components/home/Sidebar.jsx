// src/components/home/Sidebar.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/homeAPI";
import { useError } from "../../contexts/ErrorContext";
import NewFolderModal from "./NewFolderModal";
import NewFileModal from "./NewFileModal";

const Sidebar = () => {
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
  }, []);

  // refresh storage
  const handleFileUploadSuccess = () => {
    setIsFileModalOpen(false);
    fetchUserProfile();
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
        onSuccess={handleFileUploadSuccess}
      />
      <NewFolderModal 
        isOpen={isFolderModalOpen} 
        onClose={() => setIsFolderModalOpen(false)} 
      />
    </>
  );
};

export default Sidebar;