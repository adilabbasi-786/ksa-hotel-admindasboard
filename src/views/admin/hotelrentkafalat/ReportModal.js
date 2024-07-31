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
  Box,
} from "@chakra-ui/react";
import RentsDevelopmentTable from "./rentsDevelopmentTable";
import { URL } from "Utils";
import Pagination from "./Pagination";

const ReportModal = ({ isOpen, onClose, selectedHotel }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRent, setTotalRent] = useState(0);
  const [totalKafalat, setTotalKafalat] = useState(0);
  const [perPage] = useState(20);

  const token = localStorage.getItem("token");

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchRentKafalatReports = () => {
    setIsLoading(true);
    axios
      .get(
        `${URL}/api/rents?populate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[month][$gte]=${fromDate}&filters[month][$lte]=${toDate}&pagination[page]=${currentPage}&pagination[pageSize]=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response?.data?.data?.map((item) => ({
          id: item.id,
          month: item.attributes.month,
          hotelRent: item.attributes.hotelRent,
          kafalat: item.attributes.kafalat,
        }));
        setTableData(data);
        setTotalPages(response.data.meta.pagination.pageCount);
      })
      .catch((error) => {
        console.error("Error fetching rent/kafalat reports:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchTotalRentKafalat = () => {
    axios
      .get(
        `${URL}/api/rents?populate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[month][$gte]=${fromDate}&filters[month][$lte]=${toDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const totalRent = response.data.data.reduce(
          (sum, item) => sum + item.attributes.hotelRent,
          0
        );
        const totalKafalat = response.data.data.reduce(
          (sum, item) => sum + item.attributes.kafalat,
          0
        );
        setTotalRent(totalRent);
        setTotalKafalat(totalKafalat);
      })
      .catch((error) => {
        console.error("Error fetching total rent/kafalat:", error);
      });
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchRentKafalatReports();
      fetchTotalRentKafalat();
    }
  }, [fromDate, toDate, selectedHotel, currentPage]);

  const columnsData = [
    { Header: "Month", accessor: "month" },
    { Header: "Hotel Rent (SAR)", accessor: "hotelRent" },
    { Header: "Kafalat (SAR)", accessor: "kafalat" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Rent and Kafalat Reports for Hotel {selectedHotel}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="center" mt="4">
            <Text mr="4">From</Text>
            <input
              type="month"
              id="monthYear"
              name="monthYear"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Flex>
          <Flex alignItems="center" mt="4">
            <Text mx="4">To</Text>
            <input
              type="month"
              id="monthYear"
              name="monthYear"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Flex>
          <Box mt="6">
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <RentsDevelopmentTable
                columnsData={columnsData}
                tableData={tableData}
              />
            )}
          </Box>
          <Text mt="4" fontWeight="bold">
            Total rents: {totalRent}
          </Text>
          <Text mt="4" fontWeight="bold">
            Total kafalat: {totalKafalat}
          </Text>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
