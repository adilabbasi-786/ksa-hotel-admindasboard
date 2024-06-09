import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import { useHistory } from "react-router-dom";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import { URL } from "Utils";

const Hotels = () => {
  const history = useHistory();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const getData = async () => {
    let req = await fetch(
      `${URL}/api/hotel-names?populate=*`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let res = await req.json();
    setHotels(res.data);
    console.log("data", res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDeleteHotel = (id) => {
    setHotels((prevHotels) => prevHotels.filter((hotel) => hotel.id !== id));
  };
  const handleUpdateHotel = (updatedHotel) => {
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === updatedHotel.id ? { ...hotel, ...updatedHotel } : hotel
      )
    );
  };

  const handleCreateHotel = () => {
    history.push("/admin/hotel/add");
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex w="100%">
        <Button
          me="100%"
          mb="20px"
          w="140px"
          minW="140px"
          mt="-80px"
          // mt={{ base: "10px", "1xl": "auto" }}
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
              onDeleteHotel={handleDeleteHotel}
              onUpdateHotel={handleUpdateHotel}
              key={hotel?.id}
              id={hotel?.id}
              boxShadow={cardShadow}
              mb="20px"
              image={`${URL}${hotel?.attributes?.img?.data?.attributes?.url}`}
              ranking={hotel?.id}
              link={`hotel/${hotel.id}`}
              title={hotel?.attributes?.name}
              name={hotel?.attributes?.name}
              managerName={hotel?.attributes?.managerName}
              managerEmail={hotel?.attributes?.managerEmail}
              managerPassword={hotel?.attributes?.managerPassword}
              managerPhoneNumber={hotel?.attributes?.managerPhoneNumber}
              kafeelName={hotel?.attributes?.kafeelName}
              KafeelPhoneNumber={hotel?.attributes?.KafeelPhoneNumber}
              liscencePicture={`${URL}${hotel?.attributes?.liscencePicture?.data?.attributes?.url}`}
              ComercialCertificate={`${URL}${hotel?.attributes?.ComercialCertificate?.data?.attributes?.url}`}
              TaxVatPicture={`${URL}${hotel?.attributes?.TaxVatPicture?.data?.attributes?.url}`}
              getData={getData}
            />
          ))}
      </Card>
    </Box>
  );
};

export default Hotels;
