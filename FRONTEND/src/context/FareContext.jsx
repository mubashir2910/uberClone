// FareContext.jsx
import { createContext, useState } from "react";

export const FareContext = createContext();

export const FareProvider = ({ children }) => {
  const [fare, setFare] = useState({});
  return (
    <FareContext.Provider value={{ fare, setFare }}>
      {children}
    </FareContext.Provider>
  );
};
