import React, { useState } from "react";
import ProfitTable from "./ProfitTable";
import DropDown from "./DropDown";
import { Box } from "@chakra-ui/react";

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
      {selectedHotel && <ProfitTable electedHotel={selectedHotel} />}
    </Box>
  );
};

export default Index;
