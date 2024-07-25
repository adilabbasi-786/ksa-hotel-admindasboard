import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Card } from "@material-ui/core";
import DevelopmentTable from "../expanses/components/DevelopmentTable";
import AddNewItem from "./AddNewItem";
import { URL } from "Utils";
import ViewReports from "./ViewReports";
import ReportModal from "./ReportModal";

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const KitchenExpanses = ({ selectedHotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
    {
      Header: "TAX",
      accessor: "tax",
    },
  ];
  const handleUpdateTableData = (newItem) => {
    setTableData((prevData) => {
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
        <ViewReports onOpen={() => setIsReportModalOpen(true)} />
        <Flex direction="column" justifyContent="space-between">
          <DevelopmentTable
            selectedHotel={selectedHotel}
            selectedDate={selectedDate}
            columnsData={columnsData}
            tableData={tableData}
            updateTableData={handleUpdateTableData}
            getData={getData}
          />
          <Button
            colorScheme="blue"
            width="fit-content"
            marginTop="10px"
            alignSelf="flex-end"
            onClick={() => setIsModalOpen(true)}
          >
            Add Daily Expanse Item
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
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        selectedHotel={selectedHotel}
      />
    </>
  );
};

export default KitchenExpanses;
