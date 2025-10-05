import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null); // initially null

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;


// import React, { createContext, useState } from "react";

// export const CaptainDataContext = createContext();

// const CaptainContext = ({ children }) => {
//   const [captain, setCaptain] = useState(() => {
//     const saved = localStorage.getItem("captain");
//     return saved ? JSON.parse(saved) : null;   // load from localStorage if available
//   });

//   // custom setter that also syncs with localStorage
//   const updateCaptain = (data) => {
//     setCaptain(data);
//     if (data) {
//       localStorage.setItem("captain", JSON.stringify(data));
//     } else {
//       localStorage.removeItem("captain");
//     }
//   };

//   return (
//     <CaptainDataContext.Provider value={{ captain, setCaptain: updateCaptain }}>
//       {children}
//     </CaptainDataContext.Provider>
//   );
// };

// export default CaptainContext;

