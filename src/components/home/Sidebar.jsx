// src/components/home/Sidebar.jsx

/**
 * Sidebar Navigation Component
 * Left sidebar containing navigation links, file/folder creation buttons, and storage meter.
 * Shows current storage usage with visual progress bar (10 MB limit).
 * Only "Home" button is functional; other navigation items are placeholders.
 * 
 * @param {Function} onFileCreated - Callback with (newFile) when file is uploaded
 * @param {Function} onFolderCreated - Callback with (newFolder) when folder is created
 * @param {number} storageTrigger - Counter that triggers storage refresh when incremented
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/user";
import { useError } from "../../contexts/ErrorContext";
import NewFolderModal from "../../contexts/modals/NewFolderModal";
import NewFileModal from "../../contexts/modals/NewFileModal";

const Sidebar = ({ onFileCreated, onFolderCreated, storageTrigger }) => {
  const [storage, setStorage] = useState(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const { showError } = useError();
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const result = await api.getUserProfile();

    if (result.success) {
      setStorage(result.data.storage);
    } else {
      showError(`Storage Error: ${result.error}`);
    }
  };

  // Refresh storage display when files/folders are created or deleted
  useEffect(() => {
    fetchUserProfile();
  }, [storageTrigger]);

  const handleHomeClick = () => {
    navigate("/home");
  };

  const handleFileSuccess = (newFile) => {
    setIsFileModalOpen(false);
    onFileCreated(newFile);
    fetchUserProfile(); // Update storage after upload
  };

  const handleFolderSuccess = (newFolder) => {
    setIsFolderModalOpen(false);
    onFolderCreated(newFolder);
  };

  return (
    <>
      <div className="flex flex-col bg-[#f8fafd] w-[244px] gap-5 px-5 py-2">
        <div className="flex flex-col gap-3 text-lg font-medium">
          <button
            onClick={() => setIsFileModalOpen(true)}
            className="w-[125px] h-[50px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:bg-[#e9eef6] hover:shadow-[0_1px_8px_rgba(0,0,0,0.4)] transition-all duration-200 rounded-2xl"
          >
            New File
          </button>
          <button
            onClick={() => setIsFolderModalOpen(true)}
            className="w-[125px] h-[50px] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:bg-[#e9eef6] hover:shadow-[0_1px_8px_rgba(0,0,0,0.4)] transition-all duration-200 rounded-2xl"
          >
            New Folder
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {/* Primary navigation - only Home is functional */}
          <div className="flex flex-col">
            <button onClick={handleHomeClick} title="Home" className="w-full flex items-center gap-4 px-5 py-1 rounded-full bg-[#c2e7ff]">
              <img src="/images/home.svg" className="w-7" alt="Home" />
              <h3>Home</h3>
            </button>
            <button className="w-full opacity-50 flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img
                src="/images/myDrive.svg"
                className="w-7"
                alt="My Drive"
              />
              <h3>My Drive (N/A)</h3>
            </button>
            <button className="w-full opacity-50  flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img
                src="/images/computer.svg"
                className="w-7"
                alt="Computers"
              />
              <h3>Computers (N/A)</h3>
            </button>
          </div>

          {/* Secondary navigation - placeholder items */}
          <div className="flex flex-col">
            <button className="w-full opacity-50  flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img src="/images/shared.svg" className="w-7" alt="Shared" />
              <h3>Shared (N/A)</h3>
            </button>
            <button className="w-full opacity-50  flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img src="/images/recent.svg" className="w-7" alt="Recent" />
              <h3>Recent (N/A)</h3>
            </button>
            <button className="w-full opacity-50  flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img
                src="/images/starred.svg"
                className="w-7"
                alt="Starred"
              />
              <h3>Starred (N/A)</h3>
            </button>
          </div>

          {/* Storage section with progress bar */}
          <div className="flex flex-col">
            <button className="w-full opacity-50  flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img src="/images/spam.svg" className="w-7" alt="Spam" />
              <h3>Spam (N/A)</h3>
            </button>
            <button className="w-full opacity-50  flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img src="/images/trash.svg" className="w-7" alt="Trash" />
              <h3>Trash (N/A)</h3>
            </button>
            <button title={`${storage}/10000000 Bytes`} className="w-full flex items-center gap-4 px-5 py-1 rounded-full">
              <img
                src="/images/storage.svg"
                className="w-7"
                alt="Storage"
              />
              <h3>Storage</h3>
            </button>
            <div className="flex flex-col gap-2 px-5 py-1 items-center mt-1">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full"
                  style={{
                    width: `${(storage / (10 * 1024 * 1024)) * 100}%`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-700">
                {storage !== null
                  ? `${(storage / (1024 * 1024)).toFixed(2)} MB of 10 MB used`
                  : "Loading..."}
              </p>
              <button className="opacity-50  w-[175px] h-[40px] py-1 px-1 rounded-full border border-black text-blue-600 font-medium hover:bg-[#e9eef6] transition-colors duration-50">
                Get more storage (N/A)
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewFileModal
        isOpen={isFileModalOpen}
        onClose={() => setIsFileModalOpen(false)}
        onSuccess={handleFileSuccess}
      />
      <NewFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onSuccess={handleFolderSuccess}
      />
    </>
  );
};

export default Sidebar;