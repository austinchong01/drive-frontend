// src/contexts/ModalContext.jsx

/**
 * Modal Context
 * Centralized modal management system for file/folder rename and preview modals.
 * Provides hooks to open/close modals from anywhere in the component tree.
 * 
 * @example
 * const { openFileRenameModal } = useModal();
 * openFileRenameModal(file, (fileId, newName) => {
 *   // handle successful rename
 * });
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import RenameFileModal from "./modals/RenameFileModal";
import RenameFolderModal from "./modals/RenameFolderModal";
import PreviewModal from "./modals/PreviewModal";

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  // Modal state: stores { file, onSuccess } when open, null when closed
  const [fileModalState, setFileModalState] = useState(null);
  const [folderModalState, setFolderModalState] = useState(null);
  const [previewModalState, setPreviewModalState] = useState(null);

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

  const openPreviewModal = useCallback((file) => {
    setPreviewModalState(file);
  }, []);

  const closePreviewModal = useCallback(() => {
    setPreviewModalState(null);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      openFileRenameModal,
      closeFileRenameModal,
      openFolderRenameModal,
      closeFolderRenameModal,
      openPreviewModal,
      closePreviewModal,
    }),
    [
      openFileRenameModal,
      closeFileRenameModal,
      openFolderRenameModal,
      closeFolderRenameModal,
      openPreviewModal,
      closePreviewModal,
    ]
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

      {previewModalState && (
        <PreviewModal
          onClose={closePreviewModal}
          file={previewModalState}
        />
      )}
    </ModalContext.Provider>
  );
};