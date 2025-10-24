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
      <div className="flex flex-col">
        <div className="py-3 flex pr-9 font-medium border-b border-gray-400">
          <h3 className="flex-1 min-w-109">Name</h3>
          <h3 className="w-75">Updated</h3>
          <h3 className="w-50">Size</h3>
        </div>
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
