import { Box } from "@chakra-ui/react";
import React from "react";
import Hotels from "../profile/components/Hotels";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AddHotel from "./AddHotel";
import HotelDetail from "./HotelDetail";
const Hotel = () => {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Switch>
        <Route exact path="/admin/hotel">
          <Hotels />
        </Route>
        <Route exact path="/admin/hotel/add">
          <AddHotel />
        </Route>
        <Route exact path="/admin/hotel/:id">
          <HotelDetail />
        </Route>
      </Switch>
    </Box>
  );
};

export default Hotel;
