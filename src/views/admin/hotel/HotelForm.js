import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { URL } from "Utils";
import axios from "axios";

const HotelForm = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    managerName: "",
    managerEmail: "",
    managerPassword: "",
    managerPhoneNumber: "",
    kafeelName: "",
    KafeelPhoneNumber: "",
    liscencePicture: null,
    TaxVatNumber: "",
    TaxVatPicture: null,
    ComercialCertificate: null,
  });
  const [roleId] = useState("manager");
  const [validationMessages, setValidationMessages] = useState({});
  const adminIdentifier = localStorage.getItem("identifier");
  const adminPassword = localStorage.getItem("password");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      [name]: files ? files[0] : value,
    }));
  };

  const registerManager = async () => {
    try {
      const tokenResponse = await fetch(`${URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: adminIdentifier,
          password: adminPassword,
        }),
      });
      const token = await tokenResponse.json();

      const response = await fetch(`${URL}/api/auth/local/register`, {
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
      });
      if (!response.ok) {
        throw new Error("Failed to register manager");
        setIsLoading(false);
      }
      const responseData = await response.json();
      const userId = responseData.user.id;
      return userId;
    } catch (error) {
      console.error("Error registering manager:", error);
      return false;
    }
  };

  const validateForm = () => {
    const messages = {};
    const requiredFields = [
      "name",
      "location",
      "managerName",
      "managerEmail",
      "managerPassword",
      "managerPhoneNumber",
      "kafeelName",
      "KafeelPhoneNumber",
      "TaxVatNumber",
      "liscencePicture",
      "TaxVatPicture",
      "ComercialCertificate",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        if (
          field === "liscencePicture" ||
          field === "TaxVatPicture" ||
          field === "ComercialCertificate"
        ) {
          messages[field] = "Please upload this picture.";
        } else {
          messages[field] = "This field is required.";
        }
      }
    });
    if (formData.managerPassword.length < 6) {
      messages.managerPassword = "Password must be at least 6 digits.";
    }
    setValidationMessages(messages);
    return Object.keys(messages).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // If form is not valid, stop the submission
      return;
    }
    const managerId = await registerManager();
    setIsLoading(true);
    if (managerId) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append(
          "data",
          JSON.stringify({
            name: formData.name,
            location: formData.location,
            manager: managerId,
            managerName: formData.managerName,
            managerEmail: formData.managerEmail,
            managerPassword: formData.managerPassword,
            managerPhoneNumber: formData.managerPhoneNumber,
            kafeelName: formData.kafeelName,
            KafeelPhoneNumber: formData.KafeelPhoneNumber,
            TaxVatNumber: formData.TaxVatNumber,
          })
        );
        formDataToSend.append(
          "files.liscencePicture",
          formData.liscencePicture
        );
        formDataToSend.append("files.TaxVatPicture", formData.TaxVatPicture);
        formDataToSend.append(
          "files.ComercialCertificate",
          formData.ComercialCertificate
        );

        const response = await axios.post(
          `${URL}/api/hotel-names`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          name: "",
          location: "",
          managerName: "",
          managerEmail: "",
          managerPassword: "",
          kafeelName: "",
          KafeelPhoneNumber: "",
          liscencePicture: null,
          managerPhoneNumber: "",
          TaxVatNumber: "",
          TaxVatPicture: null,
          ComercialCertificate: null,
        });
        alert("Form submitted successfully!");
        history.push("/admin/hotel");
        setIsLoading(false);
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
        {validationMessages.name && (
          <Text color="red.500">{validationMessages.name}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Location</FormLabel>
        <Input
          placeholder="Full address"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
        {validationMessages.location && (
          <Text color="red.500">{validationMessages.location}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Manager Name</FormLabel>
        <Input
          placeholder="Manager Name"
          name="managerName"
          value={formData.managerName}
          onChange={handleInputChange}
        />
        {validationMessages.managerName && (
          <Text color="red.500">{validationMessages.managerName}</Text>
        )}
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
        {validationMessages.managerEmail && (
          <Text color="red.500">{validationMessages.managerEmail}</Text>
        )}
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
        {validationMessages.managerPassword && (
          <Text color="red.500">{validationMessages.managerPassword}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Manager Phone Number</FormLabel>
        <Input
          type="number"
          placeholder="manager phone number"
          name="managerPhoneNumber"
          value={formData.managerPhoneNumber}
          onChange={handleInputChange}
        />
        {validationMessages.managerPhoneNumber && (
          <Text color="red.500">{validationMessages.managerPhoneNumber}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Kafeel Name</FormLabel>
        <Input
          placeholder="Kafeel Name"
          name="kafeelName"
          value={formData.kafeelName}
          onChange={handleInputChange}
        />
        {validationMessages.kafeelName && (
          <Text color="red.500">{validationMessages.kafeelName}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Kafeel Phone Number</FormLabel>
        <Input
          type="number"
          placeholder="Kafeel Phone Number"
          name="KafeelPhoneNumber"
          value={formData.KafeelPhoneNumber}
          onChange={handleInputChange}
        />
        {validationMessages.KafeelPhoneNumber && (
          <Text color="red.500">{validationMessages.KafeelPhoneNumber}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Tax Vat Number</FormLabel>
        <Input
          placeholder="Tax Vat Number"
          name="TaxVatNumber"
          value={formData.TaxVatNumber}
          onChange={handleInputChange}
        />
        {validationMessages.TaxVatNumber && (
          <Text color="red.500">{validationMessages.TaxVatNumber}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Licence Picture</FormLabel>
        <Input
          type="file"
          accept="image/*"
          name="liscencePicture"
          onChange={handleInputChange}
        />
        {validationMessages.liscencePicture && (
          <Text color="red.500">{validationMessages.liscencePicture}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Tax Vat Picture</FormLabel>
        <Input
          type="file"
          name="TaxVatPicture"
          accept="image/*"
          onChange={handleInputChange}
        />
        {validationMessages.TaxVatPicture && (
          <Text color="red.500">{validationMessages.TaxVatPicture}</Text>
        )}
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Comercial Certificate</FormLabel>
        <Input
          type="file"
          name="ComercialCertificate"
          accept="image/*"
          onChange={handleInputChange}
        />
        {validationMessages.ComercialCertificate && (
          <Text color="red.500">{validationMessages.ComercialCertificate}</Text>
        )}
      </FormControl>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default HotelForm;
