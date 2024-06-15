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
import EmployeeFullDetail from "views/admin/dataTables/EmployeeFullDetail";
import axios from "axios";
import { URL } from "Utils";

const Banner = ({
  name,
  passportNumber,
  employeePicture,
  iqamaPicture,
  status,
  avatar,
  banner,
  employeeData,
  iqamaNumber,
  passportExpiry,
  EmployeePhoneNumber,
  Employee_healtCard,
  passportImage,
  Designation,
  iqamaExpiry,
  id,
  salary,
  fetchEmployeeData,
  lastActiveDate,
}) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false); // Error message state
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({
    EmployeeName: "",
    PassportNumber: "",
    status: "",
    iqamaNumber: "",
    passportExpiry: "",
    iqamaExpiry: "",
    EmployeePhoneNumber: "",
    Designation: "",
    salary: "",
    iqamaPicture: null,
    passportImage: null,
    employeePicture: null,
    Employee_healtCard: null,
    iqamaPictureUrl: "",
    passportImageUrl: "",
    Employee_healtCardUrl: "",
    employeePictureUrl: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        EmployeePhoneNumber: EmployeePhoneNumber,
        Designation: Designation,
        iqamaPictureUrl: iqamaPicture,
        passportImageUrl: passportImage,
        Employee_healtCardUrl: Employee_healtCard,
        employeePictureUrl: employeePicture,
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
    EmployeePhoneNumber,
    salary,
    Designation,
  ]);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${URL}/api/employee-data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          setIsOpen(false);
          fetchEmployeeData(); // Refresh the data after deletion
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Validation Function
  const validateFormData = () => {
    const {
      EmployeeName,
      PassportNumber,
      status,
      iqamaNumber,
      passportExpiry,
      iqamaExpiry,
      EmployeePhoneNumber,
      Designation,
      salary,
    } = updatedEmployeeData;

    return (
      EmployeeName &&
      PassportNumber &&
      status &&
      iqamaNumber &&
      passportExpiry &&
      iqamaExpiry &&
      EmployeePhoneNumber &&
      Designation &&
      salary
    );
  };

  const handleSaveChanges = () => {
    if (!validateFormData()) {
      setShowErrorMessage(true); // Show error message if validation fails
      return;
    }

    setShowErrorMessage(false); // Hide error message if validation passes

    if (updatedEmployeeData.status === "active") {
      updatedEmployeeData.lastActiveDate = new Date().toISOString();
    }

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(updatedEmployeeData));
    formDataToSend.append(
      "files.iqamaPicture",
      updatedEmployeeData.iqamaPicture
    );
    formDataToSend.append(
      "files.passportImage",
      updatedEmployeeData.passportImage
    );
    formDataToSend.append(
      "files.Employee_healtCard",
      updatedEmployeeData.Employee_healtCard
    );
    formDataToSend.append(
      "files.employeePicture",
      updatedEmployeeData.employeePicture
    );
    setIsLoading(true);

    axios
      .put(`${URL}/api/employee-data/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            setIsOpen(false);
          }, 1000);
          fetchEmployeeData();
        } else {
          console.error("Error saving data:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
    setIsLoading(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileInputChange = (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setUpdatedEmployeeData((prevData) => ({
          ...prevData,
          [name]: base64String,
          [`${name}Url`]: base64String, // Use the base64 string as the preview URL
        }));
      };

      reader.readAsDataURL(file);
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
    setIsEditMode(false);
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
                <FormLabel>Employee Name:</FormLabel>
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
                <FormLabel>Employee Phone number:</FormLabel>
                <Input
                  type="number"
                  name="EmployeePhoneNumber"
                  value={updatedEmployeeData.EmployeePhoneNumber}
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
                <FormLabel>Employee Designation</FormLabel>
                <Select
                  name="Designation"
                  placeholder="Select Designation"
                  value={updatedEmployeeData.Designation}
                  onChange={handleInputChange}
                >
                  <option value="manager">Manager</option>
                  <option value="driver">Driver</option>
                  <option value="hotel employee">Hotel Employee</option>
                </Select>
                <FormLabel>employee Profile Picture:</FormLabel>
                {updatedEmployeeData.employeePictureUrl && (
                  <img
                    src={updatedEmployeeData.employeePictureUrl}
                    alt="profile Picture"
                    width="100"
                  />
                )}
                <Input
                  type="file"
                  name="employeePicture"
                  onChange={handleFileInputChange}
                />
                <FormLabel>iqama Picture:</FormLabel>
                {updatedEmployeeData.iqamaPictureUrl && (
                  <img
                    src={updatedEmployeeData.iqamaPictureUrl}
                    alt="Iqama Picture"
                    width="100"
                  />
                )}
                <Input
                  type="file"
                  name="iqamaPicture"
                  onChange={handleFileInputChange}
                />
                <FormLabel>Passport Picture:</FormLabel>
                {updatedEmployeeData.passportImageUrl && (
                  <img
                    src={updatedEmployeeData.passportImageUrl}
                    alt="Passport Picture"
                    width="100"
                  />
                )}
                <Input
                  type="file"
                  name="passportImage"
                  onChange={handleFileInputChange}
                />
                <FormLabel>Employee Health Card Picture:</FormLabel>
                {updatedEmployeeData.Employee_healtCardUrl && (
                  <img
                    src={updatedEmployeeData.Employee_healtCardUrl}
                    alt="Health Card Picture"
                    width="100"
                  />
                )}
                <Input
                  type="file"
                  name="Employee_healtCard"
                  onChange={handleFileInputChange}
                />
              </FormControl>
            ) : (
              <EmployeeFullDetail employeeData={employeeData} />
            )}
            {/* Error Message */}
            {showErrorMessage && (
              <Alert status="error" mt="4" borderRadius="md">
                <AlertIcon />
                Please fill out all required fields.
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
              onClick={() => setIsDeleteConfirmOpen(true)}
              ml={3}
            >
              Delete Employee
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
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this employee?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => setIsDeleteConfirmOpen(false)}
              ml={3}
            >
              Cancel
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
