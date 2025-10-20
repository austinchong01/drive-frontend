// src/components/home/Content_Components/FileList.jsx
import { useState, useEffect } from "react";
import { useModal } from "../../../contexts/ModalContext";
import File from "./File";

const FileList = ({
  initialFiles,
  createdFile,
  onFileDelete,
  openDropdownId,
  onToggleDropdown,
  highlightId,
  onToggleHighlight,
}) => {
  const { openFileRenameModal } = useModal();
  const [files, setFiles] = useState(initialFiles);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

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
            openDropdownId={openDropdownId}
            onToggleDropdown={onToggleDropdown}
            highlightId={highlightId}
            onToggleHighlight={onToggleHighlight}
          />
        ))}
      </div>
    </>
  );
};

export default FileList;
