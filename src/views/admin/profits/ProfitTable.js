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

const ProfitTable = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerRatio, setPartnerRatio] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePartnerNameChange = (event) => {
    setPartnerName(event.target.value);
  };

  const handlePartnerRatioChange = (event) => {
    setPartnerRatio(event.target.value);
  };

  const handleAddPartner = () => {
    // Perform any necessary validations
    // Then, add partner using partnerName and partnerRatio
    handleCloseModal();
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <>
      <Card mb={{ base: "20px", lg: "50px" }}>
        <VStack spacing={4}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize={{ base: "xl", lg: "2xl" }}
            mt="10px"
            mb="4px"
          >
            Partner Profit Ratios
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" w="100%">
            <Information boxShadow={cardShadow} title="Adil" value="50%" />
            <Information boxShadow={cardShadow} title="Nouman" value="20%" />
            <Information boxShadow={cardShadow} title="faheem" value="30%" />
          </SimpleGrid>
        </VStack>
        <Flex
          justifyContent={{ base: "center", md: "space-between" }}
          mt="10px"
        >
          <Button
            colorScheme="blue"
            width="fit-content"
            onClick={handleOpenModal}
          >
            Add Partner
          </Button>
          <Button colorScheme="blue" width="fit-content">
            Delete Partner
          </Button>
        </Flex>
      </Card>
      <Card mb={{ base: "0px", lg: "20px" }}>
        <Flex alignItems="center" mb={{ base: "10px", lg: "0px" }}>
          <Text mr={{ base: "3px", lg: "5px" }}>Select month</Text>
          <Input type="month" id="profitmonth" name="profitmonth" />
        </Flex>
        <VStack spacing={4}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize={{ base: "xl", lg: "2xl" }}
            mt="10px"
            mb="4px"
          >
            Total Profit: 5041542
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" w="100%">
            <Information
              boxShadow={cardShadow}
              title="Partner 1"
              value="502000"
            />
            <Information
              boxShadow={cardShadow}
              title="Partner-2"
              value="20103"
            />
            <Information
              boxShadow={cardShadow}
              title="Partner-3"
              value="305422"
            />
          </SimpleGrid>
        </VStack>
      </Card>
      {/* Modal for adding a new partner */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Partner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Partner Name"
              value={partnerName}
              onChange={handlePartnerNameChange}
              mb="4"
            />
            <Input
              placeholder="Partner Ratio"
              value={partnerRatio}
              onChange={handlePartnerRatioChange}
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

export default ProfitTable;
