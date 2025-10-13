// src/components/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const result = await api.getUserProfile();

      if (result.success) {
        setUsername(result.data.username);
      } else {
        setUsername("Error loading profile");
        console.log(result.error);
        setError(result.error);
        // redirect for authentication errors
        if (
          result.error.includes("401") ||
          result.error.includes("403") ||
          result.error.includes("token")
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <p>{username}</p>
      <button onClick={handleLogout}>Logout</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Home;
