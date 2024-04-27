import React, { useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Card, Input } from "@material-ui/core";
import DevelopmentTable from "../expanses/components/DevelopmentTable";
import DatePickerComponent from "./DatePickerComponent";
import AddNewItem from "./AddNewItem";

const KitchenExpanses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    },
    {
      itemname: "Milk",
      quantity: "50kg",
      price: "300",
    },
    {
      itemname: "Milk",
      quantity: "50kg",
      price: "300",
    },
  ];

  return (
    <>
      <Flex alignItems="center" mb="10px">
        <Text mr={{ base: "5px", lg: "10px" }}>Select month</Text>
        <Input type="date" id="register" name="profitmonth" />
      </Flex>
      {/* <Card>
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
      </Card> */}
      <AddNewItem
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </>
  );
};

export default KitchenExpanses;
