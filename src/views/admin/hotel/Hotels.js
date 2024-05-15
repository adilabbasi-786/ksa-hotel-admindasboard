import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import { useHistory } from "react-router-dom";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";

const Hotels = () => {
  const history = useHistory();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  useEffect(() => {
    const getData = async () => {
      let req = await fetch("http://localhost:1337/api/hotel-names?populate=*");
      let res = await req.json();
      setHotels(res.data);
    };
    getData();
    console.log("data", getData);
  }, []);

  const handleCreateHotel = () => {
    history.push("/admin/hotel/add");
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex w="100%">
        <Button
          me="100%"
          mb="50px"
          w="140px"
          minW="140px"
          mt={{ base: "20px", "2xl": "auto" }}
          variant="brand"
          fontWeight="500"
          onClick={handleCreateHotel}
        >
          Create
        </Button>
      </Flex>

      <Card mb={{ base: "0px", "2xl": "20px" }}>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          All Hotels
        </Text>
        {hotels &&
          hotels?.map((hotel) => (
            <HotelCard
              key={hotel?.id}
              id={hotel?.id}
              boxShadow={cardShadow}
              mb="20px"
              image={`http://localhost:1337${hotel?.attributes?.img?.data?.attributes?.url}`}
              ranking={hotel?.id}
              link={`hotel/${hotel.id}`}
              title={hotel?.attributes?.name}
              managerName={hotel?.attributes?.managerName}
              managerEmail={hotel?.attributes?.managerEmail}
              managerPassword={hotel?.attributes?.managerPassword}
              hotelRent={hotel?.attributes?.hotelRent}
              kafalat={hotel?.attributes?.kafalat}
            />
          ))}
      </Card>
    </Box>
  );
};

export default Hotels;
