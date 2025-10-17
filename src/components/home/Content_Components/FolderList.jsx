// src/components/home/Content_Components/FolderList.jsx
import { useState, useEffect } from "react";
import { useModal } from "../../../contexts/ModalContext";
import Folder from "./Folder";

const FolderList = ({ initialFolders, createdFolder, onFolderDelete }) => {
  console.log(initialFolders)
  const { openFolderRenameModal } = useModal();
  const [folders, setFolders] = useState(initialFolders);

  useEffect(() => {
    if (createdFolder) setFolders((prev) => [createdFolder, ...prev]);
  }, [createdFolder]);

  const handleFolderRename = (folderId, newName) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder));
  };

  const handleFolderDelete = (folderId) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    onFolderDelete(folderId);
  };
  // folders.map((folder) => {console.log(folder.id)});

  return (
    <>
      <h2>Folders</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "50px",
        }}>
        {folders.map((folder) => (
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
