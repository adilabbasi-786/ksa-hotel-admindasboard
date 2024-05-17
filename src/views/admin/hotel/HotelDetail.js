import { Button, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import Information from "views/admin/expanses/components/Information";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { URL } from "Utils";

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      let req = await fetch(
        `${URL}/api/hotel-names?populate=*&[filters][id]=${id}`
      );
      let res = await req.json();
      setHotel(res.data);
    };
    getData();
    console.log("data", getData);
  }, [id]);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Button
        colorScheme="blue"
        width="fit-content"
        mt="10px"
        alignSelf="center"
        onClick={() => history.push("/admin/hotel")}
      >
        Back
      </Button>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Hotel Information
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        As we live, our hearts turn colder. Cause pain is what we go through as
        we become older. We get insulted by others, lose trust for those others.
        We get back stabbed by friends. It becomes harder for us to give others
        a hand. We get our heart broken by people we love, even that we give
        them all...
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        <Information
          boxShadow={cardShadow}
          title="Hotel Name"
          value={hotel[0]?.attributes?.name}
        />
        <Information
          boxShadow={cardShadow}
          title="Manager"
          value={hotel[0]?.attributes?.managerName}
        />
        <Information
          boxShadow={cardShadow}
          title="Location"
          value={hotel[0]?.attributes?.location}
        />
        <Information
          boxShadow={cardShadow}
          title="Manager Email"
          value={hotel[0]?.attributes?.managerEmail}
        />
        <Information
          boxShadow={cardShadow}
          title="Manager Password"
          value={hotel[0]?.attributes?.managerPassword}
        />
        <Information
          boxShadow={cardShadow}
          title="Social Media"
          value="Google, Facebook"
        />
        <Information
          boxShadow={cardShadow}
          title="Hotel Rent"
          value={hotel[0]?.attributes?.hotelRent}
        />
        <Information
          boxShadow={cardShadow}
          title="Kafalat"
          value={hotel[0]?.attributes?.kafalat}
        />
        <Information boxShadow={cardShadow} title="Total" value="15000SAR" />
      </SimpleGrid>
    </Card>
  );
};

export default HotelDetail;
