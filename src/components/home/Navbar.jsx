// src/components/home/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../services/user";
import { useError } from "../../contexts/ErrorContext";

const Navbar = ({ onSearch, onClearSearch }) => {
  const { showError } = useError();
  const [username, setUsername] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await api.getUserProfile();

      if (result.success) {
        setUsername(result.data.username);
      } else {
        showError(`Username Error: ${result.error}`);
      }
    };
    fetchUserProfile();
  }, [showError]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
    setSearchInput("");
  };

  return (
    <div className="flex py-2 px-6 items-center gap-5 bg-[#f8fafd]">
      <Link
        to="/home"
        title="Drive"
        onClick={onClearSearch}
        className="flex flex-none items-center gap-2.5 w-[100px]"
      >
        <img src="/images/drive.svg" alt="Logo" className="w-[40px]" />
        <h2 className="text-black hover:text-black font-normal text-2xl active:underline">
          Drive
        </h2>
      </Link>
      <form
        onSubmit={handleSearchSubmit}
        className="ml-32 min-w-[400px] max-w-[700px] flex-1 flex gap-2 bg-[#e9eef6] rounded-full p-2 has-[:focus]:bg-white has-[:focus]:shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-all duration-100"
      >
        <input
          type="image"
          src="/images/search.svg"
          alt="Search"
          title="Search"
          className="w-10 h-10 p-2 rounded-full bg-transparent transition-colors duration-100 ease-in-out hover:bg-black/10 cursor-pointer"
        />
        <input
          type="text"
          placeholder="Search in Drive"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-2 py-2 border-none bg-transparent outline-none placeholder:text-gray-700 placeholder:text-xl"
        />
        <input
          type="image"
          src="/images/cancel.svg"
          alt="Clear"
          title="Clear"
          onClick={(e) => {
            e.preventDefault();
            setSearchInput("");
          }}
          className="w-10 h-10 p-2 rounded-full bg-transparent transition-colors duration-100 ease-in-out hover:bg-black/10 cursor-pointer"
        />
      </form>

      <div className="ml-auto flex gap-2 items-center">
        <img
          src="/images/help.svg"
          alt="Help"
          title="Help (inactive)"
          className="w-10 h-10 cursor-pointer p-1.5 rounded-full bg-transparent transition-colors duration-100 ease-in-out hover:bg-black/10"
        />
        <img
          src="/images/settings.svg"
          alt="Settings"
          title="Settings (inactive)"
          className="w-10 h-10 cursor-pointer p-2 rounded-full bg-transparent transition-colors duration-100 ease-in-out hover:bg-black/10"
        />
        <img
          src="/images/logout.svg"
          alt="Logout"
          title="Logout"
          className="w-12 h-10 p-2 cursor-pointer rounded-full bg-transparent transition-colors duration-100 ease-in-out hover:bg-black/10"
          onClick={handleLogout}
        />
        <h2
          title={username}
          className="w-10 h-10 rounded-full text-white bg-blue-500 flex items-center justify-center text-sm font-semibold"
        >
          {username ? username[0].toUpperCase() : "?"}
        </h2>
      </div>
    </div>
  );
};

export default Navbar;
