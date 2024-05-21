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
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const token = localStorage.getItem("token");

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

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "EmployeeName",
      "PassportNumber",
      "passportExpiry",
      "iqamaNumber",
      "iqamaExpiry",
      "status",
      "salary",
    ];

    requiredFields.forEach((field) => {
      if (!updatedEmployeeData[field]) {
        errors[field] = `Please fill ${field}`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(
        `${URL}/api/employee-data/${id}`,
        {
          data: updatedEmployeeData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsOpen(false);
        fetchEmployeeData();
      }, 1000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDeleteEmployee = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${URL}/api/employee-data/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Employee deleted successfully");
        fetchEmployeeData();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
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
                <Text color="red">{formErrors.EmployeeName}</Text>
                <FormLabel>Employee salary:</FormLabel>
                <Input
                  type="number"
                  name="salary"
                  value={updatedEmployeeData.salary}
                  onChange={handleInputChange}
                />
                <Text color="red">{formErrors.salary}</Text>
                <FormLabel>Passport Number:</FormLabel>
                <Input
                  type="text"
                  name="PassportNumber"
                  value={updatedEmployeeData.PassportNumber}
                  onChange={handleInputChange}
                />
                <Text color="red">{formErrors.PassportNumber}</Text>
                <FormLabel>iqama Number:</FormLabel>
                <Input
                  type="text"
                  name="iqamaNumber"
                  value={updatedEmployeeData.iqamaNumber}
                  onChange={handleInputChange}
                />
                <Text color="red">{formErrors.iqamaNumber}</Text>
                <FormLabel>Passport Expiry:</FormLabel>
                <Input
                  type="date"
                  name="passportExpiry"
                  value={updatedEmployeeData.passportExpiry}
                  onChange={handleInputChange}
                />
                <Text color="red">{formErrors.passportExpiry}</Text>
                <FormLabel>iqama Expiry:</FormLabel>
                <Input
                  type="date"
                  name="iqamaExpiry"
                  value={updatedEmployeeData.iqamaExpiry}
                  onChange={handleInputChange}
                />
                <Text color="red">{formErrors.iqamaExpiry}</Text>
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
                <Text color="red">{formErrors.status}</Text>
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
            {!isEditMode && (
              <Button
                colorScheme="red"
                style={{ marginLeft: "10px" }}
                onClick={handleDeleteEmployee}
              >
                Delete Employee
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

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
