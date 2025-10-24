// src/components/home/Sidebar.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/user";
import { useError } from "../../contexts/ErrorContext";
import NewFolderModal from "../../contexts/modals/NewFolderModal";
import NewFileModal from "../../contexts/modals/NewFileModal";

const Sidebar = ({ onFileCreated, onFolderCreated, storageTrigger }) => {
  const [storage, setStorage] = useState(null);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const { showError } = useError();

  const fetchUserProfile = async () => {
    const result = await api.getUserProfile();

    if (result.success) {
      setStorage(result.data.storage);
    } else {
      showError(`Storage Error: ${result.error}`);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [storageTrigger]);

  const handleFileSuccess = (newFile) => {
    setIsFileModalOpen(false);
    onFileCreated(newFile);
    fetchUserProfile();
  };

  const handleFolderSuccess = (newFolder) => {
    setIsFolderModalOpen(false);
    onFolderCreated(newFolder);
  };

  return (
    <>
      <div className="flex flex-col bg-[#f8fafd] w-[244px] gap-5 px-5">
        <div className="flex flex-col gap-3">
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
          <div className="flex flex-col">
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full bg-[#c2e7ff]">
              <img src="/images/home.svg" className="w-[25px]" alt="Home" />
              <h3>Home</h3>
            </button>
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img
                src="/images/myDrive.svg"
                className="w-[25px]"
                alt="My Drive"
              />
              <h3>My Drive</h3>
            </button>
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img
                src="/images/computer.svg"
                className="w-[25px]"
                alt="Computers"
              />
              <h3>Computers</h3>
            </button>
          </div>

          <div className="flex flex-col">
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img src="/images/shared.svg" className="w-[25px]" alt="Shared" />
              <h3>Shared with me</h3>
            </button>
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img src="/images/recent.svg" className="w-[25px]" alt="Recent" />
              <h3>Recent</h3>
            </button>
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img
                src="/images/starred.svg"
                className="w-[25px]"
                alt="Starred"
              />
              <h3>Starred</h3>
            </button>
          </div>

          <div className="flex flex-col">
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img src="/images/spam.svg" className="w-[25px]" alt="Spam" />
              <h3>Spam</h3>
            </button>
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img src="/images/trash.svg" className="w-[25px]" alt="Trash" />
              <h3>Trash</h3>
            </button>
            <button className="w-[204px] flex items-center gap-4 px-5 py-1 rounded-full hover:bg-[#5f636833] transition-colors duration-5">
              <img
                src="/images/storage.svg"
                className="w-[25px]"
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
              <button className="w-[175px] h-[40px] py-1 px-1 rounded-full border border-black text-blue-600 font-medium hover:bg-[#e9eef6] transition-colors duration-50">
                Get more storage
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
