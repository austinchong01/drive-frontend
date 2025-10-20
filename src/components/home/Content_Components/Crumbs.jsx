// src/components/home/Content_Components/Crumbs.jsx
import { useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { api } from "../../../services/folder";
import { useError } from "../../../contexts/ErrorContext";
import { Link } from "react-router-dom";

const Crumbs = ({ folderId }) => {
  // console.log("rendered Crumbs")
  const { showError } = useError();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  // const [loading, setLoading] = useState(true);

  const normFolderId = folderId === undefined ? "" : folderId;

  useEffect(() => {
    const fetchCrumbs = async () => {
      // setLoading(true);
      const result = await api.getCrumbs(normFolderId);

      if (result.success) {
        setBreadcrumbs(result.data.breadcrumbs);
      } else {
        showError(`Failed to load crumbs: ${result.error}`);
      }
      // setLoading(false);
    };

    fetchCrumbs();
  }, [normFolderId]);

  // const { setNodeRef: setDropRef, isOver } = useDroppable({
  //   id: `folder-drop-${crumb.id}`,
  //   data: {
  //     type: "folder",
  //     item: folder,
  //   },
  // });

  // if (loading) {
  //   return <div>Loading breadcrumbs...</div>;
  // }

  if (!normFolderId) return <div>/ root</div>;

  const crumbElements = breadcrumbs.map((crumb, index) => {
    return (
      <span key={crumb.id}>
        <span> / </span>
        {crumb.id === normFolderId ? (
          <span>{crumb.name}</span>
        ) : (
          <Link to={index === 0 ? "/home" : `/folders/${crumb.id}`}>
            {crumb.name}
          </Link>
        )}
      </span>
    );
  });

  return <div>{crumbElements}</div>;
};

export default Crumbs;
