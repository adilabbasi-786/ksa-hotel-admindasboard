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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "Utils";

export default function UserReports() {
  const [hotelName, setHotelName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchHotelName() {
      try {
        const response = await axios.get(`${URL}/api/users/me?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response data", response.data); // Log the response data to check the structure
        setHotelName(response.data.hotel_name?.name || ""); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching hotel name:", error);
      }
    }

    fetchHotelName();
  }, [token]);

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
        Welcome To
      </Text>
      <Text
        fontSize="50px" // Adjust the font size as needed
        color="blue"
        style={{
          display: "inline-block",
          marginLeft: "20px", // Space between Welcome and Hotel Name
          animation: "dropDashboard 1s ease-out forwards",
          animationDelay: "1s",
          opacity: 0,
        }}
      >
        {hotelName}
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
