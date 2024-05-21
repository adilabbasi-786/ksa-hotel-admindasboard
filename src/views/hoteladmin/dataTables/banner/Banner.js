import React, { useEffect, useState } from "react";
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
  Select,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card.js";
import axios from "axios";
import { URL } from "Utils";
import EmployeeFullDetail from "views/hoteladmin/dataTables/EmployeeFullDetail";

const Banner = ({
  name,
  passportNumber,
  status,
  avatar,
  banner,
  employeeData,
  iqamaNumber,
  passportExpiry,
  iqamaExpiry,
  id,
  salary,
  fetchEmployeeData,
}) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({
    EmployeeName: "",
    PassportNumber: "",
    status: "",
    iqamaNumber: "",
    passportExpiry: "",
    iqamaExpiry: "",
    salary: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setUpdatedEmployeeData({
        EmployeeName: name,
        PassportNumber: passportNumber,
        status: status,
        iqamaNumber: iqamaNumber,
        passportExpiry: passportExpiry,
        iqamaExpiry: iqamaExpiry,
        salary: salary,
      });
    }
  }, [
    isEditMode,
    name,
    passportNumber,
    status,
    iqamaExpiry,
    passportExpiry,
    iqamaNumber,
    salary,
  ]);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = () => {
    fetch(`${URL}/api/employee-data/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data: updatedEmployeeData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setShowSuccessMessage(true); // Show success message on successful save
          setTimeout(() => {
            setShowSuccessMessage(false); // Hide success message after a delay
            setIsOpen(false); // Close the modal
          }, 1000);
          fetchEmployeeData();
        } else {
          console.error("Error saving data:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const handleDeleteEmployee = () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`${URL}/api/employee-data/${id}`)
        .then((response) => {
          if (response.status === 200) {
            // Optionally, show a success message
            alert("Employee deleted successfully");
            fetchEmployeeData();
          } else {
            console.error("Error deleting employee:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (value !== null && value !== undefined) {
      setUpdatedEmployeeData((prevData) => ({ ...prevData, [name]: value }));
    }
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
                <FormLabel>Employee salary:</FormLabel>
                <Input
                  type="number"
                  name="salary"
                  value={updatedEmployeeData.salary}
                  onChange={handleInputChange}
                />
                <FormLabel>Passport Number:</FormLabel>
                <Input
                  type="text"
                  name="PassportNumber"
                  value={updatedEmployeeData.PassportNumber}
                  onChange={handleInputChange}
                />
                <FormLabel>iqama Number:</FormLabel>
                <Input
                  type="text"
                  name="iqamaNumber"
                  value={updatedEmployeeData.iqamaNumber}
                  onChange={handleInputChange}
                />
                <FormLabel>Passport Expiry:</FormLabel>
                <Input
                  type="date"
                  name="passportExpiry"
                  value={updatedEmployeeData.passportExpiry}
                  onChange={handleInputChange}
                />
                <FormLabel>iqama Expiry:</FormLabel>
                <Input
                  type="date"
                  name="iqamaExpiry"
                  value={updatedEmployeeData.iqamaExpiry}
                  onChange={handleInputChange}
                />
                <FormLabel>Employee Status</FormLabel>
                <Select
                  name="status"
                  placeholder="Select status"
                  value={updatedEmployeeData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </Select>
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
            <Button
              colorScheme="blue"
              style={{ marginLeft: "10px" }}
              onClick={handleDeleteEmployee}
            >
              {isEditMode ? " " : "Delete Employee"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Message */}
      {showSuccessMessage && (
        <Alert
          status="success"
          mt="4"
          borderRadius="md"
          fontSize="24px"
          position="fixed"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          zIndex="999"
        >
          <AlertIcon />
          Data updated successfully!
        </Alert>
      )}
    </>
  );
};

export default Banner;
