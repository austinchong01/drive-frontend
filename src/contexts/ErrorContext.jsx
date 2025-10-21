import { createContext, useContext, useState, useCallback } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context)
    throw new Error('useError must be used within ErrorProvider');
  return context;
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [errorKey, setErrorKey] = useState(0);

  const showError = useCallback((message) => {
    setError(message);
    setErrorKey(prev => prev + 1);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, errorKey, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};