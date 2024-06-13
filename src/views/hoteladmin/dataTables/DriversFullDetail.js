import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Input,
  FormLabel,
  Box,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { URL } from "Utils";
import FullScreenImageModal from "./FullScreenModal";

const DriversFullDetail = ({ driver, isOpen, onClose, fetchDrivers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [driverName, setDriverName] = useState(driver.attributes.driverName);
  const [driverLisenceNumber, setDriverLicenseNumber] = useState(
    driver.attributes.driverLisenceNumber
  );
  const [salary, setSalary] = useState(driver.attributes.salary);
  const [PassportNumber, setPassportNumber] = useState(
    driver.attributes.PassportNumber
  );
  const [iqamaNumber, setiqamaNumber] = useState(driver.attributes.iqamaNumber);
  const [driverPhoneNumber, setdriverPhoneNumber] = useState(
    driver.attributes.driverPhoneNumber
  );
  const [passportExpiry, setpassportExpiry] = useState(
    driver.attributes.passportExpiry
  );
  const [iqamaExpiry, setiqamaExpiry] = useState(driver.attributes.iqamaExpiry);
  const [iqamaPicture, setIqamaPicture] = useState(
    driver.attributes.iqamaPicture
  );
  const [passportPicture, setPassportPicture] = useState(
    driver.attributes.passportImage
  );
  const [healthCardPicture, sethealthCardPicture] = useState(
    driver.attributes.healthCard
  );
  const [EmployeePicture, setEmployeePicture] = useState(
    driver.attributes.EmployeePicture
  );
  const [selectedImage, setSelectedImage] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleFileChange = (e, setState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditDriver = async () => {
    try {
      const updatedDriver = {
        driverName,
        driverLisenceNumber,
        salary,
        PassportNumber,
        iqamaNumber,
        driverPhoneNumber,
        passportExpiry,
        iqamaExpiry,
        iqamaPicture,
        passportImage: passportPicture,
        healthCard: healthCardPicture,
        EmployeePicture,
      };

      await axios.put(
        `${URL}/api/driver-details/${driver.id}`,
        { data: updatedDriver },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDrivers();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating driver details:", error);
    }
  };

  const handleDeleteDriver = async () => {
    try {
      await axios.delete(`${URL}/api/driver-details/${driver.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchDrivers();
      onClose();
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Driver Full Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isEditing ? (
            <>
              <FormLabel>Driver Name</FormLabel>
              <Input
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                mb="4"
              />
              <FormLabel>Driver License Number</FormLabel>
              <Input
                value={driverLisenceNumber}
                onChange={(e) => setDriverLicenseNumber(e.target.value)}
                mb="4"
              />
              <FormLabel>Salary</FormLabel>
              <Input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                mb="4"
              />
              <FormLabel>Passport Number</FormLabel>
              <Input
                value={PassportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                mb="4"
              />
              <FormLabel>Iqama Number</FormLabel>
              <Input
                value={iqamaNumber}
                onChange={(e) => setiqamaNumber(e.target.value)}
                mb="4"
              />
              <FormLabel>Driver Phone Number</FormLabel>
              <Input
                value={driverPhoneNumber}
                onChange={(e) => setdriverPhoneNumber(e.target.value)}
                mb="4"
              />
              <FormLabel>Passport Expiry</FormLabel>
              <Input
                value={passportExpiry}
                onChange={(e) => setpassportExpiry(e.target.value)}
                mb="4"
              />
              <FormLabel>Iqama Expiry</FormLabel>
              <Input
                value={iqamaExpiry}
                onChange={(e) => setiqamaExpiry(e.target.value)}
                mb="4"
              />
              <FormLabel>Iqama Picture</FormLabel>
              {iqamaPicture && (
                <Box onClick={() => openImageModal(iqamaPicture)}>
                  <Image src={iqamaPicture} alt="Iqama Picture" mb="2" />
                </Box>
              )}
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, setIqamaPicture)}
                mb="4"
              />
              <FormLabel>Passport Picture</FormLabel>
              {passportPicture && (
                <Box onClick={() => openImageModal(passportPicture)}>
                  <Image src={passportPicture} alt="Passport Picture" mb="2" />
                </Box>
              )}
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, setPassportPicture)}
                mb="4"
              />
              <FormLabel>Health Card Picture</FormLabel>
              {healthCardPicture && (
                <Box onClick={() => openImageModal(healthCardPicture)}>
                  <Image
                    src={healthCardPicture}
                    alt="Health Card Picture"
                    mb="2"
                  />
                </Box>
              )}
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, sethealthCardPicture)}
                mb="4"
              />
              <FormLabel>Employee Profile Picture</FormLabel>
              {EmployeePicture && (
                <Box onClick={() => openImageModal(EmployeePicture)}>
                  <Image src={EmployeePicture} alt="Employee Picture" mb="2" />
                </Box>
              )}
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, setEmployeePicture)}
                mb="4"
              />
            </>
          ) : (
            <>
              <Text>Name: {driverName}</Text>
              <Text>License Number: {driverLisenceNumber}</Text>
              <Text>Salary: {salary}</Text>
              <Text>Passport Number: {PassportNumber}</Text>
              <Text>Iqama Number: {iqamaNumber}</Text>
              <Text>Phone Number: {driverPhoneNumber}</Text>
              <Text>Passport Expiry: {passportExpiry}</Text>
              <Text>Iqama Expiry: {iqamaExpiry}</Text>
              <Box boxShadow={cardShadow}>
                <Text fontWeight="semibold">Driver Profile Picture</Text>
                <Box
                  onClick={() => openImageModal(EmployeePicture)}
                  cursor="pointer"
                >
                  <Image src={EmployeePicture} alt="Employee Picture" />
                </Box>
              </Box>
              <Box boxShadow={cardShadow}>
                <Text fontWeight="semibold">Driver Iqama Picture</Text>
                <Box
                  onClick={() => openImageModal(iqamaPicture)}
                  cursor="pointer"
                >
                  <Image src={iqamaPicture} alt="Iqama Picture" />
                </Box>
              </Box>
              <Box boxShadow={cardShadow}>
                <Text fontWeight="semibold">Driver Passport Picture</Text>
                <Box
                  onClick={() => openImageModal(passportPicture)}
                  cursor="pointer"
                >
                  <Image src={passportPicture} alt="Passport Picture" />
                </Box>
              </Box>
              <Box boxShadow={cardShadow}>
                <Text fontWeight="semibold">Driver Health Card Picture</Text>
                <Box
                  onClick={() => openImageModal(healthCardPicture)}
                  cursor="pointer"
                >
                  <Image src={healthCardPicture} alt="Health Card Picture" />
                </Box>
              </Box>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {/* {isEditing ? (
            <>
              <Button colorScheme="blue" onClick={handleEditDriver} mr="3">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button
                colorScheme="blue"
                onClick={() => setIsEditing(true)}
                mr="3"
              >
                Edit
              </Button>
              <Button colorScheme="red" onClick={onConfirmOpen}>
                Delete
              </Button>
            </>
          )} */}
        </ModalFooter>
      </ModalContent>
      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this driver?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDeleteDriver} mr="3">
              Yes
            </Button>
            <Button onClick={onConfirmClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FullScreenImageModal
        isOpen={selectedImage !== null}
        onClose={closeImageModal}
        imageUrl={selectedImage}
      />
    </Modal>
  );
};

export default DriversFullDetail;
