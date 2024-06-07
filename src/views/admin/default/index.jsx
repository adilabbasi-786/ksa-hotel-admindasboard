import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { URL } from "Utils";

const UserReports = () => {
  // State to store hotel names
  const [hotels, setHotels] = useState([]);

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const history = useHistory();
  const token = localStorage.getItem("token");

  // Fetch hotel names from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`${URL}/api/hotel-names?populate=*`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const res = await req.json();
        console.log("ress", res.data);
        setHotels(res.data);
      } catch (error) {
        console.error("Error fetching hotel names:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <h2>ALL Hotels</h2>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mt={4}>
        {hotels.map((hotel) => (
          <Box
            key={hotel.id}
            bg={boxBg}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            background="blue"
            textColor="white"
            cursor="pointer"
            _hover={{ backgroundColor: "#4343f7" }}
            onClick={() => history.push(`/admin/hotel/${hotel.id}`)}
          >
            <Flex align="center" justify="space-between">
              <Box ml={3}>
                <FormLabel fontSize="lg">{hotel.attributes.name}</FormLabel>
              </Box>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UserReports;
