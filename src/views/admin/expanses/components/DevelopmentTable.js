import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Center,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios";
// Custom components
import Card from "components/card/Card";
import { MdEdit } from "react-icons/md";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const [showTodaySaleModal, setShowTodaySaleModal] = useState(false);
  const [showAdvanceSalaryModal, setShowAdvanceSalaryModal] = useState(false);
  const [todaySaleData, setTodaySaleData] = useState([]);
  const [advanceSalaryData, setAdvanceSalaryData] = useState([]);

  const handleTodaySaleModalClose = () => setShowTodaySaleModal(false);
  const handleAdvanceSalaryModalClose = () => setShowAdvanceSalaryModal(false);
  const {
    columnsData,
    tableData,
    selectedHotel,
    selectedDate,
    updateTableData,
  } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const handleTodaySaleModalOpen = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/daily-sales?poulate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[date][$eq]=${selectedDate}`
      );

      setTodaySaleData(response.data);

      setShowTodaySaleModal(true);
    } catch (error) {
      console.error("Error fetching today's sale data:", error);
    }
  };
  const handleAdvanceSalaryModalOpen = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/advance-salaries?populate[employees_datum][populate][0]=hotel_name&filters[employees_datum][hotel_name][id][$eq]=${selectedHotel}&filters[date][$eq]=${selectedDate}`
      );

      setAdvanceSalaryData(response.data);
      setShowAdvanceSalaryModal(true);
    } catch (error) {
      console.error("Error fetching advance salary data:", error);
    }
  };
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
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const totalExpense = tableData
    .reduce((total, item) => total + parseFloat(item.totalPrice), 0)
    .toFixed(1);

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex marginLeft="10px">
        <div style={{ width: "250px", fontSize: "15px" }}>
          <Button
            colorScheme="blue"
            width="fit-content"
            alignSelf="flex-end"
            onClick={handleTodaySaleModalOpen}
          >
            View Today Sale
          </Button>
          <Text color={textColorPrimary} fontWeight="bold" mt="10px" mb="4px">
            <Button
              colorScheme="blue"
              width="fit-content"
              alignSelf="flex-end"
              onClick={handleAdvanceSalaryModalOpen}
            >
              View Advance Salary
            </Button>
          </Text>
        </div>
      </Flex>
      <Center>
        <Flex px="25px" justify="center" mb="20px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            Daily Expenses
          </Text>
        </Flex>
      </Center>
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
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
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
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Items Name") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === "Category") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === "Quantity") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === "Price") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value} SAR
                      </Text>
                    );
                  }
                  if (cell.column.Header === "Total Price") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                      pr="0"
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
      <Flex width="100%" justify="start">
        <hr
          style={{
            width: "100%",
            margin: "15px 0",
            border: "1px solid black",
          }}
        />
      </Flex>
      <Text fontWeight="bold">Total Expense: {totalExpense}</Text>
      <Text fontWeight="bold">
        Total Sale:{" "}
        {todaySaleData?.data?.reduce(
          (total, item) => total + item.attributes.sale,
          0
        )}
      </Text>
      <Text fontWeight="bold">Total Advance: 100SAR</Text>
      <Text fontWeight="bold">Total Deposit: 1000SAR</Text>
      {/* Today Sale Modal */}
      <Modal
        isOpen={showTodaySaleModal}
        onClose={handleTodaySaleModalClose}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Today Sale</ModalHeader>
          <ModalBody>
            {todaySaleData?.data?.map((saleItem, index) => {
              return (
                <Text key={index} color={textColorPrimary} fontWeight="bold">
                  date: {saleItem?.attributes?.date}
                  <br />
                  Today Total Sale: {saleItem?.attributes?.sale}
                </Text>
              );
            })}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleTodaySaleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Advance Salary Modal */}
      <Modal
        isOpen={showAdvanceSalaryModal}
        onClose={handleAdvanceSalaryModalClose}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Advance Salary</ModalHeader>
          <ModalBody>
            {advanceSalaryData?.data?.map((salaryItem, index) => {
              return (
                <Text key={index} color={textColorPrimary} fontWeight="bold">
                  Employee Name:{" "}
                  {
                    salaryItem.attributes.employees_datum.data.attributes
                      .EmployeeName
                  }
                  <br />
                  Advance: {salaryItem?.attributes?.amount} SAR
                </Text>
              );
            })}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAdvanceSalaryModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
