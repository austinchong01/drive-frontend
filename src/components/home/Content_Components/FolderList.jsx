// src/components/home/FolderList.jsx
import { useState } from "react";
import { useModal } from "../../../contexts/ModalContext";
import Folder from "./Folder";

const FolderList = ({ initialFolders, onSidebarChange }) => {
  const [subfolders, setSubfolders] = useState(initialFolders);
  const { openFolderRenameModal } = useModal();

  const handleFolderRename = (folderId, newName) => {
    setSubfolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
  };

  const handleFolderDelete = (folderId) => {
    setSubfolders((prev) => prev.filter((folder) => folder.id !== folderId));
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
        {subfolders.map((folder) => (
          <Folder
            key={folder.id}
            folder={folder}
            onDelete={handleFolderDelete}
            onRenameClick={() =>
              openFolderRenameModal(folder, handleFolderRename)
            }
          />
        ))}
      </div>
    </>
  );
};

export default FolderList;
