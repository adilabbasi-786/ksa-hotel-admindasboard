import React, { useState, useEffect } from "react";
import { Select, Button, Text, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import Card from "components/card/Card";
import SalaryTable from "./SalaryTable";
import { URL } from "Utils";

const EmployeeDropDown = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSalaryTable, setShowSalaryTable] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const token = localStorage.getItem("token");

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${URL}/api/employee-data?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setEmployees(response.data);
        console.log("Employees fetched:", response.data);
      } else {
        setEmployees([]);
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      setEmployees([]);
      console.error("Error fetching employees:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedEmployee) {
      setShowSalaryTable(true);
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
        {employees.length > 0 ? (
          employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.EmployeeName}
            </option>
          ))
        ) : (
          <option disabled>No employees found</option>
        )}
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
      {showSalaryTable && <SalaryTable selectedEmployee={selectedEmployee} />}
    </Card>
  );
};

export default EmployeeDropDown;
