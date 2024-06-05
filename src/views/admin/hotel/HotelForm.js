import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { URL } from "Utils";
import axios from "axios";

const HotelForm = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");

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
  const adminIdentifier = localStorage.getItem("adminIdentifier");
  const adminPassword = localStorage.getItem("adminPassword");
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
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
          identifier: "m.adilabbasi786@gmai.com",
          password: "adil@123",
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
      }
      const responseData = await response.json();
      const userId = responseData.user.id;
      return userId;
    } catch (error) {
      console.error("Error registering manager:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const managerId = await registerManager();

    if (managerId) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append(
          "data",
          JSON.stringify({
            name: formData.name,
            location: formData.location,
            manager: managerId,
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
        <FormLabel>Manager Phone Number</FormLabel>
        <Input
          placeholder="manager phone number"
          name="managerPhoneNumber"
          value={formData.managerPhoneNumber}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Kafeel Name</FormLabel>
        <Input
          placeholder="Kafeel Name"
          name="kafeelName"
          value={formData.kafeelName}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Kafeel Phone Number</FormLabel>
        <Input
          placeholder="Kafeel Phone Number"
          name="KafeelPhoneNumber"
          value={formData.KafeelPhoneNumber}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Tax Vat Number</FormLabel>
        <Input
          placeholder="Tax Vat Number"
          name="TaxVatNumber"
          value={formData.TaxVatNumber}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Licence Picture</FormLabel>
        <Input
          type="file"
          name="liscencePicture"
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Tax Vat Picture</FormLabel>
        <Input type="file" name="TaxVatPicture" onChange={handleInputChange} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Comercial Certificate</FormLabel>
        <Input
          type="file"
          name="ComercialCertificate"
          onChange={handleInputChange}
        />
      </FormControl>
      <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default HotelForm;
