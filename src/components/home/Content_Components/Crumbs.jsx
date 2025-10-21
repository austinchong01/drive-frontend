// src/components/home/Content_Components/Crumbs.jsx
import { useState, useEffect } from "react";
import { api } from "../../../services/folder";
import { useError } from "../../../contexts/ErrorContext";
import Crumb from "./Crumb";

const Crumbs = ({ folderId }) => {
  const { showError } = useError();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const fetchCrumbs = async () => {
      const result = await api.getCrumbs(folderId);

      if (result.success) {
        setBreadcrumbs(result.data.breadcrumbs);
      } else {
        showError(`Failed to load crumbs: ${result.error}`);
      }
    };

    fetchCrumbs();
  }, [folderId]);

  return (
    <div>
      {breadcrumbs.map((crumb, index) => {
        if (index === breadcrumbs.length - 1) // if curr folder
          return <span key={crumb.id}>{crumb.name}</span>;
        return (
          <span key={crumb.id}>
            <Crumb folder={crumb} /> /
          </span>
        );
      })}
    </div>
  );
};

export default Crumbs;
