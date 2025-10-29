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
  draggedFileId,
  onCountChange,
}) => {
  const { openFileRenameModal } = useModal();
  const [files, setFiles] = useState(initialFiles);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  useEffect(() => {
    if (createdFile) setFiles((prev) => [createdFile, ...prev]);
  }, [createdFile]);

  useEffect(() => {
    if (draggedFileId) {
      setFiles((prev) =>
        prev.filter((file) => file.id !== draggedFileId)
      );
    }
  }, [draggedFileId]);

  useEffect(() => {
    onCountChange(files.length);
  }, [files.length]);

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
      {files.length > 0 && (
        <div className="pt-4">
          <h2 className="sticky top-19 py-4 text-xl font-medium bg-white z-2">Files</h2>
          <div className="flex flex-col">
            <div className="py-3 flex pr-15 font-semibold border-b border-gray-400 text-lg flex">
              <h3 className="flex-1 min-w-100">Name</h3>
              <h3 className="flex-1 min-w-40 max-w-120">Updated</h3>
              <h3 className="flex-1 min-w-40 max-w-120">Size</h3>
            </div>
            {files.map((file) => (
              <File
                key={file.id}
                file={file}
                onDelete={handleFileDelete}
                onRenameClick={() =>
                  openFileRenameModal(file, handleFileRename)
                }
                openDropdownId={openDropdownId}
                onToggleDropdown={onToggleDropdown}
                highlightId={highlightId}
                onToggleHighlight={onToggleHighlight}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FileList;