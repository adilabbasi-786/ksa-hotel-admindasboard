import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddEmpoyee from "./AddEmpoyee";
import EmployeesData from "./EmployeesData";
import DropDown from "./DropDown";

const Employer = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
  };

  return (
    <Router>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Switch>
          {/* <Route exact path="/admin/emp-tables/add">
            <AddEmpoyee />
          </Route> */}
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
