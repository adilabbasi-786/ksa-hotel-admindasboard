import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Text
        marginTop="15%"
        fontSize="50px" // Adjust the font size as needed
        color="blue"
        style={{
          display: "inline-block",
          animation: "dropWelcome 1s ease-out forwards",
        }}
      >
        Welcome
      </Text>
      <Text
        fontSize="50px" // Adjust the font size as needed
        color="blue"
        style={{
          display: "inline-block",
          marginLeft: "20px", // Space between Welcome and Hotel Dashboard
          animation: "dropDashboard 1s ease-out forwards",
          animationDelay: "1s",
          opacity: 0,
        }}
      >
        Hotel Dashboard
      </Text>
      <style>
        {`
        @keyframes dropWelcome {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes dropDashboard {
          0% {
            transform: translateY(-100px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}
      </style>
    </Box>
  );
}
