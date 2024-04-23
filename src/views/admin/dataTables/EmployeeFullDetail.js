import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";

import React from "react";
import Information from "../expanses/components/Information";

const EmployeeFullDetail = () => {
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
        Muhammad Adil
      </Text>

      <SimpleGrid columns="2" gap="20px">
        <Information boxShadow={cardShadow} title=" Name" value="Riyadh" />
        <Information
          boxShadow={cardShadow}
          title="Pasport Number"
          value="nos5554"
        />
        <Information
          boxShadow={cardShadow}
          title="Pasport expiry date"
          value="24/april/2025"
        />
        <Information
          boxShadow={cardShadow}
          title="iqama Number"
          value="no1d554"
        />
        <Information
          boxShadow={cardShadow}
          title="iqama Expiry"
          value="24/dec/2025"
        />
        <Information
          boxShadow={cardShadow}
          title="Iqama Picture"
          value="nos5554"
        />
        <Information
          boxShadow={cardShadow}
          title="Location"
          value="Riyadh KSA"
        />
      </SimpleGrid>
    </Card>
  );
};

export default EmployeeFullDetail;
