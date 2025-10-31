// src/components/home/Content_Components/FolderList.jsx

/**
 * Folder List Component
 * Manages and displays list of folders with grid layout.
 * Handles folder state updates from creation, renaming, drag operations, and deletion.
 * Reports folder count to parent for empty state detection.
 * 
 * @param {Array} initialFolders - Initial list of folders from API
 * @param {Object} createdFolder - Newly created folder to add to list
 * @param {Function} onFolderDelete - Callback with (folderId) when folder is deleted
 * @param {string} openDropdownId - ID of folder with open dropdown menu
 * @param {Function} onToggleDropdown - Callback to toggle dropdown visibility
 * @param {string} highlightId - ID of currently selected/highlighted folder
 * @param {Function} onToggleHighlight - Callback to toggle folder selection
 * @param {string} draggedFolderId - ID of folder being dragged (to remove from display)
 * @param {Function} onCountChange - Callback with current folder count
 */

import { useState, useEffect } from "react";
import { useModal } from "../../../contexts/ModalContext";
import Folder from "./Folder";

const FolderList = ({
  initialFolders,
  createdFolder,
  onFolderDelete,
  openDropdownId,
  onToggleDropdown,
  highlightId,
  onToggleHighlight,
  draggedFolderId,
  onCountChange,
}) => {
  const { openFolderRenameModal } = useModal();
  const [folders, setFolders] = useState(initialFolders);

  useEffect(() => {
    setFolders(initialFolders);
  }, [initialFolders]);

  // Add newly created folder to top of list (sorted by latest)
  useEffect(() => {
    if (createdFolder) setFolders((prev) => [createdFolder, ...prev]);
  }, [createdFolder]);

  // Remove folder from display after successful drag operation
  useEffect(() => {
    if (draggedFolderId) {
      setFolders((prev) =>
        prev.filter((folder) => folder.id !== draggedFolderId)
      );
    }
  }, [draggedFolderId]);

  // Report folder count to parent
  useEffect(() => {
    onCountChange(folders.length);
  }, [folders.length, onCountChange]);

  const handleFolderRename = (folderId, newName) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
  };

  const handleFolderDelete = (folderId) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    onFolderDelete(folderId);
  };

  return (
    <>
      {folders.length > 0 && (
        <div>
          <h2 className="sticky top-19 py-4 text-xl font-medium bg-white z-2">
            Folders
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 pt-1">
            {folders.map((folder) => (
              <Folder
                key={folder.id}
                folder={folder}
                onDelete={handleFolderDelete}
                onRenameClick={() =>
                  openFolderRenameModal(folder, handleFolderRename)
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

export default FolderList;