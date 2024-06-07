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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import hotelImage from "../../../assets/img/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card";
import { URL } from "Utils";

const HotelCard = ({
  title,
  ranking,
  id,
  managerName,
  onDeleteHotel,
  managerEmail,
  managerPassword,
  KafeelPhoneNumber,
  kafeelName,
  managerPhoneNumber,
  hotelRent,
  image,
  ...rest
}) => {
  const hotelImageSrc = image || hotelImage;
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedHotelData, setUpdatedHotelData] = useState({
    title: title,
    managerName: managerName,
    managerEmail: managerEmail,
    managerPassword: managerPassword,
    hotelRent: hotelRent,
    managerPhoneNumber: managerPhoneNumber,
    kafeelName: kafeelName,
    KafeelPhoneNumber: KafeelPhoneNumber,
  });
  const [showModal, setShowModal] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();
  const history = useHistory();

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setShowModal(true); // Open modal when entering edit mode
  };

  const handleSaveChanges = () => {
    const requestData = { data: updatedHotelData }; // Wrap updatedHotelData in a "data" property
    axios
      .put(`${URL}/api/hotel-names/${id}`, requestData)
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
      .delete(`${URL}/api/hotel-names/${id}`)
      .then((response) => {
        console.log("Hotel deleted successfully:", response.data);
        onDeleteHotel(id);
        setIsDeleteDialogOpen(false);
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
          onClick={() => setIsDeleteDialogOpen(true)} // Open delete confirmation dialog
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
              <Text fontWeight="bold" fontSize="xl" mt="10px">
                Manager Phone Number
              </Text>
              <Input
                type="number"
                name="managerPhoneNumber"
                value={updatedHotelData.managerPhoneNumber}
                onChange={handleInputChange}
              />
              <Text fontWeight="bold" fontSize="xl" mt="10px">
                kafeel Name
              </Text>
              <Input
                type="text"
                name="kafeelName"
                value={updatedHotelData.kafeelName}
                onChange={handleInputChange}
              />
              <Text fontWeight="bold" fontSize="xl" mt="10px">
                kafeel Phone Number
              </Text>
              <Input
                type="number"
                name="KafeelPhoneNumber"
                value={updatedHotelData.KafeelPhoneNumber}
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

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Hotel
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this hotel? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteHotel} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default HotelCard;
