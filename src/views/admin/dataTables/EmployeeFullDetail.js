import {
  SimpleGrid,
  Text,
  useColorModeValue,
  Box,
  Image,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useState } from "react";
import Information from "../expanses/components/Information";
import FullScreenImageModal from "./FullScreenModal";
import { URL } from "Utils";

const EmployeeFullDetail = ({ employeeData }) => {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [isPassportImageOpen, setIsPassportImageOpen] = useState(false);
  const [isIqamaImageOpen, setIsIqamaImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const togglePassportImage = () => {
    setIsPassportImageOpen(!isPassportImageOpen);
  };

  const toggleIqamaImage = () => {
    setIsIqamaImageOpen(!isIqamaImageOpen);
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        {employeeData.EmployeeName}
        {console.log("view employee", employeeData)}
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        <Information
          boxShadow={cardShadow}
          title="Name"
          value={employeeData.EmployeeName}
        />
        <Information
          boxShadow={cardShadow}
          title="Passport Number"
          value={employeeData.PassportNumber}
        />
        <Information
          boxShadow={cardShadow}
          title="Passport Expiry Date"
          value={employeeData.passportExpiry}
        />
        <Information
          boxShadow={cardShadow}
          title="Iqama Number"
          value={employeeData.iqamaNumber}
        />
        <Information
          boxShadow={cardShadow}
          title="Iqama Expiry"
          value={employeeData.iqamaExpiry}
        />
        <Information
          boxShadow={cardShadow}
          title="Employee Phone Number"
          value={employeeData.EmployeePhoneNumber}
        />
        <Box boxShadow={cardShadow}>
          <Text fontWeight="semibold">Iqama Picture</Text>
          <Box
            onClick={() =>
              openImageModal(
                `${URL}${employeeData?.iqamaPicture?.data?.attributes?.url}`
              )
            }
            cursor="pointer"
          >
            <Image
              src={`${URL}${employeeData?.iqamaPicture?.data?.attributes?.formats?.thumbnail?.url}`}
              alt="Iqama Picture"
            />
          </Box>
        </Box>
        <Box boxShadow={cardShadow}>
          <Text fontWeight="semibold">Passport Picture</Text>
          <Box
            onClick={() =>
              openImageModal(
                `${URL}${employeeData?.passportImage?.data?.attributes?.url}`
              )
            }
            cursor="pointer"
          >
            <Image
              src={`${URL}${employeeData?.passportImage?.data?.attributes?.formats?.thumbnail?.url}`}
              alt="Passport Picture"
            />
          </Box>
        </Box>
        <Box boxShadow={cardShadow}>
          <Text fontWeight="semibold">Employee Health Card Picture</Text>
          <Box
            onClick={() =>
              openImageModal(
                `${URL}${employeeData?.Employee_healtCard?.data?.attributes?.url}`
              )
            }
            cursor="pointer"
          >
            <Image
              src={`${URL}${employeeData?.Employee_healtCard?.data?.attributes?.formats?.thumbnail?.url}`}
              alt="Passport Picture"
            />
          </Box>
        </Box>
        <Information
          boxShadow={cardShadow}
          title="Status"
          value={employeeData.status}
        />
        <Information
          boxShadow={cardShadow}
          title="Salary"
          value={employeeData.salary}
        />
      </SimpleGrid>
      <FullScreenImageModal
        isOpen={selectedImage !== null}
        onClose={closeImageModal}
        imageUrl={selectedImage}
      />
    </Card>
  );
};

export default EmployeeFullDetail;
