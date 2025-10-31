// src/components/home/Content_Components/File.jsx

/**
 * File Component
 * Displays a single file with drag, download, rename, preview, and delete capabilities.
 * Shows file type icon, name, last updated date, and size.
 * Double-click to open preview modal.
 * 
 * @param {Object} file - File object with id, displayName, mimetype, size, cloudinaryUrl, updatedAt
 * @param {Function} onDelete - Callback with (fileId) when file is deleted
 * @param {Function} onRenameClick - Callback to open rename modal
 * @param {string} openDropdownId - ID of file with open dropdown menu
 * @param {Function} onToggleDropdown - Callback to toggle dropdown visibility
 * @param {string} highlightId - ID of currently selected file
 * @param {Function} onToggleHighlight - Callback to toggle selection
 */

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { api } from "../../../services/file";
import { useMessage } from "../../../contexts/MessageContext";
import { useError } from "../../../contexts/ErrorContext";
import { useModal } from "../../../contexts/ModalContext";

const File = ({
  file,
  onDelete,
  onRenameClick,
  openDropdownId,
  onToggleDropdown,
  highlightId,
  onToggleHighlight,
}) => {
  const { showMessage, clearMessage } = useMessage();
  const { showError } = useError();
  const { openPreviewModal } = useModal();
  const [loading, setLoading] = useState(false);

  const isHighlighted = highlightId === file.id;

  /**
   * Returns appropriate icon based on file MIME type
   */
  const getFileImage = () => {
    if (file.mimetype.startsWith("image/"))
      return <img src="/images/image.svg" alt="image" className="w-[30px]" />;
    if (file.mimetype.startsWith("video/"))
      return <img src="/images/video.svg" alt="video" className="w-[30px]" />;
    if (file.mimetype.startsWith("audio/"))
      return <img src="/images/audio.svg" alt="audio" className="w-[30px]" />;
    if (file.mimetype === "application/pdf")
      return <img src="/images/pdf.svg" alt="pdf" className="w-[30px]" />;
    return <img src="/images/file.svg" alt="file" className="w-[30px]" />;
  };

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `file-${file.id}`,
    data: {
      type: "file",
      item: file,
      image: getFileImage(),
      name: file.displayName,
    },
  });

  const handleDownloadFile = (e) => {
    e.stopPropagation();
    onToggleDropdown(null);
    // Modify Cloudinary URL to force download with original filename
    const downloadUrl = file.cloudinaryUrl.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(file.displayName)}/`
    );
    showMessage(`${file.displayName} download started...`);
    window.location.href = downloadUrl;
  };

  const handleDeleteFile = async (e) => {
    e.stopPropagation();
    setLoading(true);
    onToggleDropdown(null);
    showMessage(`Deleting ${file.displayName}...`);
    const result = await api.deleteFile(file.id);

    if (result.success) {
      showMessage(`Delete File ${file.displayName}`);
      onDelete(file.id);
    } else {
      showError(`Delete File Error: ${result.error}`);
      clearMessage();
    }
    setLoading(false);
  };

  const handleRename = (e) => {
    e.stopPropagation();
    onToggleDropdown(null);
    onRenameClick();
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onToggleHighlight(file.id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    openPreviewModal(file);
  };

  const isDropdownOpen = openDropdownId === file.id;

  const newDate = new Date(file.updatedAt);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {loading ? (
        <div className="border-b border-gray-400 flex h-15 items-center p-3 bg-white">
          <span className="opacity-50">Deleting File...</span>
        </div>
      ) : (
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          className={`border-b border-gray-400 flex h-15 items-center p-3 transition-colors duration-75 ${
            isHighlighted ? "bg-[#c2e7ff]" : "bg-white hover:bg-[#5f636833]"
          } ${isDragging ? "opacity-50 hover:bg-white" : "opacity-100"}`}
          title={file.displayName}
        >
          <div className="flex-1 flex items-center min-w-97 gap-4 font-medium text-lg">
            <div>{getFileImage()}</div>
            <h3>{file.displayName}</h3>
          </div>

          <p className="flex-1 min-w-40 max-w-120">{formattedDate}</p>
          <p className="flex-1 min-w-40 max-w-120">{(file.size / 1000000).toFixed(3)} MB</p>
          <div
            onPointerDown={(e) => e.stopPropagation()}
            className="w-12 flex-shrink-0 items-center relative"
          >
            <img
              src="/images/more.svg"
              alt="more"
              onClick={() => onToggleDropdown(file.id)}
              className="w-[40px] cursor-pointer rounded-full p-2 hover:bg-gray-400 transition-colors duration-75"
            />
            {isDropdownOpen && (
              <div className="absolute right-0 top-full w-40 mt-1 flex flex-col bg-white border border-gray-300 rounded shadow-md z-10 animate-dropSlideDown">
                <button
                  onClick={handleDownloadFile}
                  className="flex items-center gap-2 text-left hover:bg-gray-300 px-4 py-2"
                >
                  <img
                    src="/images/download.svg"
                    alt="download"
                    className="w-4 shrink-0"
                  />
                  <span>Download</span>
                </button>
                <button
                  onClick={handleRename}
                  className="flex items-center gap-2 text-left hover:bg-gray-300 px-4 py-2"
                >
                  <img
                    src="/images/rename.svg"
                    alt="rename"
                    className="w-4 shrink-0"
                  />
                  <span>Rename</span>
                </button>
                <button
                  onClick={handleDeleteFile}
                  className="flex items-center gap-2 text-left hover:bg-red-200 px-4 py-2"
                >
                  <img
                    src="/images/trash.svg"
                    alt="delete"
                    className="w-4 shrink-0"
                  />
                  <span>Move to trash</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default File;