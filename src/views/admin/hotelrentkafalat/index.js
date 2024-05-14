import React, { useState } from "react";
import DropDown from "./DropDown";
import { Box } from "@chakra-ui/react";
import RentKafalat from "./RentKafalat";

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
      {selectedHotel && <RentKafalat selectedHotel={selectedHotel} />}
    </Box>
  );
};

export default Index;
