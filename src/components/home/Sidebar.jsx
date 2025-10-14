// src/components/home/Sidebar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/homeAPI";
import { useError } from "../../contexts/ErrorContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [storage, setStorage] = useState("");
  const { showError } = useError();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await api.getUserProfile();
      
      if (result.success) {
        setStorage(result.data.storage);
      } else {
        showError(`Storage Error: ${result.error}`);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <button>New File</button>
        <button>New Folder</button>
        <h1>{storage || "Loading..."}</h1>
    </div>
  );
};

export default Sidebar;