import React, { useEffect, useState } from "react";
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card";
import DevelopmentTable from "./DevelopmentTable";
import AddSalary from "./AddSalary";
import axios from "axios";
import { URL } from "Utils";

const EmployeeSalaryTable = ({ selectedEmployee }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState(0);

  useEffect(() => {
    if (selectedEmployee) {
      fetchSalaryData();
    }
  }, [selectedEmployee]);

  const calculate = (entries) => {
    let total = 0;
    entries.forEach((element) => {
      if (element.type === "advance") {
        total += element.amount;
      }
      if (element.type === "deduction") {
        total -= element.amount;
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
      console.log("res", response.data);
      const data = response.data.map((item) => {
        console.log("item", item.employees_datum.salary);
        return {
          date: item?.date,
          amount: item?.amount,
          month: item?.month,
          type: item?.type,
          employeeName: item?.employees_datum?.EmployeeName,
          salary: item.employees_datum.salary,
        };
      });
      console.log("salarResponse", data);
      setTableData(data);
      calculate(data);
    } catch (error) {
      console.error("Error fetching salary data:", error);
    }
  };

  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
  };

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
            Add
          </Button>
        </Flex>
      </Card>
      <h1>Remaining: {remainingAmount}</h1>
      <AddSalary
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
