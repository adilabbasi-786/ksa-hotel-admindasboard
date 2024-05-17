import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import EmployeeSalaryTable from "./EmployeeSalaryTable"; // Import the EmployeeSalaryTable component
import { URL } from "Utils";

const EmployeeDropDown = ({ selectedHotel }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSalaryTable, setShowSalaryTable] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  useEffect(() => {
    if (selectedHotel) {
      fetchEmployees();
    }
  }, [selectedHotel]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/employee-data?populate=*&filters[hotel_name][id][$in]=${selectedHotel}`
      );
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedEmployee(event.target.value);
    setSelectedEmployeeId(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedEmployee) {
      setShowSalaryTable(true);
      fetchEmployees();
    }
  };

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        Employees
      </Text>
      <Select
        placeholder="Select Employee"
        value={selectedEmployee}
        onChange={handleSelectChange}
      >
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.attributes.EmployeeName}
          </option>
        ))}
      </Select>
      <Button
        onClick={handleSubmit}
        colorScheme="blue"
        width="fit-content"
        mt="10px"
        alignSelf="flex-end"
      >
        Submit
      </Button>
      {showSalaryTable && (
        <EmployeeSalaryTable
          selectedHotel={selectedHotel}
          selectedEmployee={selectedEmployee}
        />
      )}
    </Card>
  );
};

export default EmployeeDropDown;
