import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Card } from "@material-ui/core";
import DevelopmentTable from "./DevelopmentTable";
import AddSalary from "./AddSalary";

const SalaryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddItem = (newItem) => {
    console.log("New item added:", newItem);
    // Implement logic to add new item to table data
  };
  // Define columns data
  const columnsDataDevelopment = [
    {
      Header: " Employee Name",
      accessor: "employeename",
    },
    {
      Header: " Total Salary",
      accessor: "totalsalary",
    },
    {
      Header: " Advance",
      accessor: "advance",
    },
    {
      Header: " Deducation",
      accessor: "deduction",
    },
    {
      Header: " Total Paid salary",
      accessor: "paidsalary",
    },
  ];

  // Define table data
  const tableDataDevelopment = [
    {
      employeename: "Arman malik",
      totalsalary: "2000",
      advance: "100",
      deduction: "50",
      paidsalary: "300",
    },
    {
      employeename: "Arman malik",
      totalsalary: "2000",
      advance: "100",
      deduction: "50",
      paidsalary: "300",
    },
    {
      employeename: "Arman malik",
      totalsalary: "2000",
      advance: "100",
      deduction: "50",
      paidsalary: "300",
    },
    {
      employeename: "Arman malik",
      totalsalary: "2000",
      advance: "100",
      deduction: "50",
      paidsalary: "300",
    },
  ];

  return (
    <>
      <Card>
        <Flex direction="column" justifyContent="space-between">
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
