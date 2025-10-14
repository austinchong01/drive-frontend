// src/components/home/Folder.jsx

import { useState } from "react";
import { api } from "../../services/folder";
import { useError } from "../../contexts/ErrorContext";

const Folder = ({ folder, onDelete }) => {
  const [name, setName] = useState(folder.name);
  const [isEditing, setIsEditing] = useState(false);
  const { showError } = useError();

  const handleDeleteFolder = async () => {
    const result = await api.deleteFolder(folder.id);

    if (result.success) {
      onDelete(); // Trigger refresh
    } else {
      showError(`Delete Error: ${result.error}`);
    }
  };

  const handleRenameFolder = async () => {
    if (isEditing) {
      // Save the new name
      if (name.trim() === "") {
        showError("Folder name cannot be empty");
        setName(folder.name); // Reset to original name
        setIsEditing(false);
        return;
      }

      if (name === folder.name) {
        setIsEditing(false);
        return;
      }

      const result = await api.renameFolder(folder.id, name);

      if (result.success) {
        setIsEditing(false);
        // Name state is already updated, no need to do anything else
      } else {
        showError(`Rename Error: ${result.error}`);
        setName(folder.name); // Reset to original name on error
      }
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRenameFolder();
    } else if (e.key === "Escape") {
      setName(folder.name);
      setIsEditing(false);
    }
  };

  return (
    <div style={{ border: "1px solid blue", padding: "10px" }}>
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <h3>{name}</h3>
      )}
      <button onClick={handleRenameFolder}>
        {isEditing ? "SAVE" : "RENAME"}
      </button>
      <button onClick={handleDeleteFolder}>DELETE</button>
    </div>
  );
};

export default Folder;