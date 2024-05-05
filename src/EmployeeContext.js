import React, { createContext, useState } from "react";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
    console.log("hotel select index", selectedHotel);
  };

  return (
    <EmployeeContext.Provider
      value={{
        selectedHotel,
        setSelectedHotel,
        onSelectHotel: handleSelectHotel,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
