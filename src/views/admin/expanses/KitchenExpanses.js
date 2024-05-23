import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Card, Input } from "@material-ui/core";
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

const KitchenExpanses = ({ selectedHotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [tableData, setTableData] = useState([]);
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const token = localStorage.getItem("token");

  const getData = () => {
    axios
      .get(
        `${URL}/api/daily-registers?populate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[date]=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const mappedData = response?.data?.data?.map((item) => {
          console.log("item", item.attributes.category);
          const totalPrice = (
            item.attributes.quantity * item.attributes.price
          ).toFixed(1);
          return {
            itemName: item.attributes.itemName,
            category: item?.attributes?.category,
            quantity: `${item.attributes.quantity} ${
              item.attributes.quantity === "kitchen" ? "others" : "kg"
            }`,
            price: item.attributes.price,
            totalPrice: totalPrice,
          };
        });

        setTableData(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  };

  useEffect(() => {
    getData();
  }, [selectedHotel, selectedDate]);

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
  ];
  const handleUpdateTableData = (newItem) => {
    setTableData((prevData) => {
      console.log("ssss", [...prevData, newItem]);
      return [...prevData, newItem];
    });
  };
  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
  };
  return (
    <>
      <Flex alignItems="center" mb="10px" width={{ base: "100%", lg: "30%" }}>
        <Text mr={{ base: "3px", lg: "5px" }}>Select date</Text>
        <Input
          type="date"
          id="selectedDate"
          name="selectedDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fontSize="md"
          width="100%"
        />
      </Flex>
      <Card>
        <Flex direction="column" justifyContent="space-between">
          <DevelopmentTable
            selectedHotel={selectedHotel}
            selectedDate={selectedDate}
            columnsData={columnsData}
            tableData={tableData}
            updateTableData={handleUpdateTableData}
          />
          <Button
            colorScheme="blue"
            width="fit-content"
            marginTop="10px"
            alignSelf="flex-end"
            onClick={() => setIsModalOpen(true)}
          >
            Add new Item
          </Button>
        </Flex>
      </Card>
      <AddNewItem
        selectedHotel={selectedHotel}
        selectedDate={selectedDate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
        updateTableData={handleUpdateTableData}
        getData={getData}
      />
    </>
  );
};

export default KitchenExpanses;
