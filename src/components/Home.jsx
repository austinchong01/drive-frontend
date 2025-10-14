// src/components/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/user";
import Navbar from "./home/Navbar";
import Sidebar from "./home/Sidebar";
import Content from "./home/Content";
import { ErrorProvider } from "../contexts/ErrorContext";
import ErrorToast from "./ErrorToast";

const Home = () => {
  const navigate = useNavigate();
  const [contentRefreshTrigger, setContentRefreshTrigger] = useState(0);
  const [sidebarRefreshTrigger, setSidebarRefreshTrigger] = useState(0);

  // redirect to login if no valid token
  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (!result.success) navigate("/login");
    };
    verifyUser();
  }, []);

  const triggerContentRefresh = () => {
    setContentRefreshTrigger((prev) => prev + 1);
  };

  const triggerSidebarRefresh = () => {
    setSidebarRefreshTrigger((prev) => prev + 1);
  };

  return (
    <ErrorProvider>
      <ErrorToast />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Navbar />
        <div
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <Sidebar
            onContentChange={triggerContentRefresh}
            refreshTrigger={sidebarRefreshTrigger}
          />
          <Content
            onSidebarChange={triggerSidebarRefresh}
            refreshTrigger={contentRefreshTrigger}
          />
        </div>
      </div>
    </ErrorProvider>
  );
};

export default Home;
