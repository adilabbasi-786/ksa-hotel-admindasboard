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

const getCurrentMonth = () => {
  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 since January is 0
  const year = currentDate.getFullYear();
  return `${year}-${month}`;
};

const RentKafalat = () => {
  const [rentData, setRentData] = useState(null);
  const [defaultMonth, setDefaultMonth] = useState(getCurrentMonth());
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [isPaid, setIsPaid] = useState(false);
  const [hotelRent, setHotelRent] = useState();
  const [kafalat, setKafalat] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paidRent, setPaidRent] = useState("");
  const [paidKafalat, setPaidKafalat] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRentKafalatData();
  }, [selectedMonth]);

  const fetchRentKafalatData = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/rents?populate=*&filters[month]=${selectedMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRentData(response.data);
      console.log("res", response.data);
      setIsPaid(response.data.isPaid || false);
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePayRent = () => {
    openModal();
    // Fetch the data again if needed
    // fetchRentKafalatData();
  };

  const handleSubmitPaidAmounts = async () => {
    try {
      // Make a POST request to submit paid rent and kafalat
      await axios.post(
        `${URL}/api/rents`,
        {
          data: {
            hotelRent: paidRent,
            kafalat: paidKafalat,
            month: selectedMonth,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsPaid(true);
      closeModal();
      fetchRentKafalatData();
      paidKafalat("");
      paidRent("");
    } catch (error) {
      console.error("Error paying rent:", error);
    }
  };

  return (
    <>
      <VStack alignItems="center" mb="10px" width="100%">
        <Text>Select month</Text>
        <FormControl>
          <FormLabel>Select month</FormLabel>
          <select
            name="months"
            onChange={handleMonthChange}
            value={selectedMonth}
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </FormControl>
      </VStack>
      <Card mb="20px" width="80%">
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
          {rentData && (
            <>
              <Information
                boxShadow={cardShadow}
                title={`Hotel Rent for Month of ${defaultMonth}`}
                value={`${rentData[0]?.hotelRent} SAR`}
              />
              <Information
                boxShadow={cardShadow}
                title={`Kafalat for Month of ${defaultMonth}`}
                value={`${rentData[0]?.kafalat} SAR`}
              />
            </>
          )}
          {console.log("rentData", rentData)}
        </VStack>
        <Button
          colorScheme="blue"
          disabled={
            isPaid ||
            (rentData && rentData[0]?.hotelRent && rentData[0]?.kafalat)
          } // Disable the button if rent and kafalat are paid or if they already have values
          onClick={handlePayRent} // Handle button click to open modal
        >
          {isPaid ? "Rent Paid" : "Pay Rent"}
        </Button>
      </Card>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay Rent and Kafalat</ModalHeader>
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
    </>
  );
};

export default RentKafalat;
