// src/components/home/Content_Components/Crumbs.jsx
import { useState, useEffect } from "react";
import { api } from "../../../services/folder";
import { useError } from "../../../contexts/ErrorContext";
import { Link } from "react-router-dom";

const Crumbs = ({ folderId }) => {
  const { showError } = useError();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (folderId === undefined) folderId = "";
    const fetchCrumbs = async () => {
      setLoading(true);
      const result = await api.getCrumbs(folderId);

      if (result.success) {
        setBreadcrumbs(result.data.breadcrumbs);
      } else {
        showError(`Failed to load crumbs: ${result.error}`);
      }
      setLoading(false);
    };

    fetchCrumbs();
  }, [folderId]);

  if (loading) {
    return <div>Loading breadcrumbs...</div>;
  }

  const displayBreadcrumbs = breadcrumbs.slice(1);

  return (
    <div>
      {displayBreadcrumbs.map((crumb, index) => {
        const isLast = index === displayBreadcrumbs.length - 1;

        return (
          <span key={crumb.id}>
            <span> / </span>
            {isLast ? (
              <span>{crumb.name}</span>
            ) : (
              <Link to={`/folders/${crumb.id}`}>{crumb.name}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Crumbs;