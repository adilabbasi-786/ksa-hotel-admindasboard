import { Box, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EmployeesData from "./EmployeesData";
import DropDown from "./DropDown";

const Employer = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
    console.log("hotel select index", selectedHotel);
  };
  return (
    <Router>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Switch>
          <Route path="/admin/emp-tables">
            <DropDown onSelectHotel={handleSelectHotel} />
            {selectedHotel && <EmployeesData selectedHotel={selectedHotel} />}
          </Route>
        </Switch>
      </Box>
    </Router>
  );
};

export default Employer;
