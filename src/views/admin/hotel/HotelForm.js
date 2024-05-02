import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Stack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
const HotelForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    managerName: "",
    managerEmail: "",
    managerPassword: "",
    kafalat: "",
    hotelRent: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/hotel-names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }
      setFormData({
        name: "",
        location: "",
        managerName: "",
        managerEmail: "",
        managerPassword: "",
        kafalat: "",
        hotelRent: "",
      });
      alert("Form submitted successfully!");
      history.push("/admin/hotel");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form data. Please try again later.");
    }
  };

  return (
    <Box p={4} bg="white">
      <FormControl>
        <FormLabel>Hotel name</FormLabel>
        <Input
          placeholder="Hotel name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Location</FormLabel>
        <Input
          placeholder="Full address"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Manager Name</FormLabel>
        <Input
          placeholder="Manager Name"
          name="managerName"
          value={formData.managerName}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Manager Email</FormLabel>
        <Input
          type="email"
          placeholder="Manager Email"
          name="managerEmail"
          value={formData.managerEmail}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Manager Password</FormLabel>
        <Input
          type="password"
          placeholder="Manager Password"
          name="managerPassword"
          value={formData.managerPassword}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Kafalat</FormLabel>
        <Input
          type="number"
          placeholder="Kafalat"
          name="kafalat"
          value={formData.kafalat}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Hotel Rent</FormLabel>
        <Input
          type="number"
          placeholder="Hotel Rent"
          name="hotelRent"
          value={formData.hotelRent}
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="fit-content"
        mt="10px"
        alignSelf="flex-end"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default HotelForm;
