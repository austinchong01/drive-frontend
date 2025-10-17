// src/components/home/Content_Components/FileList.jsx
import { useState, useEffect } from "react";
import { useModal } from "../../../contexts/ModalContext";
import File from "./File";

const FileList = ({ initialFiles, createdFile, onFileDelete }) => {
  console.log(initialFiles)
  const { openFileRenameModal } = useModal();
  const [files, setFiles] = useState(initialFiles);

  useEffect(() => {
    if (createdFile) setFiles((prev) => [createdFile, ...prev]);
  }, [createdFile]);

  const handleFileRename = (fileId, newName) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, displayName: newName } : file
      )
    );
  };

  const handleFileDelete = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
    onFileDelete(fileId);
  };

  return (
    <>
      <h2>Files</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {files.map((file) => (
          <File
            key={file.id}
            file={file}
            onDelete={handleFileDelete}
            onRenameClick={() => openFileRenameModal(file, handleFileRename)}
          />
        ))}
      </div>
    </>
  );
};

export default FileList;
