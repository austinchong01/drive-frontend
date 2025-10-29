// src/components/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // redirect to home if valid token
  useEffect(() => {
    const verifyUser = async () => {
      const result = await api.verifyJWT();
      if (result.success) navigate("/home");
    };
    verifyUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await api.login(email, password);

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleGuest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await api.login("guest@guest.com", "guest");

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-[#f1f3f4] min-h-screen">
      <div className="relative bg-white w-150 h-150 flex flex-col gap-3 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.4)] items-center justify-center">
        <img src="/images/google.svg" alt="Google" className="w-30" />
        <h1 className="text-3xl">Login</h1>
        <p>Sign into your "mock" Google Account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder=" "
              className="peer w-100 h-15 px-4 py-3 border-1 border-gray-300 rounded outline-none focus:border-blue-500 focus:border-2"
            />
            <label
              className="absolute left-4 top-1/2 transition-all -translate-y-1/2 text-lg text-gray-500 bg-white px-1 pointer-events-none duration-200
                         peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-0 
                         peer-[:not(:placeholder-shown)]:text-sm"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-100 h-15 px-4 py-3 border-1 border-gray-300 rounded outline-none focus:border-blue-500 focus:border-2"
            />
            <label
              className="absolute left-4 top-1/2 transition-all -translate-y-1/2 text-lg text-gray-500 bg-white px-1 pointer-events-none duration-200
                         peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-0 
                         peer-[:not(:placeholder-shown)]:text-sm"
            >
              Password
            </label>
          </div>

          <button onClick={handleGuest} className="text-sm bg-white rounded-xl px-5 py-3 text-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-100">
            Sign into Guest Account
          </button>

          <div className="flex gap-4 justify-between">
            <Link
              className="bg-white rounded-xl px-5 py-3 text-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-100"
              to="/register"
            >
              Register
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-600 hover:shadow-[0_1px_4px_rgba(0,0,0,0.4)] rounded px-5 py-3 text-white transition-all duration-100"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        {error && (
          <div className="absolute top-128 bg-red-700 text-white p-2 text-sm rounded w-100 shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            {error}
          </div>
        )}
        {loading && (
          <div className="absolute top-128 text-blue-500 p-2 text-sm w-100">
            Logging in...
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
