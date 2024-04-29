import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import RentKafalat from "./RentKafalat";

const Index = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box mb="20px"></Box>
      <RentKafalat />
    </Box>
  );
};

export default Index;
