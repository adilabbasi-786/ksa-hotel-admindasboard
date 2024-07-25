import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  Input,
  Box,
} from "@chakra-ui/react";
import DevelopmentTable from "./charityDevelopmentTable";
import { URL } from "Utils";

const ReportModal = ({ isOpen, onClose, selectedHotel }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchCharityReports = () => {
    setIsLoading(true);
    axios
      .get(
        `${URL}/api/charities?populate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[date][$gte]=${fromDate}&filters[date][$lte]=${toDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response?.data?.data?.map((item) => ({
          id: item.id,
          date: item.attributes.date,
          dailyCharity: item.attributes.dailycharity,
        }));
        setTableData(data);
      })
      .catch((error) => {
        console.error("Error fetching charity reports:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchCharityReports();
    }
  }, [fromDate, toDate, selectedHotel]);

  const columnsData = [
    { Header: "Date", accessor: "date" },
    { Header: "Daily Charity (SAR)", accessor: "dailyCharity" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Charity Reports for Hotel {selectedHotel}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="center" mt="4">
            <Text mr="4">From</Text>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Flex>
          <Flex alignItems="center" mt="4">
            <Text mx="4">To</Text>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Flex>
          {tableData.length > 0 && (
            <Box
              maxH="400px"
              overflowY="auto"
              border="1px solid #e2e8f0"
              borderRadius="md"
              mt="4"
            >
              <DevelopmentTable
                columnsData={columnsData}
                tableData={tableData}
              />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
