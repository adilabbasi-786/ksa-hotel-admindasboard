import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  Select,
  Text,
} from "@chakra-ui/react";
import EmployeeContext from "EmployeeContext";
import { URL } from "Utils";

const EmployeeForm = ({ onClose, selectedHotel, fetchEmployeeData }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    employeePicture: null,
    EmployeeName: "",
    PassportNumber: "",
    passportExpiry: "",
    iqamaNumber: "",
    iqamaExpiry: "",
    status: "",
    salary: "",
    lastActiveDate: "",
    iqamaPicture: null,
    passportImage: null,
    Employee_healtCard: null,
    hotel_name: selectedHotel,
    EmployeePhoneNumber: "",
    Designation: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({
    EmployeeName: "",
    PassportNumber: "",
    passportExpiry: "",
    iqamaNumber: "",
    iqamaExpiry: "",
    status: "",
    employeePicture: "",
    iqamaPicture: "",
    passportImage: "",
    salary: "",
    EmployeePhoneNumber: "",
    Employee_healtCard: "",
    Designation: "",
  });

  const handleChange = (e, fieldName) => {
    const { files, value } = e.target;
    const newValue = files ? files[0] : value;

    // Update formData
    setFormData((prevData) => {
      let updatedData = { ...prevData, [fieldName]: newValue };

      // If status is set to "active", update lastActiveDate to the current date
      if (fieldName === "status") {
        if (newValue === "active") {
          updatedData.lastActiveDate = new Date().toISOString().split("T")[0];
        } else if (newValue === "inactive") {
          updatedData.lastActiveDate = "";
        }
      }

      return updatedData;
    });

    // Validate if field is empty
    if (newValue === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Please fill ${fieldName}`,
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "", // Clear error message if field is not empty
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    const requiredFields = [
      "EmployeeName",
      "PassportNumber",
      "passportExpiry",
      "iqamaNumber",
      "iqamaExpiry",
      "status",
      "salary",
      "EmployeePhoneNumber",
      "Designation",
    ];
    let hasErrors = false;
    const newFormErrors = {};

    requiredFields.forEach((fieldName) => {
      if (formData[fieldName] === "") {
        newFormErrors[fieldName] = `Please fill ${fieldName}`;
        hasErrors = true;
      }
    });

    // Check if employee picture, iqama picture, and passport picture are not empty
    if (!formData.employeePicture) {
      newFormErrors.employeePicture = "Please upload Employee picture";
      hasErrors = true;
    }
    if (!formData.iqamaPicture) {
      newFormErrors.iqamaPicture = "Please upload iqama picture";
      hasErrors = true;
    }
    if (!formData.passportImage) {
      newFormErrors.passportImage = "Please upload Passport picture";
      hasErrors = true;
    }
    if (!formData.Employee_healtCard) {
      newFormErrors.Employee_healtCard =
        "Please upload Employee_healtCard picture";
      hasErrors = true;
    }

    // If there are errors, update state and stop form submission
    if (hasErrors) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...newFormErrors,
      }));
      return; // Stop further execution
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(formData));
      formDataToSend.append("files.employeePicture", formData.employeePicture);
      formDataToSend.append("files.iqamaPicture", formData.iqamaPicture);
      formDataToSend.append("files.passportImage", formData.passportImage);
      formDataToSend.append(
        "files.Employee_healtCard",
        formData.Employee_healtCard
      );
      const response = await axios.post(
        `${URL}/api/employee-data`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully!", response.data);
      setFormSubmitted(true);
      fetchEmployeeData();
      setTimeout(() => {
        onClose(); // Close the modal after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <Box p={10} bg="white">
      {formSubmitted ? (
        <Box>
          <p>Form submitted successfully!</p>
        </Box>
      ) : (
        <form>
          <FormControl width="300px" height="280px" mt={4} mb={-20}>
            <FormLabel>Employee picture</FormLabel>
            <Input
              name="employeePicture"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, "employeePicture")}
            />
            <Text color="red">{formErrors.employeePicture}</Text>
          </FormControl>

          <Flex direction={isMobile ? "column" : "row"}>
            <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Employee name</FormLabel>
              <Input
                name="EmployeeName"
                value={formData.EmployeeName}
                onChange={(e) => handleChange(e, "EmployeeName")}
                placeholder="Employee name"
              />
              <Text color="red">{formErrors.EmployeeName}</Text>
            </FormControl>
            <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Employee Salary</FormLabel>
              <Input
                type="number"
                name="EmployeeSalary"
                value={formData.salary}
                onChange={(e) => handleChange(e, "salary")}
                placeholder="Employee salary"
              />
              <Text color="red">{formErrors.salary}</Text>
            </FormControl>
            <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Employee Phone Number</FormLabel>
              <Input
                type="number"
                name="EmployeePhoneNumber"
                value={formData.EmployeePhoneNumber}
                onChange={(e) => handleChange(e, "EmployeePhoneNumber")}
                placeholder="Employee Phone Number"
              />
              <Text color="red">{formErrors.EmployeePhoneNumber}</Text>
            </FormControl>

            <FormControl flex="1">
              <FormLabel>passport Number</FormLabel>
              <Input
                name="PassportNumber"
                value={formData.PassportNumber}
                onChange={(e) => handleChange(e, "PassportNumber")}
                placeholder="Passport Number"
              />
              <Text color="red">{formErrors.PassportNumber}</Text>
            </FormControl>
          </Flex>

          <Flex direction={isMobile ? "column" : "row"}>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Passport Expiry</FormLabel>
              <Input
                type="date"
                name="passportExpiry"
                placeholder="Passport Expiry"
                value={formData.passportExpiry}
                onChange={(e) => handleChange(e, "passportExpiry")}
              />
              <Text color="red">{formErrors.passportExpiry}</Text>
            </FormControl>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>iqama number</FormLabel>
              <Input
                name="iqamaNumber"
                value={formData.iqamaNumber}
                onChange={(e) => handleChange(e, "iqamaNumber")}
                placeholder="iqama Number"
              />
              <Text color="red">{formErrors.iqamaNumber}</Text>
            </FormControl>
          </Flex>
          <Flex direction={isMobile ? "column" : "row"}>
            <FormControl mr={!isMobile && 12} mb={isMobile ? 2 : 0}>
              <FormLabel>Designation</FormLabel>
              <Select
                name="Designation"
                placeholder="Select designation"
                value={formData.Designation}
                onChange={(e) => handleChange(e, "Designation")}
              >
                <option value="manager">Manager</option>
                <option value="driver">Driver</option>
                <option value="hotel employee">Hotel Employee</option>
              </Select>
              <Text color="red">{formErrors.Designation}</Text>
            </FormControl>
          </Flex>
          <Flex direction={isMobile ? "column" : "row"}>
            <FormControl>
              <FormLabel>iqama Expiry</FormLabel>
              <Input
                type="date"
                name="iqamaExpiry"
                placeholder="Iqama Expiry"
                value={formData.iqamaExpiry}
                onChange={(e) => handleChange(e, "iqamaExpiry")}
              />
              <Text color="red">{formErrors.iqamaExpiry}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Employee Status</FormLabel>
              <Select
                name="status"
                placeholder="Select status"
                value={formData.status}
                onChange={(e) => handleChange(e, "status")}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </Select>
              <Text color="red">{formErrors.status}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>lastActiveDate</FormLabel>
              <Input
                type="date"
                name="lastActiveDate"
                placeholder="Active Date"
                value={formData.lastActiveDate}
                onChange={(e) => handleChange(e, "lastActiveDate")}
                readOnly // make this field read-only
              />
              <Text color="red">{formErrors.lastActiveDate}</Text>
            </FormControl>
          </Flex>
          <Flex direction={isMobile ? "column" : "row"}>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>iqama picture</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange(e, "iqamaPicture")}
              />
              <Text color="red">{formErrors.iqamaPicture}</Text>
            </FormControl>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>HealtCard picture</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange(e, "Employee_healtCard")}
              />
              <Text color="red">{formErrors.Employee_healtCard}</Text>
            </FormControl>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Passport picture</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange(e, "passportImage")}
              />
              <Text color="red">{formErrors.passportImage}</Text>
            </FormControl>
          </Flex>

          <Button colorScheme="blue" onClick={onClose} mt={4}>
            Close
          </Button>
          <Button
            variant="brand"
            fontWeight="500"
            ml={4}
            mt={4}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          {console.log("submit", handleSubmit)}
        </form>
      )}
    </Box>
  );
};

export default EmployeeForm;
