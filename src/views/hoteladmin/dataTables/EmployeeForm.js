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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    employeePicture2: null,
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

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [fieldName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    // Validate if field is empty
    if (value === "") {
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

    // Check if any picture fields are empty
    if (
      !formData.employeePicture ||
      !formData.iqamaPicture ||
      !formData.passportImage ||
      !formData.Employee_healtCard
    ) {
      newFormErrors["pictures"] = "Please upload all pictures";
      alert("please upload all pictures");
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/api/employee-data`,
        { data: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form submitted successfully!", response.data);

      setFormSubmitted(true);
      fetchEmployeeData();
      setTimeout(() => {
        onClose();
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form data:", error);
      setIsSubmitting(false);
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
          <FormControl width="300px" height="280px" mt={2} mb={-20}>
            <FormLabel>Employee picture</FormLabel>
            <Input
              name="employeePicture"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "employeePicture")}
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
              <FormLabel>Passport Number</FormLabel>
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
              <FormLabel>Iqama Number</FormLabel>
              <Input
                name="iqamaNumber"
                value={formData.iqamaNumber}
                onChange={(e) => handleChange(e, "iqamaNumber")}
                placeholder="Iqama Number"
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
              <FormLabel>Iqama Expiry</FormLabel>
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
              <Text color="red">{formErrors.status}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Last Active Date</FormLabel>
              <Input
                type="date"
                name="lastActiveDate"
                placeholder="Active Date"
                value={formData.lastActiveDate}
                onChange={(e) => handleChange(e, "lastActiveDate")}
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
                onChange={(e) => handleFileChange(e, "iqamaPicture")}
              />
              <Text color="red">{formErrors.iqamaPicture}</Text>
            </FormControl>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>HealtCard picture</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "Employee_healtCard")}
              />
              <Text color="red">{formErrors.Employee_healtCard}</Text>
            </FormControl>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Passport picture</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "passportImage")}
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
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </Box>
  );
};

export default EmployeeForm;
