import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import hotelImage from "../../../assets/img/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card";
const HotelCard = ({
  title,
  ranking,
  id,
  kafalat,
  managerName,
  managerEmail,
  managerPassword,
  hotelRent,
  image,
  ...rest
}) => {
  const hotelImageSrc = image || hotelImage;
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedHotelData, setUpdatedHotelData] = useState({
    title: title,
    kafalat: kafalat,
    managerName: managerName,
    managerEmail: managerEmail,
    managerPassword: managerPassword,
    hotelRent: hotelRent,
  });
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setShowModal(true); // Open modal when entering edit mode
  };

  const handleSaveChanges = () => {
    const requestData = { data: updatedHotelData }; // Wrap updatedHotelData in a "data" property
    axios
      .put(`http://localhost:1337/api/hotel-names/${id}`, requestData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        setIsEditMode(false); // Exit edit mode
        setShowModal(false); // Close modal after saving changes
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const handleDeleteHotel = () => {
    axios
      .delete(`http://localhost:1337/api/hotel-names/${id}`)
      .then((response) => {
        console.log("Hotel deleted successfully:", response.data);
        // Additional logic if needed after deletion
      })
      .catch((error) => {
        console.error("Error deleting hotel:", error);
      });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedHotelData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");

  return (
    <>
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
          {!isEditMode && (
            <Link
              _hover={{ bg: "gray.200", color: "white" }}
              me="16px"
              ms="auto"
              p="0px !important"
              onClick={handleToggleEditMode}
            >
              <Icon as={MdEdit} color="secondaryGray.500" h="18px" w="18px" />
            </Link>
          )}
        </Flex>
        <Link
          _hover={{ bg: "gray.200", color: "white" }}
          me="16px"
          ms="auto"
          p="0px !important"
          onClick={handleDeleteHotel}
        >
          <Icon as={MdDelete} color="secondaryGray.500" h="18px" w="18px" />
        </Link>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Hotel Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontWeight="bold" fontSize="xl" mt="10px">
                Hotel name
              </Text>
              <Input
                type="text"
                name="title"
                value={updatedHotelData.title}
                onChange={handleInputChange}
              />
              <Text fontWeight="bold" fontSize="xl" mt="10px">
                Hotel kafalat
              </Text>
              <Input
                type="number"
                name="kafalat"
                value={updatedHotelData.kafalat}
                onChange={handleInputChange}
              />
              <Text fontWeight="bold" fontSize="xl" mt="10px">
                Manager name
              </Text>
              <Input
                type="text"
                name="managerName"
                value={updatedHotelData.managerName}
                onChange={handleInputChange}
              />
              <Text fontWeight="bold" fontSize="xl" mt="10px">
                Manager email
              </Text>
              <Input
                type="email"
                name="managerEmail"
                value={updatedHotelData.managerEmail}
                onChange={handleInputChange}
              />
              <Text fontWeight="bold" fontSize="xl" mt="10px">
                Manager password
              </Text>
              <Input
                type="text"
                name="managerPassword"
                value={updatedHotelData.managerPassword}
                onChange={handleInputChange}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HotelCard;
