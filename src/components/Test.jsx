// src/components/Test.jsx
import { useState, useEffect } from "react";
import { api } from "../services/user";

const Test = () => {
  const [message, setMessage] = useState("Testing connection...");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const healthConnection = async () => {
      const result = await api.testConnection();

      if (result.success) {
        setMessage(`✓ Connection successful!`);
        setStatus(result.data);
      } else {
        setMessage(`✗ Connection failed: ${result.error}`);
      }
    };
    healthConnection();
  }, []);

  return (
    <div>
      <h1>Backend Connection Test</h1>
      <p>{message}</p>
      {status && (
        <div>
          <p>Status: {status.status}</p>
          <p>Timestamp: {status.timestamp}</p>
          <p>Environment: {status.env}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
