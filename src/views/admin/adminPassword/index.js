import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import axios from "axios";

const Index = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        // Clear token from localStorage
        localStorage.removeItem("token");

        // Redirect to login page or logout
        setTimeout(() => {
          window.location.href = "/"; // Replace "/login" with your login route
        }, 2000); // Wait for 2 seconds to show success message
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
          <InputGroup>
            <Input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Confirm New Password</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
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
        <Button colorScheme="blue" mr={3} type="submit" mt={4}>
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default Index;
