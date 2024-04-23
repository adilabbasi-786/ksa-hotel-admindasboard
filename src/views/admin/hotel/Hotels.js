// Chakra imports
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Assets
import Project1 from "assets/img/profile/Project1.png";
import Project2 from "assets/img/profile/Project2.png";
import Project3 from "assets/img/profile/Project3.png";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import { useHistory } from "react-router-dom";
import HotelCard from "./HotelCard";

const allHotel = [
  {
    id: 1,
    name: "hotel1",
    img: Project1,
  },
  {
    id: 2,
    name: "hotel2",
    img: Project2,
  },
  {
    id: 3,
    name: "hotel3",
    img: Project3,
  },
  {
    id: 4,
    name: "hotel4",
    img: Project3,
  },
  {
    id: 5,
    name: "hotel5",
    img: Project1,
  },
];
export default function Hotels(props) {
  const history = useHistory();

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <>
      <Flex w="100%">
        <Button
          me="100%"
          mb="50px"
          w="140px"
          minW="140px"
          mt={{ base: "20px", "2xl": "auto" }}
          variant="brand"
          fontWeight="500"
          onClick={() => {
            history.push("/admin/hotel/add");
          }}
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
        {allHotel.map((hotel) => {
          return (
            <HotelCard
              boxShadow={cardShadow}
              mb="20px"
              image={hotel.img}
              ranking={hotel.id}
              link={`hotel/${hotel.id}`}
              title={hotel.name}
            />
          );
        })}
      </Card>
    </>
  );
}
