import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Text,
  useColorModeValue,
  Flex,
  VStack,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Information from "views/admin/expanses/components/Information";

const getCurrentMonth = () => {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since January is 0
  const year = currentDate.getFullYear();
  return `${year}-${month}`;
};

const RentKafalat = (props) => {
  const [defaultMonth, setDefaultMonth] = useState(getCurrentMonth());

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <>
      <Flex
        alignItems="center"
        mb="10px"
        width={{ base: "100%", lg: "30%" }} // Adjust width based on screen size
      >
        <Text mr={{ base: "5px", lg: "10px" }}>Select month</Text>
        <Input
          type="month"
          id="profitmonth"
          name="profitmonth"
          value={defaultMonth}
          onChange={(e) => setDefaultMonth(e.target.value)}
          fontSize="md" // Adjust the font size for mobile
          width="100%" // Adjust the width for mobile
        />
      </Flex>
      <Card mb={{ base: "20px", lg: "50px" }} width="80%">
        <VStack spacing={4}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize={{ base: "xl", lg: "2xl" }}
            mt="10px"
            mb="4px"
          >
            Hotel Rent And Kafalat
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" w="100%">
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize={{ base: "xl", lg: "2xl" }}
              mt="10px"
              mb="4px"
            >
              Hotel Rent
              <Information
                boxShadow={cardShadow}
                title={`Hotel Rent for Month of ${defaultMonth}`}
                value="1000SAR"
              />
            </Text>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" w="100%">
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize={{ base: "xl", lg: "2xl" }}
              mt="10px"
              mb="4px"
            >
              Kafalat
              <Information
                boxShadow={cardShadow}
                title={`Kafalat for Month of ${defaultMonth}`}
                value="1000SAR"
              />
            </Text>
          </SimpleGrid>
        </VStack>
      </Card>
    </>
  );
};

export default RentKafalat;
