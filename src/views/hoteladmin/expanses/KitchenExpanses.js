import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Card } from "@material-ui/core";
import DevelopmentTable from "../expanses/components/DevelopmentTable";
import AddNewItem from "./AddNewItem";
import { URL } from "Utils";

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getPreviousDate = (date) => {
  const previousDate = new Date(date);
  previousDate.setDate(previousDate.getDate() - 1);
  const year = previousDate.getFullYear();
  const month = String(previousDate.getMonth() + 1).padStart(2, "0");
  const day = String(previousDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const KitchenExpanses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [tableData, setTableData] = useState([]);
  const [previousDayRecordsExist, setPreviousDayRecordsExist] = useState(true);
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const token = localStorage.getItem("token");

  const getData = (date) => {
    axios
      .get(`${URL}/api/daily-registers?populate=*&filters[date]=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const mappedData = response?.data?.map((item) => {
          const totalPrice = (item?.quantity * item?.price).toFixed(1);
          return {
            itemName: item?.itemName,
            category: item?.category,
            quantity: `${item?.quantity} ${
              item?.quantity === "kitchen" ? "others" : "kg"
            }`,
            price: item?.price,
            totalPrice: totalPrice,
            tax: item.tax,
          };
        });
        setTableData(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  };

  const checkPreviousDayRecords = (date) => {
    const previousDate = getPreviousDate(date);
    axios
      .get(
        `${URL}/api/daily-registers?populate=*&filters[date]=${previousDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPreviousDayRecordsExist(response.data.length > 0);
      })
      .catch((error) => {
        console.error("Error checking previous day records:", error);
        setPreviousDayRecordsExist(false);
      });
  };

  useEffect(() => {
    getData(selectedDate);
    checkPreviousDayRecords(selectedDate);
  }, [selectedDate]);

  const columnsData = [
    {
      Header: "Items Name",
      accessor: "itemName",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Total Price",
      accessor: "totalPrice",
    },
    {
      Header: "TAX",
      accessor: "tax",
    },
  ];

  const handleUpdateTableData = (newItem) => {
    setTableData((prevData) => [...prevData, newItem]);
  };

  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
  };

  return (
    <>
      <Flex alignItems="center" mb="10px" width={{ base: "100%", lg: "30%" }}>
        <Text mr={{ base: "3px", lg: "5px" }}>Select date</Text>
        <input
          type="date"
          id="selectedDate"
          name="selectedDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fontSize="md"
          width="100%"
          max={getCurrentDate()}
        />
      </Flex>
      <Card>
        <Flex direction="column" justifyContent="space-between">
          <DevelopmentTable
            selectedDate={selectedDate}
            columnsData={columnsData}
            tableData={tableData}
            updateTableData={handleUpdateTableData}
            previousDayRecordsExist={previousDayRecordsExist}
          />
          <Button
            colorScheme="blue"
            width="fit-content"
            marginTop="10px"
            alignSelf="flex-end"
            onClick={() => setIsModalOpen(true)}
            disabled={!previousDayRecordsExist}
          >
            Add Daily Expanse Item
          </Button>
          {!previousDayRecordsExist && (
            <Text color="red" mt="10px">
              Please enter records for the previous day before adding today's
              records.
            </Text>
          )}
        </Flex>
      </Card>
      <AddNewItem
        selectedDate={selectedDate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
        updateTableData={handleUpdateTableData}
        getData={() => getData(selectedDate)}
      />
    </>
  );
};

export default KitchenExpanses;
