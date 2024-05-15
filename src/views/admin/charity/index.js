import React, { useState } from "react";
import DropDown from "./DropDown";
import { Box } from "@chakra-ui/react";
import Charity from "./Charity";

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
      {selectedHotel && <Charity selectedHotel={selectedHotel} />}
    </Box>
  );
};

export default Index;
