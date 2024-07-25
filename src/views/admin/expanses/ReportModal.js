import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  Text,
  Select,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import DevelopmentTable from "./ReportsDevelopmentTable";
import DailySalesTable from "./SalesDevelopmentTable"; // Import the new table component
import { URL } from "Utils";

const ReportModal = ({ isOpen, onClose, selectedHotel }) => {
  const [reportType, setReportType] = useState("dailyRegister");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [itemNames, setItemNames] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const token = localStorage.getItem("token");

  const fetchReports = () => {
    const endpoint =
      reportType === "dailyRegister" ? "daily-registers" : "daily-sales";
    axios
      .get(
        `${URL}/api/${endpoint}?populate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[date][$gte]=${fromDate}&filters[date][$lte]=${toDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response?.data?.data?.map((item) => {
          if (reportType === "dailyRegister") {
            const totalPrice = (
              item.attributes.quantity * item.attributes.price
            ).toFixed(1);
            return {
              id: item.id,
              itemName: item.attributes.itemName,
              category: item?.attributes?.category,
              quantity: item?.attributes?.quantity,
              price: item.attributes.price,
              totalPrice: totalPrice,
              tax: item.attributes.tax,
              date: item.attributes.date,
            };
          } else {
            return {
              id: item.id,
              date: item.attributes.date,
              cashSale: item.attributes.cashSale,
              totalSale: item.attributes.sale,
              creditSale: item.attributes.creditSale,
            };
          }
        });
        setTableData(data);

        // Extract item names if reportType is dailyRegister
        if (reportType === "dailyRegister") {
          const names = Array.from(new Set(data.map((item) => item.itemName)));
          setItemNames(names);
        }
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchReports();
    }
  }, [reportType, fromDate, toDate, selectedItem]);

  const filteredData =
    reportType === "dailyRegister" && selectedItem
      ? tableData.filter((item) => item.itemName === selectedItem)
      : tableData;

  const columnsData =
    reportType === "dailyRegister"
      ? [
          { Header: "Date", accessor: "date" },
          { Header: "Items Name", accessor: "itemName" },
          { Header: "Category", accessor: "category" },
          { Header: "Quantity", accessor: "quantity" },
          { Header: "Price", accessor: "price" },
          { Header: "Total Price", accessor: "totalPrice" },
          { Header: "TAX", accessor: "tax" },
        ]
      : [
          { Header: "Date", accessor: "date" },
          { Header: "Cash Sale", accessor: "cashSale" },
          { Header: "Credit Sale", accessor: "creditSale" },
          { Header: "Total Sale", accessor: "totalSale" },
        ];

  const totalAmount = filteredData
    .reduce((acc, item) => acc + parseFloat(item.totalPrice || 0), 0)
    .toFixed(2);
  const totalQuantity = filteredData
    .reduce((acc, item) => acc + parseFloat(item.quantity || 0), 0)
    .toFixed(2);
  const totalCreditSale = filteredData
    .reduce((acc, item) => acc + parseFloat(item.creditSale || 0), 0)
    .toFixed(2);
  const totalCashSale = filteredData
    .reduce((acc, item) => acc + parseFloat(item.cashSale || 0), 0)
    .toFixed(2);
  const totalAllSale = filteredData
    .reduce((acc, item) => acc + parseFloat(item.totalSale || 0), 0)
    .toFixed(2);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reports of Hotel {selectedHotel}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RadioGroup onChange={setReportType} value={reportType}>
            <Stack direction="row">
              <Radio value="dailyRegister">Daily Register</Radio>
              <Radio value="dailySale">Daily Sale</Radio>
            </Stack>
          </RadioGroup>
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
          {reportType === "dailyRegister" && itemNames.length > 0 && (
            <Flex alignItems="center" mt="4">
              <Text mr="4">Item Name</Text>
              <Select
                placeholder="Select item"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
              >
                {itemNames.map((itemName, index) => (
                  <option key={index} value={itemName}>
                    {itemName}
                  </option>
                ))}
              </Select>
            </Flex>
          )}
          {filteredData.length > 0 && (
            <>
              {reportType === "dailyRegister" ? (
                <>
                  <Box
                    maxH="400px"
                    overflowY="auto"
                    border="1px solid #e2e8f0"
                    borderRadius="md"
                    mt="4"
                  >
                    <DevelopmentTable
                      columnsData={columnsData}
                      tableData={filteredData}
                    />
                  </Box>
                  <Text mt="4" fontWeight="bold">
                    Total Quantity: {totalQuantity}
                  </Text>
                  <Text mt="4" fontWeight="bold">
                    Total Amount: {totalAmount}
                  </Text>
                </>
              ) : (
                <>
                  <Flex direction="column">
                    <Box
                      maxH="400px"
                      overflowY="auto"
                      border="1px solid #e2e8f0"
                      borderRadius="md"
                      mt="4"
                    >
                      <DailySalesTable
                        columnsData={columnsData}
                        tableData={filteredData}
                      />
                    </Box>
                    <Text mt="2" fontWeight="bold">
                      Total Credit sale: {totalCreditSale}
                    </Text>
                    <Text mt="2" fontWeight="bold">
                      Total Cash sale: {totalCashSale}
                    </Text>
                    <Text mt="2" fontWeight="bold">
                      Total over All sale: {totalAllSale}
                    </Text>
                  </Flex>
                </>
              )}
            </>
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
