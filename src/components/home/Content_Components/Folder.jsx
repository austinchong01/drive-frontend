// src/components/home/Folder.jsx

import { useNavigate } from "react-router-dom";
import { api } from "../../../services/folder";
import { useError } from "../../../contexts/ErrorContext";

const Folder = ({ folder, onDelete, onRenameClick }) => {
  const navigate = useNavigate();
  const { showError } = useError();

  const handleFolderClick = () => {
    navigate(`/folders/${folder.id}`);
  };

  const handleDeleteFolder = async () => {
    const result = await api.deleteFolder(folder.id);

    if (result.success) {
      onDelete(folder.id);
    } else {
      showError(`Delete Folder Error: ${result.error}`);
    }
  };

  return (
    <div onClick={handleFolderClick}
      style={{ border: "1px solid blue", padding: "10px", cursor: "pointer" }}>
      <h3>{folder.name}</h3>
      <button onClick={(e) => { e.stopPropagation(); onRenameClick(); }}>
        RENAME
      </button>
      <button onClick={(e) => { e.stopPropagation(); handleDeleteFolder(); }}>
        DELETE
      </button>
    </div>
  );
};

export default Folder;