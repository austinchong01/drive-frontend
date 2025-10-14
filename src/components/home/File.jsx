// src/components/home/File.jsx

const File = ({ file }) => {
  const handleViewFile = () => {
    window.open(file.cloudinaryUrl, "_blank");
  };
  const handleDownloadFile = () => {};
  const handleRenameFile = () => {};

  const handleDeleteFile = () => {};

  return (
    <div style={{ border: "1px solid green", width: "300px" }}>
      <h3>{file.displayName}</h3>
      <button onClick={handleViewFile}>View File</button>
      <p>Size: {file.size} bytes</p>
      <p>Updated: {new Date(file.updatedAt).toLocaleString()}</p>
      <button onClick={handleDownloadFile}>DOWNLOAD</button>
      <button onClick={handleRenameFile}>RENAME</button>
      <button onClick={handleDeleteFile}>DELETE</button>
    </div>
  );
};

export default File;
