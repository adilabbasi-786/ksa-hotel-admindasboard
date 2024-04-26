import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import { columnsDataDevelopment } from "views/hoteladmin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/hoteladmin/dataTables/variables/tableDataDevelopment.json";

import React from "react";
import EmployeesData from "./EmployeesData";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <EmployeesData />
    </Box>
  );
}
