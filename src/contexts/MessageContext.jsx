// src/contexts/MessageContext.jsx

/**
 * Message Context
 * Provides global success/info notification system with auto-dismiss toast functionality.
 * Messages are displayed for 3 seconds before auto-clearing.
 * 
 * @example
 * const { showMessage } = useMessage();
 * showMessage('File uploaded successfully');
 */

import { createContext, useContext, useState, useCallback } from 'react';

const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context)
    throw new Error('useMessage must be used within MessageProvider');
  return context;
};

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [messageKey, setMessageKey] = useState(0); // Key increments to re-render

  const showMessage = useCallback((message) => {
    setMessage(message);
    setMessageKey(prev => prev + 1);
  }, []);

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return (
    <MessageContext.Provider value={{ message, messageKey, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};