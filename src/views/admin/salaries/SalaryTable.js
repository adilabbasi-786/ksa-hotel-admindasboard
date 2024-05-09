import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Card, Input } from "@material-ui/core";
import DevelopmentTable from "./DevelopmentTable";
import AddSalary from "./AddSalary";
import axios from "axios";

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const SalaryTable = ({ selectedHotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableDataDevelopment, setTableDataDevelopment] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate);
  useEffect(() => {
    axios
      .get(
        `http://localhost:1337/api/salaries?populate[employees_datum][populate][0]=hotel_name&filters[employees_datum][hotel_name][id][$eq]=${selectedHotel}&filters[date]=${selectedDate}`
      )
      .then((response) => {
        const mappedData = response?.data?.data?.map((item) => {
          console.log("item", item.attributes.basic_salary);
          const totalPaid = (
            item?.attributes?.basic_salary - item.attributes.deduction
          ).toFixed(1);
          return {
            employeename:
              item.attributes.employees_datum.data.attributes.EmployeeName,
            basic_salary: item?.attributes?.basic_salary,

            deduction: item.attributes.deduction,
            // totalPaid: totalPaid,
          };
        });

        setTableDataDevelopment(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  }, [selectedDate, selectedDate]);

  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
    // Implement logic to add new item to table data
  };
  // Define columns data
  const columnsDataDevelopment = [
    {
      Header: "Employee Name",
      accessor: "employeename",
    },
    {
      Header: "Total Salary",
      accessor: "basic_salary",
    },
    {
      Header: "Advance",
      accessor: "advance",
    },
    {
      Header: "Deduction",
      accessor: "deduction",
    },
    {
      Header: "Total Paid salary",
      accessor: "totalPaid",
    },
  ];

  // Define table data

  return (
    <>
      <Card>
        <Flex direction="column" justifyContent="space-between">
          <Flex alignItems="center" mb={{ base: "10px", lg: "0px" }}>
            <Text mr={{ base: "3px", lg: "2px" }}>Select month </Text>
            <Input
              type="date"
              id="selectedDate"
              name="selectedDate"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Flex>
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={tableDataDevelopment}
          />
          <Button
            colorScheme="blue"
            width="fit-content"
            alignSelf="flex-end"
            onClick={() => setIsModalOpen(true)}
          >
            Add new Employee
          </Button>
        </Flex>
      </Card>
      <AddSalary
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </>
  );
};

export default SalaryTable;
