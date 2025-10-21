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
  const [messageKey, setMessageKey] = useState(0);

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