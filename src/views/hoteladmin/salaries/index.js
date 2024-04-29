import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import SalaryTable from "./SalaryTable";
import DropDown from "./DropDown";

const Index = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box mb="20px"></Box>
      <SalaryTable />
      {/* <DropDown /> */}
    </Box>
  );
};

export default Index;
