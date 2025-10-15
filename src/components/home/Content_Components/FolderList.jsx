// src/components/home/Content_Components/FolderList.jsx
import { memo } from "react";
import { useModal } from "../../../contexts/ModalContext";
import Folder from "./Folder";

const FolderList = ({ folders, setFolders }) => {
  const { openFolderRenameModal } = useModal();

  const handleFolderRename = (folderId, newName) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, name: newName } : folder
      )
    );
  };

  const handleFolderDelete = (folderId) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
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
          />
        ))}
      </div>
    </>
  );
};

export default memo(FolderList);