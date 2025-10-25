// src/components/home/Content_Components/File.jsx
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

  const isHighlighted = highlightId === file.id;

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `file-${file.id}`,
    data: {
      type: "file",
      item: file,
      name: file.displayName,
    },
  });

  const handleDownloadFile = (e) => {
    e.stopPropagation();
    const downloadUrl = file.cloudinaryUrl.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(file.displayName)}/`
    );
    showMessage(`${file.displayName} download started...`);
    window.location.href = downloadUrl;
  };

  const handleDeleteFile = async (e) => {
    e.stopPropagation();
    showMessage(`Deleting ${file.displayName}...`);
    const result = await api.deleteFile(file.id);

    if (result.success) {
      showMessage(`Delete File ${file.displayName}`);
      onDelete(file.id);
    } else {
      showError(`Delete File Error: ${result.error}`);
      clearMessage();
    }
  };

  const handleRename = (e) => {
    e.stopPropagation();
    onRenameClick();
  };

  const toggleDropdown = (e) => {
    onToggleDropdown(file.id);
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

  const getFileImage = () => {
    if (file.mimetype.startsWith("image/"))
      return (
        <img src="/images/image.svg" alt="image" style={{ width: "30px" }} />
      );
    if (file.mimetype.startsWith("video/"))
      return (
        <img src="/images/video.svg" alt="video" style={{ width: "30px" }} />
      );
    if (file.mimetype.startsWith("audio/"))
      return (
        <img src="/images/audio.svg" alt="audio" style={{ width: "30px" }} />
      );
    if (file.mimetype === "application/pdf")
      return <img src="/images/pdf.svg" alt="pdf" style={{ width: "30px" }} />;
    return <img src="/images/file.svg" alt="file" style={{ width: "30px" }} />;
  };

  const newDate = new Date(file.updatedAt);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        opacity: isDragging ? 0.5 : 1, // Visual feedback
      }}
      className={`border-b border-gray-400 flex items-center p-3 ${
        isHighlighted ? "bg-[#c2e7ff]" : "bg-white hover:bg-[#5f636833]"
      }`}
    >
      <div className="flex-1 flex items-center min-w-100 gap-4 font-medium">
        <div>{getFileImage()}</div>
        <h3>{file.displayName}</h3>
      </div>

      <p className="w-75">{formattedDate}</p>
      <p className="w-50">{(file.size / 1000000).toFixed(3)} MB</p>
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="ml-auto items-center"
      >
        <img
          src="/images/more.svg"
          alt="more"
          onClick={toggleDropdown}
          className="w-[40px] cursor-pointer rounded-full p-2 hover:bg-gray-400 transition-colors"
        />
        {isDropdownOpen && (
          <div className="absolute right-30 flex flex-col bg-white border border-gray-300 rounded shadow-md z-10 origin-top animate-slideDown">
            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-2 text-left hover:bg-gray-300 px-4 py-2"
            >
              <img
                src="/images/download.svg"
                alt="rename"
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
  );
};

export default File;
