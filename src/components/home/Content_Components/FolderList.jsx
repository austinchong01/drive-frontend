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
    <>
      <h2>Folders</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "50px",
        }}
      >
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
          />
        ))}
      </div>
    </>
  );
};

export default FolderList;
