import React, { useEffect, useState } from "react";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Card, Input } from "@material-ui/core";
import DevelopmentTable from "./DevelopmentTable";
import AddSalary from "./AddSalary";
import axios from "axios";
import { URL } from "Utils";
const EmployeeSalaryTable = ({ selectedHotel, selectedEmployee }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    if (selectedEmployee) {
      fetchSalaryData();
    }
  }, [selectedHotel, selectedEmployee]);

  const calculate = (entries) => {
    let total = 0;
    entries.forEach((element) => {
      console.log("element", element.type);
      if (element.type == "advance") {
        total = total + element.amount;
      }
      if (element.type == "deduction") {
        total = total - element.amount;
      }
    });
    setRemainingAmount(total);
  };
  const token = localStorage.getItem("token");

  const fetchSalaryData = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/salaries?populate=*&sort=date:desc&filters[employees_datum]=${selectedEmployee}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data.map((item) => ({
        date: item.attributes.date,
        amount: item.attributes.amount,
        month: item.attributes.month,
        type: item.attributes.type,
        employeeName:
          item.attributes.employees_datum.data.attributes.EmployeeName,
        salary: item.attributes.employees_datum.data.attributes.salary,
      }));
      setTableData(data);
      calculate(data);
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };
  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
    fetchSalaryData();
  };

  // Define columns data
  const columnsData = [
    {
      Header: "Date",
      accessor: "date",
    },
    {
      Header: "Amount",
      accessor: "amount",
    },

    {
      Header: "Month",
      accessor: "month",
    },
    {
      Header: "Type",
      accessor: "type",
    },
  ];
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <>
      <Card>
        <Flex direction="column" justifyContent="space-between">
          <Text
            color={textColor}
            fontSize={{ base: "18px", lg: "22px" }}
            fontWeight="700"
            lineHeight="100%"
            mb={{ base: "10px", lg: "0px" }}
          >
            {tableData[0] && (
              <>
                {tableData[0].employeeName}:{tableData[0].salary}
              </>
            )}
          </Text>
          <DevelopmentTable columnsData={columnsData} tableData={tableData} />
          <Button
            colorScheme="blue"
            width="fit-content"
            alignSelf="flex-end"
            onClick={() => setIsModalOpen(true)}
          >
            Pay Employee salary
          </Button>
        </Flex>
      </Card>
      <h1>remaining : {remainingAmount}</h1>
      <AddSalary
        selectedHotel={selectedHotel}
        selectedEmployee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
        tableData={tableData}
        setTableData={setTableData}
        fetchSalaryData={fetchSalaryData}
      />
    </>
  );
};

export default EmployeeSalaryTable;
