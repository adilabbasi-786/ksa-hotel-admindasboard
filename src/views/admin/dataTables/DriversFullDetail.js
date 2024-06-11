import React, { useState } from "react";
import { Text, Image, Box, useColorModeValue } from "@chakra-ui/react";
import { URL } from "Utils";
import FullScreenImageModal from "./FullScreenModal";
const DriversFullDetail = ({ driver }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const closeImageModal = () => {
    setSelectedImage(null);
  };
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  // Log the driver object to check the structure and data
  console.log("Driver Details: ", driver);

  return (
    <div>
      <Text>Name: {driver?.attributes?.driverName}</Text>
      <Text>License Number: {driver?.attributes?.driverLisenceNumber}</Text>
      <Text>Salary: {driver?.attributes?.salary}</Text>
      <Text>Passport Number: {driver?.attributes?.PassportNumber}</Text>
      <Text>Iqama Number: {driver?.attributes?.iqamaNumber}</Text>
      <Text>Phone Number: {driver?.attributes?.driverPhoneNumber}</Text>
      <Text>Passport Expiry: {driver?.attributes?.passportExpiry}</Text>
      <Text>Iqama Expiry: {driver?.attributes?.iqamaExpiry}</Text>
      <Box boxShadow={cardShadow}>
        <Text fontWeight="semibold">Driver Profile Picture</Text>
        <Box
          onClick={() =>
            openImageModal(
              `${URL}${driver?.attributes?.EmployeePicture?.data?.attributes?.url}`
            )
          }
          cursor="pointer"
        >
          <Image
            src={`${URL}${driver?.attributes?.EmployeePicture?.data?.attributes?.formats?.thumbnail?.url}`}
            alt="Iqama Picture"
          />
        </Box>
      </Box>
      <Box boxShadow={cardShadow}>
        <Text fontWeight="semibold">Iqama Picture</Text>
        <Box
          onClick={() =>
            openImageModal(
              `${URL}${driver?.attributes?.iqamaPicture?.data?.attributes?.url}`
            )
          }
          cursor="pointer"
        >
          <Image
            src={`${URL}${driver?.attributes?.iqamaPicture?.data?.attributes?.formats?.thumbnail?.url}`}
            alt="Iqama Picture"
          />
        </Box>
      </Box>
      <Box boxShadow={cardShadow}>
        <Text fontWeight="semibold">passport Picture</Text>
        <Box
          onClick={() =>
            openImageModal(
              `${URL}${driver?.attributes?.passportImage?.data?.attributes?.url}`
            )
          }
          cursor="pointer"
        >
          <Image
            src={`${URL}${driver?.attributes?.passportImage?.data?.attributes?.formats?.thumbnail?.url}`}
            alt="passport Picture"
          />
        </Box>
      </Box>
      <Box boxShadow={cardShadow}>
        <Text fontWeight="semibold">Health Card Picture</Text>
        <Box
          onClick={() =>
            openImageModal(
              `${URL}${driver?.attributes?.healthCard?.data?.attributes?.url}`
            )
          }
          cursor="pointer"
        >
          <Image
            src={`${URL}${driver?.attributes?.healthCard?.data?.attributes?.formats?.thumbnail?.url}`}
            alt="Health Picture"
          />
        </Box>
      </Box>
      <FullScreenImageModal
        isOpen={selectedImage !== null}
        onClose={closeImageModal}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default DriversFullDetail;
