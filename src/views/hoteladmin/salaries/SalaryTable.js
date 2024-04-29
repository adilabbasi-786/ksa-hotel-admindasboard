import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Card } from "@material-ui/core";
import DevelopmentTable from "./DevelopmentTable";
import AddNewEmployee from "./AddNewEmployee"; // Import AddNewEmployee component
import AddSalary from "./AddSalary"; // Import AddSalary component

const SalaryTable = () => {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isAddSalaryModalOpen, setIsAddSalaryModalOpen] = useState(false);
  const [modalValues, setModalValues] = useState({
    employeename: "",
    totalsalary: "",
    advance: "",
  });

  const handleAddEmployeeClick = () => {
    // Set default values for modal inputs
    setModalValues({
      employeename: "Default Employee",
      totalsalary: "2000",
      advance: "100",
    });
    // Open the Add Employee modal
    setIsAddEmployeeModalOpen(true);
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
    {
      Header: " Status",
      accessor: "status",
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
      status: "paid",
    },
    {
      employeename: "shan malik",
      totalsalary: "5000",
      advance: "0",
      deduction: "150",
      paidsalary: "3500",
      status: "unpaid",
    },
    {
      employeename: "Arman malik",
      totalsalary: "2000",
      advance: "100",
      deduction: "50",
      paidsalary: "300",
      status: "paid",
    },
    {
      employeename: "Arman malik",
      totalsalary: "2000",
      advance: "100",
      deduction: "50",
      paidsalary: "300",
      status: "unpaid",
    },
  ];

  return (
    <>
      <Card>
        <Flex direction="column" justifyContent="space-between">
          <DevelopmentTable
            setIsAddSalaryModalOpen={setIsAddSalaryModalOpen}
            setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen}
            columnsData={columnsDataDevelopment}
            tableData={tableDataDevelopment}
          />
          <Button
            colorScheme="blue"
            width="fit-content"
            alignSelf="flex-end"
            onClick={handleAddEmployeeClick}
          >
            Add new Employee
          </Button>
        </Flex>
      </Card>
      <AddSalary
        isOpen={isAddSalaryModalOpen}
        onClose={() => setIsAddSalaryModalOpen(false)}
        onAddItem={() => {}}
        defaultValues={modalValues}
      />
      <AddNewEmployee
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
        onAddItem={() => {}}
        defaultValues={modalValues}
      />
    </>
  );
};

export default SalaryTable;
