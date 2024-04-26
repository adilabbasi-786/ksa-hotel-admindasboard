import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/expanses/components/Information";

const HotelDetail = () => {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
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
        <Information boxShadow={cardShadow} title="Hotel Name" value="Riyadh" />
        <Information boxShadow={cardShadow} title="Manager" value="nouman" />
        <Information
          boxShadow={cardShadow}
          title="Location"
          value="Riyadh KSA"
        />
        <Information
          boxShadow={cardShadow}
          title="Social Media"
          value="Google, Facebook"
        />
        <Information
          boxShadow={cardShadow}
          title="Hotel Rent"
          value="1000SAR"
        />
        <Information boxShadow={cardShadow} title="Kafalat" value="5000SAR" />
        <Information boxShadow={cardShadow} title="Total" value="15000SAR" />
      </SimpleGrid>
    </Card>
  );
};

export default HotelDetail;
