import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const Index = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const jwt = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:1337/api/updateAdmin",
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.data.status === "ok") {
        setSuccess("Password updated successfully");
        setError("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("An error occurred while updating the password.");
    }
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} background="white">
      <form onSubmit={handlePasswordChange}>
        <FormControl>
          <FormLabel>Old Password</FormLabel>
          <Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormControl>
        {error && (
          <Text color="red.500" mt={2}>
            {error}
          </Text>
        )}
        {success && (
          <Text color="green.500" mt={2}>
            {success}
          </Text>
        )}
        <Button colorScheme="blue" mr={3} type="submit">
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default Index;
