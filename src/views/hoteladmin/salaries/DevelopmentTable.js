import React, { useMemo } from "react";
import {
  Button,
  Flex,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import AddSalary from "./AddSalary"; // Import AddSalary component
import { MdEdit } from "react-icons/md";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useState } from "react";

export default function DevelopmentTable(props) {
  const { columnsData, tableData, setIsAddSalaryModalOpen } = props; // Rename setIsModalOpen to setIsAddSalaryModalOpen

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleUnpaidClick = (rowData) => {
    // Check if the salary status is unpaid
    if (rowData.status === "unpaid") {
      setSelectedEmployee(rowData); // Set the selected employee
      setIsAddSalaryModalOpen(true); // Open the AddSalary modal
    }
  };

  const iconColor = useColorModeValue("secondaryGray.500", "white");

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX="auto" // Adjust overflow property for horizontal scrolling
    >
      <Flex
        px={{ base: "15px", lg: "25px" }}
        justify="space-between"
        mb={{ base: "10px", lg: "20px" }}
        align="center"
        direction={{ base: "column", lg: "row" }}
      >
        <Flex alignItems="center" mb={{ base: "10px", lg: "0px" }}>
          <Text mr={{ base: "3px", lg: "2px" }}>Select month</Text>
          <Input type="month" id="profitmonth" name="profitmonth" />
        </Flex>
        <Text
          color={textColor}
          fontSize={{ base: "18px", lg: "22px" }}
          fontWeight="700"
          lineHeight="100%"
          mb={{ base: "10px", lg: "0px" }}
        >
          Salaries
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Text fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    {column.render("Header")}
                  </Text>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {console.log("data", data[0].employeeName)}
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Date") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === "Amount") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === "Month") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === "Type") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === " Total Paid salary") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === " Status") {
                    data = (
                      <Text
                        color={cell.value === "paid" ? "green.500" : "blue.500"} // Change color for unpaid status
                        fontSize="sm"
                        fontWeight="700"
                        cursor={cell.value === "unpaid" ? "pointer" : "auto"} // Change cursor for unpaid status
                        onClick={() => handleUnpaidClick(row.original)} // Handle click for unpaid status
                      >
                        {cell.value}
                      </Text>
                    );
                  }

                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "12px" }} // Adjust font size for mobile
                      textAlign={{ base: "center", lg: "left" }} // Align center for mobile
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
                <Td>
                  <Button>
                    <MdEdit color={iconColor} />
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
