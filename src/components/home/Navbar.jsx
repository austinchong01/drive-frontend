// src/components/home/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/user";
import { useError } from "../../contexts/ErrorContext";

const Navbar = ({ onSearch, onClearSearch }) => {
  const [username, setUsername] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { showError } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await api.getUserProfile();
      
      if (result.success) {
        setUsername(result.data.username);
      } else {
        showError(`Username Error: ${result.error}`);
      }
    };
    fetchUserProfile();
  }, [showError]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
    setSearchInput("");
  };

  return (
    <div style={{ display: "flex", padding: "20px", border: "1px solid black", alignItems: "center", gap: "20px" }}>
      <Link 
        to="/home" 
        onClick={onClearSearch}
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <img 
          src="/images/mock_google_drive.svg" 
          alt="Logo" 
          style={{ width: "50px" }} 
        />
        <h2>DRIVE</h2>
      </Link>
      
      <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: "flex", gap: "10px" }}>
        <input 
          type="text"
          placeholder="Search files and folders..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="button" onClick={() => setSearchInput("")}>Clear</button>
        <button type="submit">Search</button>
      </form>

      <h1>{username || "Loading..."}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;