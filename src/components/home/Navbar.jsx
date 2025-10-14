// src/components/home/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useError } from "../../contexts/ErrorContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { showError } = useError();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await api.getUserProfile();
      
      if (result.success) {
        setUsername(result.data.username);
      } else {
        showError(`Failed to load profile: ${result.error}`);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <img src="/images/mock_google_drive.svg" alt="Logo" style={{ width: "100px" }} />
      <input type="text" placeholder="Search Files and Folders..."/>
      <h1>{username || "Loading..."}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;