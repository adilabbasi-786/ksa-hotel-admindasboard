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
  const [liscenceExpiryDate, setLiscenceExpiryDate] = useState(
    driver.attributes.liscenceExpiryDate
  );
  const [isLoading, setIsLoading] = useState(false);

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
  const [iqamaPicture, setIqamaPicture] = useState(null);
  const [passportPicture, setPassportPicture] = useState(null);
  const [healthCardPicture, sethealthCardPicture] = useState(null);
  const [EmployeePicture, setEmployeePicture] = useState(null);
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

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    setIsLoading(true);

    try {
      const response = await axios.post(`${URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data[0];
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleEditDriver = async () => {
    try {
      const iqamaPictureUpload = iqamaPicture
        ? await handleFileUpload(iqamaPicture)
        : driver.attributes.iqamaPicture;
      const passportPictureUpload = passportPicture
        ? await handleFileUpload(passportPicture)
        : driver.attributes.passportImage;
      const healthCardPictureUpload = healthCardPicture
        ? await handleFileUpload(healthCardPicture)
        : driver.attributes.healthCard;
      const EmployeePictureUpload = EmployeePicture
        ? await handleFileUpload(EmployeePicture)
        : driver.attributes.EmployeePicture;

      await axios.put(
        `${URL}/api/driver-details/${driver.id}`,
        {
          data: {
            driverName,
            driverLisenceNumber,
            salary,
            PassportNumber,
            iqamaNumber,
            driverPhoneNumber,
            passportExpiry,
            iqamaExpiry,
            liscenceExpiryDate,
            iqamaPicture: iqamaPictureUpload.id,
            passportImage: passportPictureUpload.id,
            healthCard: healthCardPictureUpload.id,
            EmployeePicture: EmployeePictureUpload.id,
          },
        },
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
              <FormLabel>Driver License Expiry</FormLabel>
              <Input
                value={liscenceExpiryDate}
                onChange={(e) => setLiscenceExpiryDate(e.target.value)}
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
              {driver.attributes.iqamaPicture && (
                <Box
                  onClick={() =>
                    openImageModal(
                      driver.attributes.iqamaPicture.data.attributes.url
                    )
                  }
                >
                  <Image
                    src={
                      driver.attributes.iqamaPicture.data.attributes.formats
                        .thumbnail.url
                    }
                    alt="Iqama Picture"
                    mb="2"
                  />
                </Box>
              )}
              <Input
                type="file"
                onChange={(e) => setIqamaPicture(e.target.files[0])}
                mb="4"
              />
              <FormLabel>Passport Picture</FormLabel>
              {driver.attributes.passportImage && (
                <Box
                  onClick={() =>
                    openImageModal(
                      driver.attributes.passportImage.data.attributes.url
                    )
                  }
                >
                  <Image
                    src={
                      driver.attributes.passportImage.data.attributes.formats
                        .thumbnail.url
                    }
                    alt="Passport Picture"
                    mb="2"
                  />
                </Box>
              )}
              <Input
                type="file"
                onChange={(e) => setPassportPicture(e.target.files[0])}
                mb="4"
              />
              <FormLabel>HealthCard Picture</FormLabel>
              {driver.attributes.healthCard && (
                <Box
                  onClick={() =>
                    openImageModal(
                      driver.attributes.healthCard.data.attributes.url
                    )
                  }
                >
                  <Image
                    src={
                      driver.attributes.healthCard.data.attributes.formats
                        .thumbnail.url
                    }
                    alt="HealthCard Picture"
                    mb="2"
                  />
                </Box>
              )}
              <Input
                type="file"
                onChange={(e) => sethealthCardPicture(e.target.files[0])}
                mb="4"
              />
              <FormLabel>Employee Profile Picture</FormLabel>
              {driver.attributes.EmployeePicture && (
                <Box
                  onClick={() =>
                    openImageModal(
                      driver.attributes.EmployeePicture.data.attributes.url
                    )
                  }
                >
                  <Image
                    src={
                      driver.attributes.EmployeePicture.data.attributes.formats
                        .thumbnail.url
                    }
                    alt="Employee Picture"
                    mb="2"
                  />
                </Box>
              )}
              <Input
                type="file"
                onChange={(e) => setEmployeePicture(e.target.files[0])}
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
              <Text>Driver Lisence Expiry date: {liscenceExpiryDate}</Text>
              <Text>Phone Number: {driverPhoneNumber}</Text>
              <Text>Passport Expiry: {passportExpiry}</Text>
              <Text>Iqama Expiry: {iqamaExpiry}</Text>
              <Box boxShadow={cardShadow}>
                <Text fontWeight="semibold">Driver Profile Picture</Text>
                <Box
                  onClick={() =>
                    openImageModal(
                      driver?.attributes?.EmployeePicture?.data?.attributes?.url
                    )
                  }
                  cursor="pointer"
                >
                  <Image
                    src={
                      driver?.attributes?.EmployeePicture?.data?.attributes
                        ?.formats?.thumbnail?.url
                    }
                    alt="Iqama Picture"
                  />
                </Box>
              </Box>
              <Box boxShadow={cardShadow}>
                <Text fontWeight="semibold">Driver Iqama Picture</Text>
                <Box
                  onClick={() =>
                    openImageModal(
                      driver?.attributes?.iqamaPicture?.data?.attributes?.url
                    )
                  }
                  cursor="pointer"
                >
                  <Image
                    src={
                      driver?.attributes?.iqamaPicture?.data?.attributes
                        ?.formats?.thumbnail?.url
                    }
                    alt="Iqama Picture"
                  />
                </Box>
              </Box>
              <Box boxShadow={cardShadow}>
                <Text fontWeight="semibold">Driver Passport Picture</Text>
                <Box
                  onClick={() =>
                    openImageModal(
                      driver?.attributes?.passportImage?.data?.attributes?.url
                    )
                  }
                  cursor="pointer"
                >
                  <Image
                    src={
                      driver?.attributes?.passportImage?.data?.attributes
                        ?.formats?.thumbnail?.url
                    }
                    alt="Iqama Picture"
                  />
                </Box>
              </Box>
              <Box boxShadow={cardShadow}>
                <Text fontWeight="semibold">Driver Health Card Picture</Text>
                <Box
                  onClick={() =>
                    openImageModal(
                      driver?.attributes?.healthCard?.data?.attributes?.url
                    )
                  }
                  cursor="pointer"
                >
                  <Image
                    src={
                      driver?.attributes?.healthCard?.data?.attributes?.formats
                        ?.thumbnail?.url
                    }
                    alt="Iqama Picture"
                  />
                </Box>
              </Box>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {isEditing ? (
            <>
              <Button
                colorScheme="blue"
                onClick={handleEditDriver}
                mr="3"
                isLoading={isLoading}
              >
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
          )}
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
