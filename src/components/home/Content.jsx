// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";
import Folder from "./Folder";
import File from "./File";
import RenameFileModal from "./RenameFileModal";
import RenameFolderModal from "./RenameFolderModal";

const Content = ({ refreshTrigger, onSidebarChange }) => {
  const { showError } = useError();
  const { folderId } = useParams();
  const [subfolders, setSubfolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

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
  }, [refreshTrigger, folderId]);

  const handleFolderRename = (folderId, newName) => {
    setSubfolders(prev => 
      prev.map(folder => 
        folder.id === folderId ? { ...folder, name: newName } : folder));
    setSelectedFolder(null); // Close modal
  };

  const handleFolderDelete = (folderId) => {
    setSubfolders(prev => prev.filter(folder => folder.id !== folderId));
    onSidebarChange();
  };

  const handleFileRename = (fileId, newName) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, displayName: newName } : file));
    setSelectedFile(null); // Close modal
  };

  const handleFileDelete = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    onSidebarChange();
  };

  if (loading) {
    return (
      <div style={{ flex: 1, padding: "20px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div style={{ flex: 1, padding: "20px", border: "1px solid black" }}>
        <h2>Folders</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "50px" }}>
          {subfolders.map((folder) => (
            <Folder 
              key={folder.id} 
              folder={folder} 
              onDelete={handleFolderDelete}
              onRenameClick={() => setSelectedFolder(folder)}
            />
          ))}
        </div>

        <h2>Files</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {files.map((file) => (
            <File 
              key={file.id} 
              file={file} 
              onDelete={handleFileDelete}
              onRenameClick={() => setSelectedFile(file)}
            />
          ))}
        </div>
      </div>

      {selectedFile && (
        <RenameFileModal
          isOpen={true}
          onClose={() => setSelectedFile(null)}
          onSuccess={handleFileRename}
          file={selectedFile}
        />
      )}

      {selectedFolder && (
        <RenameFolderModal
          isOpen={true}
          onClose={() => setSelectedFolder(null)}
          onSuccess={handleFolderRename}
          folder={selectedFolder}
        />
      )}
    </>
  );
};

export default Content;