// src/components/home/Folder.jsx

import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";

const Folder = ({ folder, onDelete, onRenameClick }) => {
  const { showError } = useError();

  const handleDeleteFolder = async () => {
    const result = await api.deleteFolder(folder.id);

    if (result.success) {
      onDelete(folder.id);
    } else {
      showError(`Delete Folder Error: ${result.error}`);
    }
  };

  return (
    <div style={{ border: "1px solid blue", padding: "10px" }}>
      <h3>{folder.name}</h3>
      <button onClick={onRenameClick}>RENAME</button>
      <button onClick={handleDeleteFolder}>DELETE</button>
    </div>
  );
};

export default Folder;