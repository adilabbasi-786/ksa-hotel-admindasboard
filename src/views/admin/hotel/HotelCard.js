import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Card from "components/card/Card";
import { URL } from "Utils";
import hotelImage from "../../../assets/img/THEME_HOTEL_SIGN_FIVE_STARS_FACADE_BUILDING_GettyImages-1320779330-3.jpg";

const HotelCard = ({
  title,
  ranking,
  id,
  managerName,
  name,
  onUpdateHotel,
  onDeleteHotel,
  managerEmail,
  managerPassword,
  KafeelPhoneNumber,
  kafeelName,
  managerPhoneNumber,
  liscencePicture,
  ComercialCertificate,
  TaxVatPicture,
  image,
  getData,
  ...rest
}) => {
  const hotelImageSrc = image || hotelImage;
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();
  const history = useHistory();

  const [updatedHotelData, setUpdatedHotelData] = useState({
    title: title,
    name: name,
    managerName: managerName,
    managerEmail: managerEmail,
    managerPassword: managerPassword,
    managerPhoneNumber: managerPhoneNumber,
    kafeelName: kafeelName,
    KafeelPhoneNumber: KafeelPhoneNumber,
    liscencePicture: liscencePicture,
    TaxVatPicture: TaxVatPicture,
    ComercialCertificate: ComercialCertificate,
  });

  // State for new modal
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [updatedManagerEmail, setUpdatedManagerEmail] = useState(managerEmail);
  const [updatedManagerPassword, setUpdatedManagerPassword] =
    useState(managerPassword);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const token = localStorage.getItem("token");

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    const {
      title,
      name,
      managerName,
      managerEmail,
      managerPassword,
      managerPhoneNumber,
      kafeelName,
      KafeelPhoneNumber,
    } = updatedHotelData;

    if (
      !title ||
      !name ||
      !managerName ||
      !managerEmail ||
      !managerPassword ||
      !managerPhoneNumber ||
      !kafeelName ||
      !KafeelPhoneNumber
    ) {
      alert("Please fill all the fields before saving.");
      return;
    }
    const formData = new FormData();
    formData.append("title", updatedHotelData.title || "");
    formData.append("name", updatedHotelData.name || "");
    formData.append("managerName", updatedHotelData.managerName || "");
    formData.append("managerEmail", updatedHotelData.managerEmail || "");
    formData.append("managerPassword", updatedHotelData.managerPassword || "");
    formData.append(
      "managerPhoneNumber",
      updatedHotelData.managerPhoneNumber || ""
    );
    formData.append("kafeelName", updatedHotelData.kafeelName || "");
    formData.append(
      "KafeelPhoneNumber",
      updatedHotelData.KafeelPhoneNumber || ""
    );

    if (updatedHotelData.liscencePicture instanceof File) {
      formData.append(
        "files.liscencePicture",
        updatedHotelData.liscencePicture
      );
    }
    if (updatedHotelData.TaxVatPicture instanceof File) {
      formData.append("files.TaxVatPicture", updatedHotelData.TaxVatPicture);
    }
    if (updatedHotelData.ComercialCertificate instanceof File) {
      formData.append(
        "files.ComercialCertificate",
        updatedHotelData.ComercialCertificate
      );
    }

    axios
      .put(`${URL}/api/hotel-names/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Data updated successfully");
        getData();
        history.push("/admin/hotel");
        const updatedHotel = {
          ...response.data,
          id, // Ensure the ID is included
        };
        setUpdatedHotelData(updatedHotel);
        if (onUpdateHotel) {
          onUpdateHotel(updatedHotel);
        }
        setIsEditMode(false);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const handleSaveEmailChanges = () => {
    // Validate the password length
    if (updatedManagerPassword.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }

    // Prepare the data to be sent
    const emailData = {
      hotelId: id,
      managerEmail: updatedManagerEmail,
      password: updatedManagerPassword,
    };

    // Send a POST request to update the manager's email and password
    axios
      .post(`${URL}/api/updatemanager`, emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === "ok") {
          alert("Manager email and password updated successfully");
          // Update the local state and trigger data refresh
          getData();
          history.push("/admin/hotel");
          setUpdatedHotelData((prevData) => ({
            ...prevData,
            managerEmail: updatedManagerEmail,
            managerPassword: updatedManagerPassword,
          }));
          // Close the modal
          setShowEmailModal(false);
        } else {
          alert("Failed to update manager email and password.");
        }
      })
      .catch((error) => {
        console.error("Error updating email:", error);
        alert(
          "An error occurred while updating the manager email and password."
        );
      });
  };

  const handleDeleteHotel = () => {
    axios
      .delete(`${URL}/api/hotel-names/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Hotel deleted successfully:", response.data);
        onDeleteHotel(id);
        setIsDeleteDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting hotel:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedHotelData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileInputChange = (event) => {
    const { name, files } = event.target;
    setUpdatedHotelData((prevData) => ({ ...prevData, [name]: files[0] }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");

  const getPreviewUrl = (file) => {
    if (!file) return null;
    return typeof file === "string" ? file : window.URL.createObjectURL(file);
  };

  const getFilename = (file) => {
    if (!file) return "No file chosen";
    return typeof file === "string" ? file.split("/").pop() : file.name;
  };

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
                _hover={{ cursor: "pointer" }}
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
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Icon as={MdDelete} color="secondaryGray.500" h="18px" w="18px" />
        </Link>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEditMode(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Hotel Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mt="10px">
              <Text fontSize="md" fontWeight="bold" mb="10px">
                Name:
              </Text>
              <Input
                type="text"
                value={updatedHotelData.name}
                onChange={handleInputChange}
                name="name"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="md" fontWeight="bold" mb="10px">
                Manager Name:
              </Text>
              <Input
                type="text"
                value={updatedHotelData.managerName}
                onChange={handleInputChange}
                name="managerName"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="md" fontWeight="bold" mb="10px">
                Manager Phone Number:
              </Text>
              <Input
                type="text"
                value={updatedHotelData.managerPhoneNumber}
                onChange={handleInputChange}
                name="managerPhoneNumber"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="md" fontWeight="bold" mb="10px">
                Kafeel Name:
              </Text>
              <Input
                type="text"
                value={updatedHotelData.kafeelName}
                onChange={handleInputChange}
                name="kafeelName"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="md" fontWeight="bold" mb="10px">
                Kafeel Phone Number:
              </Text>
              <Input
                type="text"
                value={updatedHotelData.KafeelPhoneNumber}
                onChange={handleInputChange}
                name="KafeelPhoneNumber"
              />
            </Box>
            <Box mt="10px">
              <FormControl>
                <FormLabel>License Picture:</FormLabel>
                {updatedHotelData.liscencePicture && (
                  <Image
                    src={getPreviewUrl(updatedHotelData.liscencePicture)}
                    alt="License Picture"
                    boxSize="100px"
                    objectFit="cover"
                    mb="10px"
                  />
                )}
                <Input
                  type="file"
                  name="liscencePicture"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                <Text>{getFilename(updatedHotelData.liscencePicture)}</Text>
              </FormControl>
            </Box>
            <Box mt="10px">
              <FormControl>
                <FormLabel>Tax VAT Picture:</FormLabel>
                {updatedHotelData.TaxVatPicture && (
                  <Image
                    src={getPreviewUrl(updatedHotelData.TaxVatPicture)}
                    alt="Tax VAT Picture"
                    boxSize="100px"
                    objectFit="cover"
                    mb="10px"
                  />
                )}
                <Input
                  type="file"
                  name="TaxVatPicture"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                <Text>{getFilename(updatedHotelData.TaxVatPicture)}</Text>
              </FormControl>
            </Box>
            <Box mt="10px">
              <FormControl>
                <FormLabel>Commercial Certificate:</FormLabel>
                {updatedHotelData.ComercialCertificate && (
                  <Image
                    src={getPreviewUrl(updatedHotelData.ComercialCertificate)}
                    alt="Commercial Certificate"
                    boxSize="100px"
                    objectFit="cover"
                    mb="10px"
                  />
                )}
                <Input
                  type="file"
                  name="ComercialCertificate"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                <Text>
                  {getFilename(updatedHotelData.ComercialCertificate)}
                </Text>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
              Save
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setShowModal(false);
                setIsEditMode(false);
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={() => setShowEmailModal(true)}>
              Edit Manager Email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* New Modal for Editing Email */}
      <Modal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Manager Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mt="10px">
              <Text fontSize="md" fontWeight="bold" mb="10px">
                Manager Email:
              </Text>
              <Input
                type="email"
                value={updatedManagerEmail}
                onChange={(e) => setUpdatedManagerEmail(e.target.value)}
                name="managerEmail"
              />
            </Box>
            <Box mt="10px">
              <Text fontSize="md" fontWeight="bold" mb="10px">
                Manager Password:
              </Text>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={updatedManagerPassword}
                  onChange={(e) => setUpdatedManagerPassword(e.target.value)}
                  name="managerPassword"
                  minLength="6"
                />
                <InputRightElement>
                  <Icon
                    as={showPassword ? MdVisibilityOff : MdVisibility}
                    cursor="pointer"
                    onClick={handleTogglePasswordVisibility}
                  />
                </InputRightElement>
              </InputGroup>
              {updatedManagerPassword.length < 6 && (
                <Text color="red.500" fontSize="sm">
                  Password must be at least 6 characters long.
                </Text>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEmailChanges}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setShowEmailModal(false)}>
              Cancel
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
