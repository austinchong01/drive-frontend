// src/components/home/File.jsx

const File = ({ file }) => {
  const handleViewFile = () => {
    window.open(file.cloudinaryUrl, '_blank');
  };

  return (
    <div style={{width: "300px"}}>
      <h3>{file.displayName}</h3>
      <button onClick={handleViewFile}>View File</button>
      <p>Size: {file.size} bytes</p>
      <p>Updated: {new Date(file.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default File;