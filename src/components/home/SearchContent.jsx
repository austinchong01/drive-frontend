// src/components/home/SearchContent.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useError } from "../../contexts/ErrorContext";
import FolderList from "./Content_Components/FolderList";
import FileList from "./Content_Components/FileList";

const SearchContent = ({ query, itemDeleted }) => {
  const { showError } = useError();
  const [foundFiles, setFoundFiles] = useState([]);
  const [foundFolders, setFoundFolders] = useState([]);
  // const [loading, setLoading] = useState(true);

  // load all files and folders from Search Query
  useEffect(() => {
    const fetchContents = async () => {
      // setLoading(true);
      const result = await api.search(query);

      if (result.success) {
        setFoundFolders(result.data.folders);
        setFoundFiles(result.data.files);
      } else {
        showError(`Failed to load search results: ${result.error}`);
      }
      // setLoading(false);
    };

    fetchContents();
  }, [query]);

  return (
    <div style={{ flex: 1, padding: "20px", border: "1px solid black" }}>
      <h2>Search Results for: "{query}"</h2>
      <FolderList
        initialFolders={foundFolders}
        createdFolder={undefined}
        onFolderDelete={itemDeleted}
      />
      <FileList
        initialFiles={foundFiles}
        createdFile={undefined}
        onFileDelete={itemDeleted}
      />
    </div>
  );
};

export default SearchContent;