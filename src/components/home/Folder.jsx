// src/components/home/Folder.jsx

import { useState } from "react";
import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";
import RenameFolderModal from "./RenameFolderModal";

const Folder = ({ folder, onDelete }) => {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const { showError } = useError();

  const handleDeleteFolder = async () => {
    const result = await api.deleteFolder(folder.id);

    if (result.success) {
      onDelete(); // Trigger refresh
    } else {
      showError(`Delete Folder Error: ${result.error}`);
    }
  };

  const handleRenameSuccess = () => {
    setIsRenameModalOpen(false);
    onDelete(); // Trigger refresh to update the folder name
  };

  return (
    <>
      <div style={{ border: "1px solid blue", padding: "10px" }}>
        <h3>{folder.name}</h3>
        <button onClick={() => setIsRenameModalOpen(true)}>RENAME</button>
        <button onClick={handleDeleteFolder}>DELETE</button>
      </div>

      <RenameFolderModal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        onSuccess={handleRenameSuccess}
        folder={folder}
      />
    </>
  );
};

export default Folder;