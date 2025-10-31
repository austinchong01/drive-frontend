// src/components/home/Content_Components/FileList.jsx

/**
 * File List Component
 * Manages and displays list of files.
 * Handles file state updates from creation, renaming, drag operations, and deletion.
 * Reports file count to parent for empty state detection.
 * 
 * @param {Array} initialFiles - Initial list of files from API
 * @param {Object} createdFile - Newly created file to add to list
 * @param {Function} onFileDelete - Callback with (fileId) when file is deleted
 * @param {string} openDropdownId - ID of file with open dropdown menu
 * @param {Function} onToggleDropdown - Callback to toggle dropdown visibility
 * @param {string} highlightId - ID of currently selected/highlighted file
 * @param {Function} onToggleHighlight - Callback to toggle file selection
 * @param {string} draggedFileId - ID of file being dragged (to remove from display)
 * @param {Function} onCountChange - Callback with current file count
 */

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

  // Add newly created file to top of list (sorted by latest)
  useEffect(() => {
    if (createdFile) setFiles((prev) => [createdFile, ...prev]);
  }, [createdFile]);

  // Remove file from display after successful drag operation
  useEffect(() => {
    if (draggedFileId) {
      setFiles((prev) =>
        prev.filter((file) => file.id !== draggedFileId)
      );
    }
  }, [draggedFileId]);

  // Report file count to parent
  useEffect(() => {
    onCountChange(files.length);
  }, [files.length, onCountChange]);

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
          <div className="flex flex-col pt-1">
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