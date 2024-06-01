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

  const history = useHistory();
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const closeImageModal = () => {
    setSelectedImage(null);
  };
  useEffect(() => {
    const getData = async () => {
      let req = await fetch(
        `${URL}/api/hotel-names?populate=*&[filters][id]=${id}`
      );
      let res = await req.json();
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
        As we live, our hearts turn colder. Cause pain is what we go through as
        we become older. We get insulted by others, lose trust for those others.
        We get back stabbed by friends. It becomes harder for us to give others
        a hand. We get our heart broken by people we love, even that we give
        them all...
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

          {hotel[0]?.attributes?.liscencePicture?.data?.attributes?.url && (
            <Box
              onClick={() =>
                openImageModal(
                  `${URL}${hotel[0]?.attributes?.liscencePicture?.data?.attributes?.url}`
                )
              }
              cursor="pointer"
            >
              <Image
                src={`${URL}${hotel[0]?.attributes?.liscencePicture?.data?.attributes?.formats?.thumbnail?.url}`}
                alt="liscencePicture"
              />
            </Box>
          )}
        </Box>
        <Box boxShadow={cardShadow}>
          <Text fontWeight="semibold">Comercial Certificate picture </Text>

          {hotel[0]?.attributes?.ComercialCertificate?.data?.attributes
            ?.url && (
            <Box
              onClick={() =>
                openImageModal(
                  `${URL}${hotel[0]?.attributes?.ComercialCertificate?.data?.attributes?.url}`
                )
              }
              cursor="pointer"
            >
              <Image
                src={`${URL}${hotel[0]?.attributes?.ComercialCertificate?.data?.attributes?.formats?.thumbnail?.url}`}
                alt="ComercialCertificate"
              />
            </Box>
          )}
        </Box>
        <Box boxShadow={cardShadow}>
          <Text fontWeight="semibold">Tax Vat Picture </Text>

          {hotel[0]?.attributes?.TaxVatPicture?.data?.attributes?.url && (
            <Box
              onClick={() =>
                openImageModal(
                  `${URL}${hotel[0]?.attributes?.TaxVatPicture?.data?.attributes?.url}`
                )
              }
              cursor="pointer"
            >
              <Image
                src={`${URL}${hotel[0]?.attributes?.TaxVatPicture?.data?.attributes?.formats?.thumbnail?.url}`}
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
