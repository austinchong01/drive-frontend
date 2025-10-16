// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";
import FolderList from "./Content_Components/FolderList";
import FileList from "./Content_Components/FileList";

const Content = ({ createdFolder, createdFile, itemDeleted }) => {
  const { showError } = useError();
  const { folderId } = useParams();
  const [initialFiles, setInitialFiles] = useState([]);
  const [initialFolders, setInitialFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  // load all files and folders in FOLDER
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      const result = await api.getFolderContents(folderId);

      if (result.success) {
        setInitialFolders(result.data.subfolders);
        setInitialFiles(result.data.files);
      } else {
        showError(`Failed to load contents: ${result.error}`);
      }
      setLoading(false);
    };

    fetchContents();
  }, [folderId]);

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
        initialFolders={initialFolders}
        createdFolder={createdFolder}
        onFolderDelete={itemDeleted}
      />
      <FileList
        initialFiles={initialFiles}
        createdFile={createdFile}
        onFileDelete={itemDeleted}
      />
    </div>
  );
};

export default Content;
