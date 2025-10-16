// src/contexts/ModalContext.jsx
import { createContext, useContext, useState, useCallback, useMemo } from "react";
import RenameFileModal from "./RenameFileModal";
import RenameFolderModal from "./RenameFolderModal";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [fileModalState, setFileModalState] = useState(null);
  const [folderModalState, setFolderModalState] = useState(null);

  const openFileRenameModal = useCallback((file, onSuccess) => {
    setFileModalState({ file, onSuccess });
  }, []);

  const closeFileRenameModal = useCallback(() => {
    setFileModalState(null);
  }, []);

  const openFolderRenameModal = useCallback((folder, onSuccess) => {
    setFolderModalState({ folder, onSuccess });
  }, []);

  const closeFolderRenameModal = useCallback(() => {
    setFolderModalState(null);
  }, []);

  const value = useMemo(
    () => ({
      openFileRenameModal,
      closeFileRenameModal,
      openFolderRenameModal,
      closeFolderRenameModal,
    }),
    [openFileRenameModal, closeFileRenameModal, openFolderRenameModal, closeFolderRenameModal]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      {fileModalState && (
        <RenameFileModal
          onClose={closeFileRenameModal}
          onSuccess={(fileId, newName) => {
            fileModalState.onSuccess(fileId, newName);
            closeFileRenameModal();
          }}
          file={fileModalState.file}
        />
      )}

      {folderModalState && (
        <RenameFolderModal
          onClose={closeFolderRenameModal}
          onSuccess={(folderId, newName) => {
            folderModalState.onSuccess(folderId, newName);
            closeFolderRenameModal();
          }}
          folder={folderModalState.folder}
        />
      )}
    </ModalContext.Provider>
  );
};