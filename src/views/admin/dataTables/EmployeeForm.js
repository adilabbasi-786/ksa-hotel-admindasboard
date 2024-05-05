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
} from "@chakra-ui/react";
import EmployeeContext from "EmployeeContext";

const EmployeeForm = ({ onClose }) => {
  const { selectedHotel } = useContext(EmployeeContext);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [formData, setFormData] = useState({
    employeePicture: null,
    EmployeeName: "",
    PassportNumber: "",
    passportExpiry: "",
    iqamaNumber: "",
    iqamaExpiry: "",
    iqamaPicture: null,
    passportImage: null,
    hotel_name: selectedHotel,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e, fieldName) => {
    const { files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: files ? files[0] : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(formData));
      formDataToSend.append("files.employeePicture", formData.employeePicture);
      formDataToSend.append("files.iqamaPicture", formData.iqamaPicture);
      formDataToSend.append("files.passportImage", formData.passportImage);
      const response = await axios.post(
        "http://localhost:1337/api/employee-data",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form submitted successfully!", response.data);
      setFormSubmitted(true);
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
            </FormControl>

            <FormControl flex="1">
              <FormLabel>passport Number</FormLabel>
              <Input
                name="PassportNumber"
                value={formData.PassportNumber}
                onChange={(e) => handleChange(e, "PassportNumber")}
                placeholder="Passport Number"
              />
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
            </FormControl>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>iqama number</FormLabel>
              <Input
                name="iqamaNumber"
                value={formData.iqamaNumber}
                onChange={(e) => handleChange(e, "iqamaNumber")}
                placeholder="iqama Number"
              />
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
            </FormControl>
            <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Passport picture</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleChange(e, "passportImage")}
              />
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
        </form>
      )}
    </Box>
  );
};

export default EmployeeForm;
