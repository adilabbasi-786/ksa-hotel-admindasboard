import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import DropDown from "./DropDown";
import SalaryTable from "./EmployeeSalaryTable";
import EmployeeDropDown from "./EmployeeDropDown";

const Index = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box mb="20px">
        <DropDown onSelectHotel={handleSelectHotel} />
      </Box>
      <Box mb="20px">
        {selectedHotel && <EmployeeDropDown selectedHotel={selectedHotel} />}
      </Box>
      {/* {selectedHotel && <SalaryTable selectedHotel={selectedHotel} />} */}
    </Box>
  );
};

export default Index;
