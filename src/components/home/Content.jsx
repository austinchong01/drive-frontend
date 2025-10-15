// src/components/home/Content.jsx
import { useState, useEffect, memo } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";
import FolderList from "./Content_Components/FolderList";
import FileList from "./Content_Components/FileList";

const Content = ({ onItemDeleted, onFolderCreated, onFileCreated }) => {
  const { showError } = useError();
  const { folderId } = useParams();
  const [subfolders, setSubfolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // load all files and folders in FOLDER
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      const result = await api.getFolderContents(folderId);

      if (result.success) {
        setSubfolders(result.data.subfolders);
        setFiles(result.data.files);
      } else {
        showError(`Failed to load contents: ${result.error}`);
      }
      setLoading(false);
    };

    fetchContents();
  }, [folderId]);

  const handleFolderCreated = (newFolder) => {
    setSubfolders((prev) => [...prev, newFolder]);
    onFolderCreated();
  };

  const handleFileCreated = (newFile) => {
    setFiles((prev) => [...prev, newFile]);
    onFileCreated();
  };

  if (loading) {
    return (
      <div style={{ flex: 1, padding: "20px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: "20px", border: "1px solid black" }}>
      <FolderList
        folders={subfolders}
        setFolders={setSubfolders}
        onItemDeleted={onItemDeleted}
        onFolderCreated={handleFolderCreated}
      />
      <FileList
        files={files}
        setFiles={setFiles}
        onItemDeleted={onItemDeleted}
        onFileCreated={handleFileCreated}
      />
    </div>
  );
};

export default memo(Content);