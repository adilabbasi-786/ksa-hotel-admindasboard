import { Box, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddEmpoyee from "./AddEmpoyee";
import EmployeesData from "./EmployeesData";
import DropDown from "./DropDown";
import EmployeeContext from "EmployeeContext";

const Employer = () => {
  const { selectedHotel } = useContext(EmployeeContext);
  return (
    <Router>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Switch>
          <Route path="/admin/emp-tables">
            <DropDown />
            {selectedHotel && <EmployeesData selectedHotel={selectedHotel} />}
          </Route>
        </Switch>
      </Box>
    </Router>
  );
};

export default Employer;
