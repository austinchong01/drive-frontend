// src/components/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // redirect to home if valid token
  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (result.success) {
        navigate("/home");
      }
    };
    verifyUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await api.login({ email, password });

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleRegisterRedirect}>Register</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Login;