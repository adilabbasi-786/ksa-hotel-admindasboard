import React from "react";
import HotelForm from "./HotelForm";
import { Box, SimpleGrid } from "@chakra-ui/react";

const AddHotel = () => {
  return (
    <>
      <Box>
        <h1>ADD HOTEL</h1>

        <HotelForm />
      </Box>
    </>
  );
};

export default AddHotel;
