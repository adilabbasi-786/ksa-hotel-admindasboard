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

const AddSalary = ({ isOpen, onClose, onAddItem, selectedHotel }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [totalSalary, setTotalSalary] = useState("");
  const [advance, setAdvance] = useState("");
  const [deduction, setDeduction] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/employee-data?populate=*&filters[hotel_name][id][$in]=${selectedHotel}`
        );
        const employees = response.data.data.map((employee) => ({
          id: employee.id,
          name: employee.attributes.EmployeeName,
          // Include other necessary employee details here
          employeeData: {
            id: employee.id,
            EmployeeName: employee.attributes.EmployeeName,
            // Include other necessary employee details here
          },
        }));
        setEmployeeList(employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [selectedHotel]);

  const handleAddItem = async () => {
    try {
      const selectedEmployeeData = employeeList.find(
        (employee) => employee.id === parseInt(selectedEmployee)
      );
      if (!selectedEmployeeData) {
        throw new Error("Selected employee not found");
      }

      const newSalaryEntry = {
        basic_salary: totalSalary,
        deduction: deduction,
        advance: advance,
        date: new Date().toISOString(),
        month: new Date().getMonth() + 1,
        hotel_name: selectedHotel,
        employees_datum: selectedEmployeeData.employeeData,
      };

      const response = await axios.post(
        "http://localhost:1337/api/salaries",
        newSalaryEntry
      );

      if (response.status === 200) {
        // If successful, call the callback function to notify parent component
        onAddItem(response.data);
        onClose(); // Close the modal
        alert("Salary entry added successfully!");
      } else {
        throw new Error("Failed to add salary entry");
      }
    } catch (error) {
      console.error("Error adding salary entry:", error);
      alert("Failed to add salary entry. Please try again later.");
    }
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
              <FormLabel>Employee Name</FormLabel>
              <Select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                {employeeList.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Total Salary</FormLabel>
              <Input
                value={totalSalary}
                onChange={(e) => setTotalSalary(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Advance</FormLabel>
              <Input
                value={advance}
                onChange={(e) => setAdvance(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Deduction</FormLabel>
              <Input
                value={deduction}
                onChange={(e) => setDeduction(e.target.value)}
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
