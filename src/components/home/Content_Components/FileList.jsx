// src/components/home/FileList.jsx
import { useState } from "react";
import { useModal } from "../../../contexts/ModalContext";
import File from "./File";

const FileList = ({ initialFiles, onSidebarChange }) => {
  const [files, setFiles] = useState(initialFiles);
  const { openFileRenameModal } = useModal();

  const handleFileRename = (fileId, newName) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, displayName: newName } : file
      )
    );
  };

  const handleFileDelete = (fileId) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
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
