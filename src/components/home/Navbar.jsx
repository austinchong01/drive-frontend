import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { api } from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>LOGO</h1>
      <input type="text" placeholder="Search Files and Folders..."/>
      <h1>USERNAME</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
