// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";
import FolderList from "./Content_Components/FolderList";
import FileList from "./Content_Components/FileList";
import Crumbs from "./Content_Components/Crumbs";

const Content = ({ createdFolder, createdFile, itemDeleted }) => {
  // console.log("rendered Content")
  const { showError } = useError();
  let { folderId } = useParams();
  const [initialFiles, setInitialFiles] = useState([]);
  const [initialFolders, setInitialFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  // load all files and folders in FOLDER
  useEffect(() => {
    if (folderId === undefined) folderId = "";
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

  return (
    <div style={{ flex: 1, padding: "20px", border: "1px solid black" }}>
      <Crumbs folderId={folderId} />
      {loading ? (
        <p>Loading contents...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Content;
