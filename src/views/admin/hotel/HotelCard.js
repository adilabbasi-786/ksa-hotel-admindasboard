// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import hotelImage from "../../../assets/img/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg";
// Assets
import { MdEdit } from "react-icons/md";
import { useHistory } from "react-router-dom";

export default function HotelCard(props) {
  const handleEditHotel = () => {
    history.push(`/admin/hotel/edit/${id}`);
  };
  const history = useHistory();

  const { title, ranking, link, id, image, ...rest } = props;
  const hotelImageSrc = image || hotelImage;

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");
  return (
    <Card bg={bg} {...rest} p="14px">
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Image
          h="80px"
          w="80px"
          src={hotelImage}
          borderRadius="8px"
          me="20px"
        />
        <Box mt={{ base: "10px", md: "0" }}>
          <Text
            color={textColorPrimary}
            fontWeight="500"
            fontSize="md"
            mb="4px"
          >
            {title}
          </Text>
          <Text
            fontWeight="500"
            color={textColorSecondary}
            fontSize="sm"
            me="4px"
          >
            Hotel Id #{ranking} •{" "}
            <span
              fontWeight="500"
              color={brandColor}
              fontSize="sm"
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/admin/hotel/${ranking}`)}
            >
              See Hotel details
            </span>
          </Text>
        </Box>
        <Link
          onClick={handleEditHotel}
          _hover={{
            bg: "gray.200",
            color: "white",
          }}
          me="16px"
          ms="auto"
          p="0px !important"
        >
          <Icon as={MdEdit} color="secondaryGray.500" h="18px" w="18px" />
        </Link>
      </Flex>
    </Card>
  );
}
