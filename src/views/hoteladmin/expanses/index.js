import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import KitchenExpanses from "./KitchenExpanses";
import { Card } from "@mui/material";

const Expanse = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
  };

  return (
    <Router>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <KitchenExpanses />
      </Box>
    </Router>
  );
};

export default Expanse;
