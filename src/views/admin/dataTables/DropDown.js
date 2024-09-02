import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Select,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card";
import axios from "axios";
import EmployeeContext from "../../../EmployeeContext";
import { URL } from "Utils";

const DropDown = ({ onSelectHotel }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchHotelNames();
  }, []);
  const token = localStorage.getItem("token");

  const fetchHotelNames = async () => {
    try {
      const response = await axios.get(`${URL}/api/hotel-names`, {
        headers: {
          Authorization: `Bearar ${token}`,
        },
      });
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotel names:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedHotel) {
      onSelectHotel(selectedHotel);
      console.log("selectedHotel", selectedHotel);
    }
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        Hotel Employee
      </Text>
      <Select
        placeholder="Select Hotel"
        value={selectedHotel}
        onChange={handleSelectChange}
      >
        {hotels?.data?.map((hotel) => (
          <option key={hotel?.id} value={hotel?.id}>
            {hotel?.attributes?.name}
          </option>
        ))}
      </Select>
      <Button
        onClick={handleSubmit}
        colorScheme="blue"
        width="fit-content"
        mt="10px"
        alignSelf="flex-end"
      >
        Submit
      </Button>
    </Card>
  );
};

export default DropDown;
