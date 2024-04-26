import { Box } from "@chakra-ui/react";
import React from "react";
import EmployeeForm from "./EmployeeForm";

const AddEmpoyee = () => {
  return (
    <>
      <Box>
        <h1>Add New Employee</h1>
        <EmployeeForm />
      </Box>
    </>
  );
};

export default AddEmpoyee;
