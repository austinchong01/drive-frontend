// src/components/Register.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    setError('');

    const result = await api.register({ username, email, password });

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
        <button type="button" onClick={handleLoginRedirect}>Back to Login</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Register;