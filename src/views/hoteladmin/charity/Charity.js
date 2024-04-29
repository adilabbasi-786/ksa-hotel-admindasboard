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

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Charity = (props) => {
  const [defaultDate, setDefaultDate] = useState(getCurrentDate());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charityCost, setCharityCost] = useState("");

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCharityChange = (event) => {
    setCharityCost(event.target.value);
  };
  const handleAddPartner = () => {
    // Perform any necessary validations
    // Then, add partner using partnerName and partnerRatio
    handleCloseModal();
  };
  return (
    <>
      <Flex
        alignItems="center"
        mb="10px"
        width={{ base: "100%", lg: "30%" }} // Adjust width based on screen size
      >
        <Text mr={{ base: "5px", lg: "10px" }}>Select date</Text>
        <Input
          type="date" // Change type to "date" for date picker
          id="charitydate"
          name="charitydate"
          value={defaultDate}
          onChange={(e) => setDefaultDate(e.target.value)}
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
            Daily Charity Date wise
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" w="100%">
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize={{ base: "xl", lg: "2xl" }}
              mt="10px"
              mb="4px"
            >
              Daily Charity
              <Information
                boxShadow={cardShadow}
                title={`Charity for Date ${defaultDate}`}
                value="10SAR"
              />
            </Text>
          </SimpleGrid>
        </VStack>
        <Button
          colorScheme="blue"
          width="fit-content"
          onClick={handleOpenModal}
        >
          Add Charity
        </Button>
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Partner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="charity amount"
              value={charityCost}
              onChange={handleCharityChange}
              mb="4"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddPartner}>
              Add
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Charity;
