// src/components/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "./home/Navbar";

const Home = () => {
  const navigate = useNavigate();

  // redirect to login if no valid token
  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (!result.success)
          navigate("/login");
    };
    verifyUser();
  }, []);

  return (
    <div>
      <Navbar/>
    </div>
  );
};

export default Home;
