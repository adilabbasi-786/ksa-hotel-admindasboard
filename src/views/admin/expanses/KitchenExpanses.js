import React, { useState } from "react";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Card, Input } from "@material-ui/core";
import DevelopmentTable from "../expanses/components/DevelopmentTable";
import DatePickerComponent from "./DatePickerComponent";
import AddNewItem from "./AddNewItem";
import Banner from "./components/Banner";
const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const KitchenExpanses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState(getCurrentDate());
  const textColorSecondary = "gray.400";
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
    // Implement logic to add new item to table data
  };
  // Define columns data
  const columnsDataDevelopment = [
    {
      Header: " Items Name",
      accessor: "itemname",
    },
    {
      Header: " Category",
      accessor: "category",
    },
    {
      Header: " Quantity",
      accessor: "quantity",
    },
    {
      Header: " Price",
      accessor: "price",
    },
  ];

  // Define table data
  const tableDataDevelopment = [
    {
      itemname: "Milk",
      category: "kitchen",
      quantity: "50kg",
      price: "300",
    },
    {
      itemname: "Beef",
      category: "kitchen",

      quantity: "5kg",
      price: "3000",
    },
    {
      itemname: "oil",
      category: "kitchen",

      quantity: "7kg",
      price: "300",
    },
    {
      itemname: "petrol",
      category: "oil",

      quantity: "5litre",
      price: "300",
    },
    {
      itemname: "taxi",
      quantity: "50kg",
      price: "300",
      category: "rent",
    },
    {
      itemname: "Milk",
      quantity: "50kg",
      price: "300",
      category: "oil",
    },
    {
      itemname: "Milk",
      quantity: "50kg",
      price: "300",
      category: "dairy",
    },
  ];

  return (
    <>
      <Flex
        alignItems="center"
        mb="10px"
        width={{ base: "100%", lg: "30%" }} // Adjust width based on screen size
      >
        <Text mr={{ base: "3px", lg: "5px" }}>Select month</Text>
        <Input
          type="date" // Change type to "date" for date picker
          id="expanseydate"
          name="expansedate"
          value={defaultDate}
          onChange={(e) => setDefaultDate(e.target.value)}
          fontSize="md" // Adjust the font size for mobile
          width="100%" // Adjust the width for mobile
        />
      </Flex>
      <Card>
        <Flex direction="column" justifyContent="space-between">
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={tableDataDevelopment}
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </>
  );
};

export default KitchenExpanses;