// src/components/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "./home/Navbar";
import Sidebar from "./home/Sidebar";
import Content from "./home/Content"
import { ErrorProvider } from "../contexts/ErrorContext";
import ErrorToast from "./ErrorToast";

const Home = () => {
  const navigate = useNavigate();

  // redirect to login if no valid token
  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (!result.success) navigate("/login");
    };
    verifyUser();
  }, []);

  return (
    <ErrorProvider>
      <ErrorToast />
      <div>
        <Navbar />
        <Sidebar />
        <Content />
      </div>
    </ErrorProvider>
  );
};

export default Home;
