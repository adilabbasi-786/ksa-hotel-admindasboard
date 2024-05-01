import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  useBreakpointValue,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { Card, Input } from "@material-ui/core";
import { MdMenu } from "react-icons/md";
import { FaMoneyBillAlt, FaShoppingCart, FaUserClock } from "react-icons/fa";
import ExpanseDevelopmentTable from "../expanses/components/DevelopmentTable";
import AddNewItem from "./AddNewItem";
const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const KitchenExpanses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [active, setActive] = useState("Daily Expenses");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [defaultDate, setDefaultDate] = useState(getCurrentDate());
  const [dailySaleAmount, setDailySaleAmount] = useState(0);
  const [dailyAdvanceAmount, setDailyAdvanceAmount] = useState(0);
  const [dailyCashSaleAmount, setDailyCashSaleAmount] = useState(0);
  const [dailyCardSaleAmount, setDailyCardSaleAmount] = useState(0);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
    // Implement logic to add new item to table data
  };
  // const handleDailySaleAdd = () => {
  //   // Logic to update total sale amount
  //   // For example, add the daily sale amount to the existing total advance amount
  //   setDailyAdvanceAmount((prevAmount) => prevAmount + dailySaleAmount);
  // };

  const handleAdvanceSalaryAdd = () => {
    // Logic to update total advance amount
    // For example, add the daily advance amount to the existing total advance amount
    setDailyAdvanceAmount((prevAmount) => prevAmount + dailyAdvanceAmount);
  };
  const handleDailySaleAdd = () => {
    // Calculate total sale by summing up cash and credit sales
    const totalSale = dailyCashSaleAmount + dailyCardSaleAmount;
    // Perform any additional logic here
    console.log("Total Sale:", totalSale);
  };
  // Define columns data
  const columnsDataDevelopment = [
    {
      Header: "Items Name",
      accessor: "itemname",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Total Price",
      accessor: "totalprice",
    },
  ];

  // Define table data
  const tableDataDevelopment = [
    {
      itemname: "Milk",
      category: "kitchen",
      quantity: "50kg",
      price: "300",
      totalprice: "1500",
    },
    {
      itemname: "Beef",
      category: "kitchen",

      quantity: "5kg",
      price: "3000",
      totalprice: "1550",
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
  const ColumnexpanseData = [
    {
      Header: "Items Name",
      accessor: "itemname",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Total Price",
      accessor: "totalprice",
    },
  ];
  const expanseDataDevelopment = [
    {
      itemname: "Rent",
      category: "other",
      quantity: "1",
      price: "3000",
      totalprice: "3000",
    },
    {
      itemname: "Rent",
      category: "other",
      quantity: "1",
      price: "3000",
      totalprice: "3000",
    },
  ];
  return (
    <>
      <Flex alignItems="center" mb="10px">
        <Text mr={{ base: "5px", lg: "10px" }}>Select month</Text>
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

      {isMobile ? (
        <Flex alignItems="center" justifyContent="center" mb="10px">
          <IconButton
            icon={<FaMoneyBillAlt />}
            mr="10px"
            colorScheme={active === "Daily Expenses" ? "blue" : "gray"}
            onClick={() => setActive("Daily Expenses")}
          />
          <IconButton
            icon={<FaShoppingCart />}
            mr="10px"
            colorScheme={active === "Daily Sale" ? "blue" : "gray"}
            onClick={() => setActive("Daily Sale")}
          />
          <IconButton
            icon={<FaUserClock />}
            colorScheme={active === "Advance Salary" ? "blue" : "gray"}
            onClick={() => setActive("Advance Salary")}
          />
        </Flex>
      ) : (
        <Flex alignItems="center" mb="10px">
          <Button
            mr="10px"
            onClick={() => setActive("Daily Expenses")}
            colorScheme={active === "Daily Expenses" ? "blue" : "gray"}
          >
            Daily Kitchen Expanses
          </Button>
          <Button
            mr="10px"
            onClick={() => setActive("other Expenses")}
            colorScheme={active === "other Expenses" ? "blue" : "gray"}
          >
            other Expanses
          </Button>
          <Button
            mr="10px"
            onClick={() => setActive("Daily Sale")}
            colorScheme={active === "Daily Sale" ? "blue" : "gray"}
          >
            Daily Sale
          </Button>
          <Button
            onClick={() => setActive("Advance Salary")}
            colorScheme={active === "Advance Salary" ? "blue" : "gray"}
          >
            Advance Salary
          </Button>
        </Flex>
      )}

      <Card>
        {/* {active} */}
        {active === "Daily Expenses" && (
          <Flex direction="column">
            <ExpanseDevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={tableDataDevelopment}
            />
            <Flex width="100%" justify="start">
              <hr
                style={{
                  width: "100%",
                  margin: "15px 0",
                  border: "1px solid black",
                }}
              />
            </Flex>
            <Text fontWeight="bold">Total Expenses: 2555</Text>
            <Text fontWeight="bold">Total Sale: {dailySaleAmount} SAR</Text>
            <Text fontWeight="bold">
              Total Advance: {dailyAdvanceAmount} SAR
            </Text>
            <Text fontWeight="bold">Total Deposit: 55555 SAR</Text>
            <Button
              colorScheme="blue"
              width="fit-content"
              marginTop="10px"
              alignSelf="flex-end"
              // onClick={() => setIsModalOpen(true)}
            >
              submit
            </Button>
          </Flex>
        )}
        {active === "Daily Sale" && (
          <Flex direction="column">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Daily Sale
            </Text>
            <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Daily Cash sale</FormLabel>
              <Input
                type="number" // Change type to "number" for numeric input
                placeholder="Enter cash sale"
                onChange={(e) => setDailyCashSaleAmount(Number(e.target.value))}
              />
            </FormControl>
            <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Daily Card Sale</FormLabel>
              <Input
                type="number" // Change type to "number" for numeric input
                placeholder="Enter card sale"
                onChange={(e) => setDailyCardSaleAmount(Number(e.target.value))}
              />
            </FormControl>
            <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Total Sale</FormLabel>
              <Input
                value={dailyCashSaleAmount + dailyCardSaleAmount} // Display total sale
                readOnly // Make input read-only
              />
            </FormControl>
            <Button
              colorScheme="blue"
              width="fit-content"
              marginTop="10px"
              alignSelf="flex-end"
              onClick={handleDailySaleAdd}
            >
              Add
            </Button>
          </Flex>
        )}
        {active === "other Expenses" && (
          <Flex direction="column">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Other Expenses
            </Text>
            <ExpanseDevelopmentTable
              columnsData={ColumnexpanseData}
              tableData={expanseDataDevelopment}
              editableColumns={["price", "quantity"]}
            />
            {/* <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>
                Enter Daily sale:{" "}
                <Input
                  placeholder="Enter sale"
                  onChange={(e) => setDailySaleAmount(e.target.value)}
                />
              </FormLabel>
            </FormControl> */}
            <Button
              colorScheme="blue"
              width="fit-content"
              marginTop="10px"
              alignSelf="flex-end"
              onClick={handleDailySaleAdd}
            >
              Add
            </Button>
          </Flex>
        )}
        {active === "Advance Salary" && (
          <Flex direction="column">
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              Daily Advance Salary
            </Text>
            <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Employee Name</FormLabel>
              <Input placeholder="Employee Name" />
            </FormControl>
            <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
              <FormLabel>Advance payment</FormLabel>
              <Input
                placeholder="Advance payment"
                type="number"
                onChange={(e) => setDailyAdvanceAmount(e.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              width="fit-content"
              marginTop="10px"
              alignSelf="flex-end"
              onClick={handleAdvanceSalaryAdd}
            >
              Add
            </Button>
          </Flex>
        )}
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
