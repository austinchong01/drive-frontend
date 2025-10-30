// src/components/home/Content_Components/Crumbs.jsx
import { useState, useEffect } from "react";
import { api } from "../../../services/folder";
import { useError } from "../../../contexts/ErrorContext";
import Crumb from "./Crumb";

const Crumbs = ({ folderId }) => {
  const { showError } = useError();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrumbs = async () => {
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

  return (
    <>
      {loading ? (
        <p className="ml-1 mt-1">Loading crumbs...</p>
      ) : (
        <div className="text-3xl flex gap-2 items-center sticky top-0 w-full py-5 bg-white z-10">
          {breadcrumbs.map((crumb, index) => {
            if (index === breadcrumbs.length - 1)
              // if curr folder
              return (
                <div
                  key={crumb.id}
                  className="px-4 py-2 rounded-full"
                >
                  {crumb.name}
                </div>
              );
            return (
              <div className="flex gap-2 items-center text-gray-600" key={crumb.id}>
                <Crumb folder={crumb} />
                <div className="text-gray-400">&gt;</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Crumbs;
