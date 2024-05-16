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
  const [roleId, setRoleId] = useState("manager");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const registerManager = async () => {
    try {
      const tokenResponse = await fetch(
        "http://localhost:1337/api/auth/local",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: "adil@adil.com",
            password: "adil@123",
          }),
        }
      );
      const token = await tokenResponse.json();

      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.jwt}`,
          },
          body: JSON.stringify({
            username: formData.managerName,
            email: formData.managerEmail,
            password: formData.managerPassword,
            role: roleId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to register manager");
      }
      const responseData = await response.json();
      console.log("resss", responseData.user.id);
      const userId = responseData.user.id;
      return userId;
    } catch (error) {
      console.error("Error registering manager:", error);
      return false;
    }
  };

  const handleSubmit = async (userId) => {
    const registrationSuccess = await registerManager();
    console.log("regiseta", registrationSuccess);

    if (registrationSuccess) {
      try {
        const response = await fetch("http://localhost:1337/api/hotel-names", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: formData,
            userId: registrationSuccess,
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
    } else {
      alert("Failed to register manager. Please try again later.");
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
