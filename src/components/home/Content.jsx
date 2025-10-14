// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/homeAPI";
import { useError } from "../../contexts/ErrorContext";
import Folder from "./Folder";
import File from "./File";

const Content = () => {
  const { showError } = useError();
  const { folderId } = useParams();
  const [subfolders, setSubfolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [folderId, showError]);

  if (loading) {
    return (
      <div style={{ flex: 1, padding: "20px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        overflow: "auto",
      }}
    >
      <h2>Folders</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {subfolders.map((folder) => (
          <Folder key={folder.id} folder={folder} />
        ))}
      </div>

      <h2>Files</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {files.map((file) => (
          <File key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
};

export default Content;
