import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import DropDown from "./DropDown";
import SalaryTable from "./SalaryTable";

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
      {selectedHotel && <SalaryTable electedHotel={selectedHotel} />}
    </Box>
  );
};

export default Index;
