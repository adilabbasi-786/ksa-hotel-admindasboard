import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Text,
  useColorModeValue,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Information from "views/admin/expanses/components/Information";
import { URL } from "Utils";
import ViewReports from "./ViewReports";
import ReportModal from "./ReportModal";

const getCurrentMonth = () => {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since January is 0
  const year = currentDate.getFullYear();
  return `${year}-${month}`;
};

const getMonthName = (monthNumber) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthNumber - 1];
};

const RentKafalat = ({ selectedHotel }) => {
  const [rentData, setRentData] = useState(null);
  const [defaultMonth, setDefaultMonth] = useState(getCurrentMonth());
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [isPaid, setIsPaid] = useState(false);
  const [hotelRent, setHotelRent] = useState();
  const [kafalat, setKafalat] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [paidRent, setPaidRent] = useState("");
  const [paidKafalat, setPaidKafalat] = useState("");
  const token = localStorage.getItem("token");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    fetchRentKafalatData();
  }, [selectedHotel, selectedMonth]);

  const fetchRentKafalatData = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/rents?populate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[month]=${selectedMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRentData(response.data.data);
      setIsPaid(response.data.data[0]?.attributes?.isPaid || false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const openModal = (editMode = false) => {
    setIsEditMode(editMode);
    if (editMode && rentData) {
      setPaidRent(rentData[0]?.attributes?.hotelRent || "");
      setPaidKafalat(rentData[0]?.attributes?.kafalat || "");
    } else {
      setPaidRent("");
      setPaidKafalat("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handlePayRent = () => {
    openModal();
  };

  const handleEditRent = () => {
    openModal(true);
  };

  const handleSubmitPaidAmounts = async () => {
    try {
      const method = isEditMode ? "put" : "post";
      const url = isEditMode
        ? `${URL}/api/rents/${rentData[0]?.id}`
        : `${URL}/api/rents`;

      await axios({
        method: method,
        url: url,
        data: {
          data: {
            hotelRent: paidRent,
            kafalat: paidKafalat,
            hotel_name: selectedHotel,
            month: selectedMonth,
          },
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsPaid(true);
      fetchRentKafalatData();
      closeModal();
      setPaidKafalat("");
      setPaidRent("");
    } catch (error) {
      console.error("Error paying rent:", error);
    }
  };

  return (
    <>
      <VStack alignItems="center" mb="10px" width="100%">
        <FormControl>
          <FormLabel>Select month</FormLabel>
          <input
            type="month"
            id="monthYear"
            name="monthYear"
            onChange={handleMonthChange}
            value={selectedMonth}
          ></input>
        </FormControl>
      </VStack>
      <Card mb="20px" width="80%">
        <ViewReports onOpen={() => setIsReportModalOpen(true)} />

        <VStack spacing={4}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize={{ base: "xl", lg: "2xl" }}
            mt="10px"
            mb="4px"
          >
            Hotel Rent And Kafalat
          </Text>
          {rentData ? (
            <>
              <Information
                boxShadow={cardShadow}
                title={`Hotel Rent for Month of ${selectedMonth}`}
                value={`${
                  rentData[0]?.attributes?.hotelRent || "Not paid yet"
                } SAR`}
              />
              <Information
                boxShadow={cardShadow}
                title={`Kafalat for Month of ${selectedMonth}`}
                value={`${
                  rentData[0]?.attributes?.kafalat || "Not paid yet"
                } SAR`}
              />
            </>
          ) : (
            <Text>
              No rent and kafalat data available for the selected month
            </Text>
          )}
        </VStack>
        <Button
          colorScheme="blue"
          disabled={
            isPaid ||
            (rentData &&
              rentData[0]?.attributes?.hotelRent &&
              rentData[0]?.attributes?.kafalat)
          } // Disable the button if rent and kafalat are paid or if they already have values
          onClick={handlePayRent} // Handle button click to open modal
        >
          {isPaid ? "Rent Paid" : "Pay Rent"}
        </Button>
        {rentData && rentData.length > 0 && (
          <Button
            colorScheme="orange"
            disabled={!rentData || rentData.length === 0}
            onClick={handleEditRent}
          >
            Edit Rent and Kafalat
          </Button>
        )}
      </Card>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditMode ? "Edit" : "Pay"} Rent and Kafalat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Rent Amount</FormLabel>
              <Input
                type="number"
                value={paidRent}
                onChange={(e) => setPaidRent(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Kafalat Amount</FormLabel>
              <Input
                type="number"
                value={paidKafalat}
                onChange={(e) => setPaidKafalat(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleSubmitPaidAmounts}>
              Submit
            </Button>
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

export default RentKafalat;
