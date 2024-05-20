import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card.js";
import avatar1 from "assets/img/avatars/avatar6.png";
import EmployeeFullDetail from "views/admin/dataTables/EmployeeFullDetail";

const Banner = ({ name, passportNumber, status, avatar, banner }) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );

  const handleViewDetails = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Card
        mb={{ base: "20px", lg: "20px" }} // Adjusted margin for mobile
        align="center"
        height="auto" // Set height to auto for responsiveness
        width={{ base: "100%", lg: "350px" }} // Adjusted width for mobile
      >
        <Box
          bg={`url(${banner})`}
          bgSize="cover"
          borderRadius="16px"
          h="200px" // Adjusted height for mobile
          w="100%"
        />
        <Avatar
          mx="auto"
          src={avatar}
          h="87px"
          w="87px"
          mt="-43px"
          border="4px solid"
          borderColor={borderColor}
        />
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="xl"
          mt="10px"
        >
          {name}
        </Text>
        <Text color={textColorSecondary} fontSize="sm">
          {status}
        </Text>
        <Flex w="max-content" mx="auto" mt="26px">
          <Flex mx="auto" me="60px" align="center" direction="column">
            <Text color={textColorPrimary} fontSize="sm" marginBottom="10px">
              <span style={{ fontWeight: "700" }}>Passport Number:</span>{" "}
              {passportNumber}
            </Text>
            <Button
              mb="50px"
              mt={{ base: "50px", "2xl": "auto" }}
              variant="brand"
              onClick={handleViewDetails}
            >
              View More Details
            </Button>
          </Flex>
        </Flex>
      </Card>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EmployeeFullDetail />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClose}>
              Close
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              colorScheme="blue"
              onClick={handleClose}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Banner;
