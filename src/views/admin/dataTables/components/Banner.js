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
  Input,
  FormLabel,
  FormControl,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card.js";
import avatar1 from "assets/img/avatars/avatar6.png";
import EmployeeFullDetail from "views/admin/dataTables/EmployeeFullDetail";

const Banner = ({
  name,
  passportNumber,
  status,
  avatar,
  banner,
  employeeData,
  id,
}) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState(employeeData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setShowSuccessMessage(false); // Hide success message when entering edit mode
  };

  const handleSaveChanges = () => {
    // Step 4: Implement save functionality here
    // Example: Call API to save changes
    fetch(`http://localhost:1337/api/employee-data/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data: updatedEmployeeData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // If the response is successful, show success message
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false); // Hide the success message after a delay
          }, 3000); // Hide after 3 seconds
        } else {
          console.error("Error saving data:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        // Handle error scenario
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

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
        mb={{ base: "0px", lg: "20px" }}
        align="center"
        height="400px"
        width="350px"
      >
        <Box
          bg={`url(${banner})`}
          bgSize="cover"
          borderRadius="16px"
          h="131px"
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
            <Text color={textColorPrimary} fontSize="sm" fontWeight="700">
              Passport Number: {passportNumber}
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
            {isEditMode ? (
              <FormControl>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  name="EmployeeName"
                  value={updatedEmployeeData.EmployeeName}
                  onChange={handleInputChange}
                />
                <FormLabel>Passport Number:</FormLabel>
                <Input
                  type="text"
                  name="PassportNumber"
                  value={updatedEmployeeData.PassportNumber}
                  onChange={handleInputChange}
                />
                <FormLabel>Status:</FormLabel>
                <Input
                  type="text"
                  name="status"
                  value={updatedEmployeeData.status}
                  onChange={handleInputChange}
                />
              </FormControl>
            ) : (
              <EmployeeFullDetail employeeData={employeeData} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClose}>
              Close
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              colorScheme="blue"
              onClick={isEditMode ? handleSaveChanges : handleToggleEditMode}
            >
              {isEditMode ? "Save" : "Edit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Message */}
      {showSuccessMessage && (
        <Alert status="success" mt="4" borderRadius="md">
          <AlertIcon />
          Data saved successfully!
        </Alert>
      )}
    </>
  );
};

export default Banner;
