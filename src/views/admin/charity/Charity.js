import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Text,
  useColorModeValue,
  Flex,
  VStack,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Information from "views/admin/expanses/components/Information";
import { URL } from "Utils";
import ReportModal from "./ReportModal";
import ViewReports from "./ViewReports";

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Charity = ({ selectedHotel }) => {
  const [defaultDate, setDefaultDate] = useState(getCurrentDate());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [charityCost, setCharityCost] = useState("");
  const [dailyCharity, setDailyCharity] = useState(null);
  const [isCharityPaid, setIsCharityPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDailyCharity();
  }, [selectedHotel, defaultDate]);

  const fetchDailyCharity = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/charities?populate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[date]=${defaultDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDailyCharity(response.data);
      setIsCharityPaid(response.data.data.length > 0); // Check if charity is already paid for the day
    } catch (error) {
      console.error("Error fetching daily charity:", error);
    }
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCharityChange = (event) => {
    setCharityCost(event.target.value);
  };

  const handleAddCharity = async () => {
    setIsLoading(true);

    try {
      await axios.post(
        `${URL}/api/charities`,
        {
          data: {
            dailycharity: charityCost,
            hotel_name: selectedHotel,
            date: defaultDate,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsCharityPaid(true);
      handleCloseModal();
      fetchDailyCharity(); // Refresh the data after adding charity
      setCharityCost(""); // Clear the input after submission
    } catch (error) {
      console.error("Error adding daily charity:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Flex
        alignItems="center"
        mb="10px"
        width={{ base: "100%", lg: "30%" }} // Adjust width based on screen size
      >
        <Text mr={{ base: "5px", lg: "10px" }}>Select date</Text>
        <input
          type="date" // Change type to "date" for date picker
          id="charitydate"
          name="charitydate"
          max={getCurrentDate()}
          value={defaultDate}
          onChange={(e) => setDefaultDate(e.target.value)}
          fontSize="md" // Adjust the font size for mobile
          width="100%" // Adjust the width for mobile
        />
      </Flex>
      <Card mb={{ base: "20px", lg: "50px" }} width="80%">
        <VStack spacing={4}>
          <ViewReports onOpen={() => setIsReportModalOpen(true)} />

          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize={{ base: "xl", lg: "2xl" }}
            mt="10px"
            mb="4px"
          >
            Daily Charity Date wise
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" w="100%">
            {dailyCharity && dailyCharity.data.length > 0 ? (
              <Text
                color={textColorPrimary}
                fontWeight="bold"
                fontSize={{ base: "xl", lg: "2xl" }}
                mt="10px"
                mb="4px"
              >
                Daily Charity
                <Information
                  boxShadow={cardShadow}
                  title={`Charity for Date ${defaultDate}`}
                  value={`${dailyCharity?.data[0]?.attributes?.dailycharity} SAR`}
                />
              </Text>
            ) : (
              <Text
                color={textColorPrimary}
                fontWeight="bold"
                fontSize={{ base: "xl", lg: "2xl" }}
                mt="10px"
                mb="4px"
              >
                No charity paid yet for the selected date and hotel.
              </Text>
            )}
          </SimpleGrid>
        </VStack>
        <Button
          colorScheme="blue"
          width="fit-content"
          onClick={handleOpenModal}
          disabled={
            isCharityPaid || (dailyCharity && dailyCharity.data.length > 0)
          }
        >
          {isCharityPaid ? "Charity Paid" : "Add Charity"}
        </Button>
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Charity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Charity Amount"
              value={charityCost}
              onChange={handleCharityChange}
              mb="4"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleAddCharity}
              isLoading={isLoading}
            >
              Add
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        selectedHotel={selectedHotel}
      />
    </>
  );
};

export default Charity;
