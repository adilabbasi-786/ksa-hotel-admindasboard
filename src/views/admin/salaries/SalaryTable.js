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
  return `${year}-${month}`;
};
const SalaryTable = ({ selectedHotel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableDataDevelopment, setTableDataDevelopment] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentDate());
  const [isValidDate, setIsValidDate] = useState(true);
  useEffect(() => {
    const startDate = `${selectedMonth}-01`;
    const endDate = `${selectedMonth}-31`;
    axios
      .get(
        `http://localhost:1337/api/salaries?populate=employees_datum,advance_salaries&filters[$or][0][date][$gte]=${startDate}&filters[$or][1][date][$lte]=${endDate}&filters[employees_datum][hotel_name][id][$eq]=${selectedHotel}`
      )
      .then((response) => {
        const data = response?.data?.data;
        if (data && data.length > 0) {
          const mappedData = data.map((item) => {
            const totalAdvance =
              item.attributes.advance_salaries.data.length > 0
                ? item.attributes.advance_salaries.data[0].attributes.amount
                : 0;
            const totalPaid = (
              item?.attributes?.basic_salary -
              item.attributes.deduction -
              totalAdvance
            ).toFixed(1);
            return {
              employeename:
                item.attributes.employees_datum.data.attributes.EmployeeName,
              basic_salary: item?.attributes?.basic_salary,
              deduction: item.attributes.deduction,
              advance: totalAdvance,
              totalPaid: totalPaid,
            };
          });
          setTableDataDevelopment(mappedData);
          setIsValidDate(true); // Data found for the selected month
        } else {
          setTableDataDevelopment([]); // No data found for the selected month
          setIsValidDate(false); // Invalid date, no data available
        }
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
      });
  }, [selectedMonth, selectedHotel]);

  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
    // Implement logic to add new item to table data
  };

  const disableFutureMonths = (event) => {
    const selectedDate = event.target.value;
    const currentDate = getCurrentDate();
    if (selectedDate > currentDate) {
      event.target.value = currentDate; // Set selected value back to the current month
      setSelectedMonth(currentDate); // Update state with current month
    } else {
      setSelectedMonth(selectedDate); // Update state with selected month
    }
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
              type="month"
              id="selectedMonth"
              name="selectedMonth"
              value={selectedMonth}
              onChange={(e) => disableFutureMonths(e)}
            />
          </Flex>
          {isValidDate ? (
            <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={tableDataDevelopment}
            />
          ) : (
            <Text>No data available for the selected month.</Text>
          )}
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
