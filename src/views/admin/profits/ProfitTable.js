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
import Delete from "./Delete";

const ProfitTable = ({ selectedHotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerRatio, setPartnerRatio] = useState("");
  const [partnersData, setPartnersData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [newlyAddedPartners, setNewlyAddedPartners] = useState([]);
  const [profit, setProfit] = useState({
    total_expanse: 0,
    total_sales: 0,
    total_advance: 0,
    total_monthly: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchPartnersData();
  }, [selectedMonth, selectedHotel]);
  useEffect(() => {
    setProfit({
      total_expanse: 0,
      total_sales: 0,
      total_advance: 0,
      total_monthly: 0,
    });
    setSelectedMonth("");
  }, [selectedHotel]);
  const fetchPartnersData = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.get(
        `${URL}/api/partners?populate=*&filters[hotel_names][id][$in]=${selectedHotel}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
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

  const fetchTotalProfit = async (year, month) => {
    try {
      setIsLoading(true);

      const jwt = localStorage.getItem("token");
      const response = await axios.post(
        `${URL}/api/getprofit`,
        { hotel_id: selectedHotel, year: year, month },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setProfit(response.data);
      setIsLoading(false);

      const _total =
        response.data.total_sales -
        response.data.total_expanse -
        response.data.total_advance -
        response.data.total_monthly;
      setTotalProfit(_total);
      // setTotalProfit(totalProfitFromBackend);
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

  const handleAddPartner = async () => {
    const currentTotalRatio = partnersData.reduce(
      (total, partner) => total + parseFloat(partner.attributes.ratio),
      0
    );

    const newPartnerRatio = parseFloat(partnerRatio);

    if (currentTotalRatio + newPartnerRatio <= 100) {
      const newPartnerData = {
        id: Math.random().toString(36).substring(7),
        attributes: {
          name: partnerName,
          ratio: partnerRatio,
          hotel_names: [selectedHotel],
          month: selectedMonth,
        },
      };

      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.post(
          `${URL}/api/partners`,
          { data: newPartnerData.attributes },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        // Update partnersData with the newly added partner
        setPartnersData([...partnersData, newPartnerData]);
        console.log("New partner added:", response.data);

        fetchPartnersData(); // Optionally fetch updated data from the backend
      } catch (error) {
        console.error("Error adding new partner:", error);
      }

      setPartnerName("");
      setPartnerRatio("");
      handleCloseModal();
    } else {
      alert("Adding the new partner will exceed 100% total ratio.");
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    const year = event.target.value.split("-")[0];
    const month = event.target.value.split("-")[1];

    console.log("Event", event.target.value);
    console.log("yearmonth", year, month);

    fetchTotalProfit(year, month); // Update total profit based on the new selected month
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
            {[...partnersData, ...newlyAddedPartners].map((partner) => (
              <Information
                key={partner.id}
                boxShadow={cardShadow}
                title={partner.attributes.name}
                value={partner.attributes.ratio}
                // onDelete={() => handleDeleteConfirmation(partner)}
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
          <Delete
            partnersData={partnersData}
            setPartnersData={setPartnersData}
            fetchPartnersData={fetchPartnersData}
          />
        </Flex>
      </Card>

      <Card mb={{ base: "0px", lg: "20px" }}>
        <Flex alignItems="center" mb={{ base: "10px", lg: "0px" }}>
          <FormControl>
            <FormLabel>Select month</FormLabel>
            <input
              type="month"
              id="monthYear"
              name="monthYear"
              value={selectedMonth}
              onChange={handleMonthChange}
            ></input>
          </FormControl>
        </Flex>
        {selectedMonth != "" && (
          <VStack spacing={4}>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize={{ base: "xl", lg: "2xl" }}
              mt="10px"
              mb="4px"
            >
              Total sale: {profit.total_sales}
            </Text>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize={{ base: "xl", lg: "2xl" }}
              mt="10px"
              mb="4px"
            >
              Total Expanse: {profit.total_expanse}
            </Text>

            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize={{ base: "xl", lg: "2xl" }}
              mt="10px"
              mb="4px"
            >
              Total Advance salary: {profit.total_advance}
            </Text>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize={{ base: "xl", lg: "2xl" }}
              mt="10px"
              mb="4px"
            >
              Total Monthly salary: {profit.total_monthly}
            </Text>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize={{ base: "xl", lg: "2xl" }}
              mt="10px"
              mb="4px"
            >
              Total Profit: {profit.total_sales - profit.total_expanse}
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
        )}
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
    </>
  );
};

export default ProfitTable;
