import React, { useState } from "react";
import { Box, Select, Button, SimpleGrid } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card";

const allHotel = [
  { id: 1, name: "hotel1" },
  { id: 2, name: "hotel2" },
  { id: 3, name: "hotel3" },
  { id: 4, name: "hotel4" },
  { id: 5, name: "hotel5" },
  { id: 6, name: "hotel6" },
  { id: 7, name: "hotel7" },
  { id: 8, name: "hotel8" },
  { id: 9, name: "hotel9" },
  { id: 10, name: "hotel10" },
];

const DropDown = ({ onSelectHotel }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const handleSelectChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedHotel) {
      onSelectHotel(selectedHotel);
    }
  };

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Select
        placeholder="Select Hotel"
        value={selectedHotel}
        onChange={handleSelectChange}
      >
        {allHotel.map((hotel) => (
          <option key={hotel.id} value={hotel.id}>
            {hotel.name}
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
