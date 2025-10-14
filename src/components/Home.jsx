// src/components/Home.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "./home/Navbar";
import Sidebar from "./home/Sidebar";
import Content from "./home/Content";
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
  }, [navigate]);

  return (
    <ErrorProvider>
      <ErrorToast />
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh",
        width: "100vw"
      }}>
        <Navbar />
        <div style={{ 
          display: "flex", 
          flex: 1,
          overflow: "hidden"
        }}>
          <Sidebar />
          <Content />
        </div>
      </div>
    </ErrorProvider>
  );
};

export default Home;