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
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState("");
  const [paidMonths, setPaidMonths] = useState([]);

  useEffect(() => {
    if (selectedEmployee) {
      fetchEmployeeDetails(selectedEmployee);
      fetchPaidMonths(selectedEmployee);
    }
  }, [selectedEmployee]);

  const token = localStorage.getItem("token");

  const fetchPaidMonths = async (employeeId) => {
    try {
      const response = await axios.get(
        `${URL}/api/salaries?employee_id=${employeeId}&type=monthly salary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const paidMonthsData = response.data.data;
      const paidMonths = paidMonthsData.map((item) => item.month);
      setPaidMonths(paidMonths);
    } catch (error) {
      console.error("Error fetching paid months:", error);
    }
  };

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const response = await axios.get(
        `${URL}/api/employee-data/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const employeeData = response.data.data;
      setEmployeeName(employeeData.attributes.EmployeeName);
      setEmployeeSalary(employeeData.attributes.salary);
      setLastActiveDate(employeeData.attributes.lastActiveDate);
      // setAmount(employeeData.attributes.salary);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const calculateProratedSalary = (month) => {
    if (!lastActiveDate) return parseFloat(employeeSalary);

    const lastActive = new Date(lastActiveDate);
    const activeMonth = lastActive.getMonth() + 1;
    const currentMonth = month;

    if (currentMonth !== activeMonth) {
      return parseFloat(employeeSalary);
    }

    const dayOfMonth = lastActive.getDate();
    const daysRemainingInMonth = Math.min(30, 30 - dayOfMonth + 1);
    const dailySalary = parseFloat(employeeSalary) / 30;
    const proratedSalary = dailySalary * daysRemainingInMonth;

    return isNaN(proratedSalary) ? 0 : Math.floor(proratedSalary);
  };

  useEffect(() => {
    if (entryType === "monthly salary") {
      const proratedSalary = calculateProratedSalary(month);
      setAmount("");
    } else {
      setAmount("");
    }
  }, [entryType, month, employeeSalary, lastActiveDate]);

  const handleAddItem = async () => {
    if (
      entryType === "monthly salary" &&
      parseFloat(amount) > parseFloat(employeeSalary)
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

    try {
      const response = await axios.post(`${URL}/api/salaries`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        onAddItem(response.data);
        fetchSalaryData();
        onClose();
        alert("Salary entry added successfully!");
        setEntryType("monthly salary");
        setAmount("");
        setMonth(new Date().getMonth() + 1);
      } else {
        throw new Error("Failed to add salary entry");
      }
    } catch (error) {
      console.error("Error adding salary entry:", error);
      alert("Failed to add salary entry. Please try again later.");
    }

    if (entryType === "advance") {
      try {
        const advanceResponse = await axios.post(
          `${URL}/api/advance-salaries`,
          {
            data: {
              employees_datum: { id: selectedEmployee },
              date: new Date().toISOString(),
              amount: amount,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (advanceResponse.status !== 200) {
          throw new Error("Failed to add advance amount");
        }
      } catch (error) {
        console.error("Error adding advance amount:", error);
        alert("Failed to add advance amount. Please try again later.");
        return;
      }
    }
  };

  const generateMonthOptions = () => {
    const currentMonth = new Date().getMonth() + 1;
    const options = [
      <option key="" value="">
        Select a month
      </option>,
    ];

    let allMonthsPaid = true;

    for (let i = 1; i <= currentMonth; i++) {
      const monthName = getMonthName(i);
      const isPaid = tableData.some(
        (entry) => entry.type === "monthly salary" && entry.month === i
      );

      if (!isPaid) {
        allMonthsPaid = false;
      }

      options.push(
        <option
          key={i}
          value={i.toString()}
          disabled={isPaid}
          style={isPaid ? { color: "red" } : {}}
        >
          {monthName}
          {isPaid && " (Paid)"}
        </option>
      );
    }

    if (allMonthsPaid && month !== "") {
      setMonth("");
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
              <Input value={employeeSalary} readOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Entry Type</FormLabel>
              <Select
                value={entryType}
                onChange={(e) => setEntryType(e.target.value)}
              >
                <option value="monthly salary">Monthly salary</option>
                <option value="advance">Advance</option>
                <option value="deduction">Deduction</option>
              </Select>
            </FormControl>
            {entryType === "monthly salary" && (
              <FormControl>
                <FormLabel>Month</FormLabel>
                <Select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  readOnly={entryType !== "monthly salary"}
                >
                  {generateMonthOptions()}
                </Select>
              </FormControl>
            )}
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                // readOnly={entryType === "monthly salary"}
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
