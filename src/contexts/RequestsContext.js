import { createContext, useState, useContext } from 'react';

export const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requestMade, setRequestMade] = useState(false);

  const toggleRequestMade = () => {
    setRequestMade(prevState => !prevState);
  };

  return (
    <RequestsContext.Provider value={{ requestMade, toggleRequestMade }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
