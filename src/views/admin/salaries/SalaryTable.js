import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Card, Input } from "@material-ui/core";
import DevelopmentTable from "./DevelopmentTable";
import AddSalary from "./AddSalary";
import axios from "axios";
import { URL } from "Utils";

const SalaryTable = ({ selectedHotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableDataDevelopment, setTableDataDevelopment] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(5); // Default selected month is May (5)

  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
  };

  useEffect(() => {
    axios
      .get(
        `${URL}/api/employee-data?populate=*&filters[hotel_name][id][$in]=${selectedHotel}`
      )
      .then((response) => {
        const mappedData = response?.data?.data?.map((item) => {
          const totalsalary = item?.attributes?.salary;
          const advance = item.attributes.advance;
          const deduction = item.attributes.deduction;
          const totalpaidsalary = totalsalary - advance - deduction;
          return {
            employeename: item?.attributes?.EmployeeName,
            totalsalary: item?.attributes?.salary,
            advance: item.attributes.advance,
            deduction: item.attributes.deduction,
            paidsalary: totalpaidsalary,
          };
        });

        setTableDataDevelopment(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  }, [selectedHotel]);

  const columnsDataDevelopment = [
    {
      Header: "Employee Name",
      accessor: "employeename",
    },
    {
      Header: "Total Salary",
      accessor: "totalsalary",
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
      accessor: "paidsalary",
    },
    {
      Header: "STATUS",
      accessor: "status",
    },
  ];

  return (
    <>
      <Card>
        <Flex direction="column" justifyContent="space-between">
          <Flex
            alignItems="center"
            mb="10px"
            width={{ base: "100%", lg: "30%" }}
          >
            <Text mr={{ base: "3px", lg: "5px" }}>Select date</Text>
            <Input
              type="month"
              id="selectedDate"
              name="selectedDate"
              fontSize="md"
              width="100%"
              value={`2024-${
                selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth
              }`}
              onChange={(e) => {
                const month = parseInt(e.target.value.split("-")[1]);
                setSelectedMonth(month);
              }}
              max={
                new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1 < 10
                  ? `0${new Date().getMonth() + 1}`
                  : new Date().getMonth() + 1)
              } // Add the max attribute
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
            Paid Salary
          </Button>
        </Flex>
      </Card>
      <AddSalary
        selectedHotel={selectedHotel}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </>
  );
};

export default SalaryTable;
