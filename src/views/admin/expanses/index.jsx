import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Expanse = () => {
  return (
    <Router>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>Expanse</Box>
    </Router>
  );
};

export default Expanse;
