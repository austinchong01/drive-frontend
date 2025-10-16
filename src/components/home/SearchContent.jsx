// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useError } from "../../contexts/ErrorContext";
import FolderList from "./Content_Components/FolderList";
import FileList from "./Content_Components/FileList";

const SearchContent = ({ itemDeleted, query}) => {
  // console.log("rendered Search Content")
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
      {
        <>
          <FolderList
            initialFolders={foundFiles}
            onFolderDelete={itemDeleted}
          />
          <FileList
            initialFiles={foundFolders}
            onFileDelete={itemDeleted}
          />
        </>
      }
    </div>
  );
};

export default SearchContent;
