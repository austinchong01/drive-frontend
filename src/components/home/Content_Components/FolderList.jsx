// src/components/home/Content_Components/FolderList.jsx
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
}) => {
  const { openFolderRenameModal } = useModal();
  const [folders, setFolders] = useState(initialFolders);

  useEffect(() => {
    setFolders(initialFolders);
  }, [initialFolders]);

  useEffect(() => {
    if (createdFolder) setFolders((prev) => [createdFolder, ...prev]);
  }, [createdFolder]);

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
    <div>
      <h2>Folders</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
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
  );
};

export default FolderList;
