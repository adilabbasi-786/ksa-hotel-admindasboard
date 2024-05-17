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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import Information from "views/admin/expanses/components/Information";
import { URL } from "Utils";

const ProfitTable = ({ selectedHotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerRatio, setPartnerRatio] = useState("");
  const [partnersData, setPartnersData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState(null);

  useEffect(() => {
    fetchPartnersData();
    fetchTotalProfit();
  }, [selectedHotel, selectedMonth]);

  const fetchPartnersData = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/partners?populate=*&filters[hotel_names][id][$in]=${selectedHotel}&filters[month]=${selectedMonth}`
      );
      const partnersWithProfit = response.data.data.map((partner) => ({
        ...partner,
        profitAmount: partner.attributes.profit_amount,
        ratio: partner.attributes.ratio,
      }));
      setPartnersData(partnersWithProfit);
    } catch (error) {
      console.error("Error fetching partners data:", error);
    }
  };

  const fetchTotalProfit = async () => {
    try {
      // Assuming you fetch total profit from the backend based on selected month
      const totalProfitFromBackend = 500000; // Fetch total profit from the backend
      setTotalProfit(totalProfitFromBackend);
    } catch (error) {
      console.error("Error fetching total profit:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePartnerNameChange = (event) => {
    setPartnerName(event.target.value);
  };

  const handlePartnerRatioChange = (event) => {
    setPartnerRatio(event.target.value);
  };

  const handleAddPartner = () => {
    // Calculate total ratio of existing partners
    const currentTotalRatio = partnersData.reduce(
      (total, partner) => total + parseFloat(partner.attributes.ratio),
      0
    );

    // Calculate the new partner's ratio
    const newPartnerRatio = parseFloat(partnerRatio);

    // Check if adding the new partner will exceed 100% total ratio
    if (currentTotalRatio + newPartnerRatio <= 100) {
      // Post new partner data to the backend
      const newPartnerData = {
        name: partnerName,
        ratio: partnerRatio,
        hotel_names: [selectedHotel],
        month: selectedMonth,
        // Other data fields as needed
      };

      axios
        .post(
          `${URL}/api/partners`,
          {
            data: newPartnerData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("New partner added:", response.data);
          fetchPartnersData();
        })
        .catch((error) => {
          console.error("Error adding new partner:", error);
        });

      setPartnerName("");
      setPartnerRatio("");
      handleCloseModal();
    } else {
      alert("Adding the new partner will exceed 100% total ratio.");
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    fetchTotalProfit(); // Update total profit based on the new selected month
  };

  const handleDeleteConfirmation = (partner) => {
    setPartnerToDelete(partner);
    setDeleteConfirmationOpen(true);
  };

  const handleDeletePartner = () => {
    console.log("deleteing");
    // Delete the selected partner
    if (partnerToDelete) {
      // Make a DELETE request to the backend API to delete the partner
      axios
        .delete(`${URL}/${partnerToDelete.id}`)
        .then((response) => {
          console.log("Partner deleted:", response.data);
          // After successful deletion, close the confirmation modal and refresh the partner data
          setDeleteConfirmationOpen(false);
          fetchPartnersData();
        })
        .catch((error) => {
          console.error("Error deleting partner:", error);
        });
    }
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const calculateProfitShare = (ratio) => {
    const ratioAsFloat = parseFloat(ratio);
    if (!isNaN(ratioAsFloat)) {
      return (ratioAsFloat / 100) * totalProfit;
    } else {
      return 0;
    }
  };

  return (
    <>
      <Card mb={{ base: "20px", lg: "50px" }}>
        <VStack spacing={4}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize={{ base: "xl", lg: "2xl" }}
            mt="10px"
            mb="4px"
          >
            Partner Profit Ratios
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" w="100%">
            {partnersData.map((partner) => (
              <Information
                key={partner.id}
                boxShadow={cardShadow}
                title={partner.attributes.name}
                value={partner.attributes.ratio}
                onDelete={() => handleDeleteConfirmation(partner)}
              />
            ))}
          </SimpleGrid>
        </VStack>
        <Flex
          justifyContent={{ base: "center", md: "space-between" }}
          mt="10px"
        >
          <Button
            colorScheme="blue"
            width="fit-content"
            onClick={handleOpenModal}
          >
            Add Partner
          </Button>
          <Button
            colorScheme="blue"
            width="fit-content"
            onClick={handleDeletePartner}
          >
            {console.log("Delete")}
            Delete Partner
          </Button>
        </Flex>
      </Card>
      <Card mb={{ base: "0px", lg: "20px" }}>
        <Flex alignItems="center" mb={{ base: "10px", lg: "0px" }}>
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
        </Flex>
        <VStack spacing={4}>
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            fontSize={{ base: "xl", lg: "2xl" }}
            mt="10px"
            mb="4px"
          >
            Total Profit: {totalProfit}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" w="100%">
            {partnersData.map((partner) => (
              <Information
                key={partner.id}
                boxShadow={cardShadow}
                title={partner.attributes.name}
                value={calculateProfitShare(partner.attributes.ratio)}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Partner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Partner Name"
              value={partnerName}
              onChange={handlePartnerNameChange}
              mb="4"
            />
            <Input
              placeholder="Partner Ratio"
              value={partnerRatio}
              onChange={handlePartnerRatioChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddPartner}>
              Add
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Partner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {partnerToDelete && (
              <Text>
                Are you sure you want to delete partner{" "}
                {partnerToDelete.attributes.name}?
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              width="fit-content"
              onClick={handleDeletePartner}
            >
              Delete Partner
            </Button>
            <Button onClick={() => setDeleteConfirmationOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfitTable;
