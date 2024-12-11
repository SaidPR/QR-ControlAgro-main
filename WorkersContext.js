/* import React, { createContext, useState } from "react";

export const WorkersContext = createContext();

export const WorkersProvider = ({ children }) => {
  const [workers, setWorkers] = useState([
    { id: "1", name: "Morgan James", phone: "1234567890", location: "Zamora Mich.", profilePhoto: null },
    { id: "2", name: "John Doe", phone: "9876543210", location: "Uruapan Mich.", profilePhoto: null },
  ]);

  return (
    <WorkersContext.Provider value={{ workers, setWorkers }}>
      {children}
    </WorkersContext.Provider>
  );
};
 */