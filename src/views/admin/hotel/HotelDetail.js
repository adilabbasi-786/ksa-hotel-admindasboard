import {
  Box,
  Button,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import Information from "views/admin/expanses/components/Information";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { URL } from "Utils";
import FullScreenImageModal from "./FullScreenModal";

const HotelDetail = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem("token");

  const history = useHistory();
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const closeImageModal = () => {
    setSelectedImage(null);
  };
  useEffect(() => {
    const getData = async () => {
      let req = await fetch(`${URL}/api/hotel-names?&[filters][id]=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let res = await req.json();
      console.log("aman", res.data);
      setHotel(res.data);
    };
    getData();
  }, [id]);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Button
        colorScheme="blue"
        width="fit-content"
        mt="10px"
        alignSelf="center"
        onClick={() => history.push("/admin/hotel")}
      >
        Back
      </Button>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Hotel Information
      </Text>
      <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
        here is the hotel full details
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
        <Information
          boxShadow={cardShadow}
          title="Hotel Name"
          value={hotel[0]?.attributes?.name}
        />
        <Information
          boxShadow={cardShadow}
          title="Manager"
          value={hotel[0]?.attributes?.managerName}
        />
        <Information
          boxShadow={cardShadow}
          title="Location"
          value={hotel[0]?.attributes?.location}
        />
        <Information
          boxShadow={cardShadow}
          title="Manager Email"
          value={hotel[0]?.attributes?.managerEmail}
        />
        <Information
          boxShadow={cardShadow}
          title="Manager Password"
          value={hotel[0]?.attributes?.managerPassword}
        />
        <Information
          boxShadow={cardShadow}
          title="Social Media"
          value="Google, Facebook"
        />
        <Information
          boxShadow={cardShadow}
          title="Manager Phone Number"
          value={hotel[0]?.attributes?.managerPhoneNumber}
        />
        <Information
          boxShadow={cardShadow}
          title="kafeel Name"
          value={hotel[0]?.attributes?.kafeelName}
        />
        <Information
          boxShadow={cardShadow}
          title="kafeel Phone Number"
          value={hotel[0]?.attributes?.KafeelPhoneNumber}
        />

        <Information
          boxShadow={cardShadow}
          title="Tax Vat Number"
          value={hotel[0]?.attributes?.TaxVatNumber}
        />
        <Box boxShadow={cardShadow}>
          <Text fontWeight="semibold">liscence Picture </Text>

          {hotel[0]?.attributes?.liscencePicture && (
            <Box
              onClick={() =>
                openImageModal(hotel[0]?.attributes?.liscencePicture)
              }
              cursor="pointer"
            >
              <Image
                src={hotel[0]?.attributes?.liscencePicture}
                alt="liscencePicture"
              />
            </Box>
          )}
        </Box>
        <Box boxShadow={cardShadow}>
          <Text fontWeight="semibold">Comercial Certificate picture </Text>

          {hotel[0]?.attributes?.ComercialCertificate && (
            <Box
              onClick={() =>
                openImageModal(hotel[0]?.attributes?.ComercialCertificate)
              }
              cursor="pointer"
            >
              <Image
                src={hotel[0]?.attributes?.ComercialCertificate}
                alt="ComercialCertificate"
              />
            </Box>
          )}
        </Box>
        <Box boxShadow={cardShadow}>
          <Text fontWeight="semibold">Tax Vat Picture </Text>

          {hotel[0]?.attributes?.TaxVatPicture && (
            <Box
              onClick={() =>
                openImageModal(hotel[0]?.attributes?.TaxVatPicture)
              }
              cursor="pointer"
            >
              <Image
                src={hotel[0]?.attributes?.TaxVatPicture}
                alt="TaxVatPicture"
              />
            </Box>
          )}
        </Box>
        {/* <Information boxShadow={cardShadow} title="Total" value="15000SAR" /> */}
      </SimpleGrid>
      <FullScreenImageModal
        isOpen={selectedImage !== null}
        onClose={closeImageModal}
        imageUrl={selectedImage}
      />
    </Card>
  );
};

export default HotelDetail;
