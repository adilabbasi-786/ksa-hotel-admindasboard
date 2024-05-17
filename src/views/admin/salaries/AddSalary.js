import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { URL } from "Utils";

const AddSalary = ({
  isOpen,
  onClose,
  onAddItem,
  selectedHotel,
  selectedEmployee,
  tableData,
  setTableData,
  fetchSalaryData,
}) => {
  const [entryType, setEntryType] = useState("monthly salary");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [employeeName, setEmployeeName] = useState(""); // State to store employee name

  const [deduction, setDeduction] = useState("");

  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeName(selectedEmployee);
    }
  }, [selectedEmployee]);

  const fetchEmployeeName = async (employeeId) => {
    try {
      const response = await axios.get(
        `${URL}/api/employee-data/${employeeId}`
      );
      console.log("response data", response.data);
      const employeeData = response.data.data;
      setEmployeeName(employeeData.attributes.EmployeeName);
    } catch (error) {
      console.error("Error fetching employee name:", error);
    }
  };

  const handleAddItem = async (newItem) => {
    // Check if the entry type is "monthly salary" and the entered amount is greater than the employee's salary
    if (
      entryType === "monthly salary" &&
      parseFloat(amount) > parseFloat(tableData[0]?.salary)
    ) {
      alert("Monthly salary cannot be greater than the employee's salary.");
      return;
    }

    const requestData = {
      data: {
        employees_datum: { id: selectedEmployee },
        date: new Date().toISOString(),
        type: entryType,
        amount: amount,
      },
    };
    if (entryType === "monthly salary") {
      requestData.data.month = month;
    }

    // Validate amount only for "monthly salary" entry type
    if (entryType === "monthly salary") {
      if (amount > tableData[0]?.salary) {
        alert("Monthly salary cannot be more than employee's salary!");
        return;
      }
    }

    try {
      const response = await axios.post(`${URL}/api/salaries`, requestData);

      if (response.status === 200) {
        onAddItem(response.data);
        fetchSalaryData();
        onClose();
        alert("Salary entry added successfully!");
        setEntryType("monthly salary");
        setAmount("");
        setMonth("");
      } else {
        throw new Error("Failed to add salary entry");
      }
    } catch (error) {
      console.error("Error adding salary entry:", error);
      alert("Failed to add salary entry. Please try again later.");
    }
  };
  const generateMonthOptions = () => {
    const currentMonth = new Date().getMonth() + 1;
    const options = [];
    for (let i = 1; i <= 12; i++) {
      if (i <= currentMonth) {
        options.push(
          <option key={i} value={i.toString()}>
            {getMonthName(i)}
          </option>
        );
      }
    }
    return options;
  };

  const getMonthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex - 1];
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pay Salary</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Employee</FormLabel>
              <Input value={employeeName} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Employee salary</FormLabel>
              <Input value={tableData[0]?.salary || ""} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Entry Type</FormLabel>
              <Select
                value={entryType}
                onChange={(e) => setEntryType(e.target.value)}
              >
                <option value="monthly salary"> Monthly salary</option>
                <option value="advance"> Advance</option>
                <option value="deduction"> Deduction</option>
              </Select>
            </FormControl>
            {entryType === "monthly salary" && (
              <FormControl>
                <FormLabel>Month</FormLabel>

                <Select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {generateMonthOptions()}
                </Select>
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddItem}>
            Pay Salary
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSalary;
