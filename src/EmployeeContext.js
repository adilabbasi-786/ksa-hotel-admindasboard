import React, { createContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <EmployeeContext.Provider value={{ selectedHotel, setSelectedHotel }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
