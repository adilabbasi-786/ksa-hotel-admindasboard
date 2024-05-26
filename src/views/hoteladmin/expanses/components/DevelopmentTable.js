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
  Input,
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
import { URL } from "Utils";

export default function DevelopmentTable(props) {
  const [showTodaySaleModal, setShowTodaySaleModal] = useState(false);
  const [showAdvanceSalaryModal, setShowAdvanceSalaryModal] = useState(false);
  const [todaySaleData, setTodaySaleData] = useState([]);
  const [advanceSalaryData, setAdvanceSalaryData] = useState([]);
  const [newSaleAmount, setNewSaleAmount] = useState("");
  const [cashSaleAmount, setCashSaleAmount] = useState("");
  const [creditSaleAmount, setCreditSaleAmount] = useState("");
  const handleTodaySaleModalClose = () => setShowTodaySaleModal(false);
  const handleAdvanceSalaryModalClose = () => setShowAdvanceSalaryModal(false);
  const { columnsData, tableData, selectedDate, updateTableData } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);
  const token = localStorage.getItem("token");
  const handleTodaySaleModalOpen = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/daily-sales?populate=*&filters[date][$eq]=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTodaySaleData(response.data);
      console.log("salesresponse", response.data);

      setShowTodaySaleModal(true);
    } catch (error) {
      console.error("Error fetching today's sale data:", error);
    }
  };

  const handleAdvanceSalaryModalOpen = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/advance-salaries?populate=*&filters[date][$eq]=${selectedDate}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdvanceSalaryData(response.data);
      console.log("Responseadvacne", response);
      setShowAdvanceSalaryModal(true);
    } catch (error) {
      console.error("Error fetching advance salary data:", error);
    }
  };

  const handleAddSale = async () => {
    const cashSale = parseFloat(cashSaleAmount);
    const creditSale = parseFloat(creditSaleAmount);
    const totalSale = cashSale + creditSale;
    try {
      await axios.post(
        `${URL}/api/daily-sales`,
        {
          data: {
            cashSale: cashSale,
            creditSale: creditSale,
            sale: totalSale,
            date: selectedDate,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh sale data
      handleTodaySaleModalOpen();
      setNewSaleAmount("");
    } catch (error) {
      console.error("Error adding sale:", error);
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
  const totalAdvanceSalary = advanceSalaryData?.reduce(
    (total, item) => total + item?.amount,
    0
  );
  const totalCashSale = todaySaleData?.reduce(
    (total, item) => total + (item.cashSale || 0),
    0
  );

  const totalCreditSale = todaySaleData?.reduce(
    (total, item) => total + (item.creditSale || 0),
    0
  );

  const totalSale = totalCashSale + totalCreditSale;
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
      <Text fontWeight="bold">Total Sale: {totalSale}</Text>
      <Text fontWeight="bold">Total Advance:{totalAdvanceSalary} </Text>
      <Text fontWeight="bold">
        Total Deposit: {totalSale - totalExpense - totalAdvanceSalary}
      </Text>
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
            {todaySaleData?.map((saleItem, index) => {
              console.log("saleitem", saleItem);
              return (
                <Text key={index} color={textColorPrimary} fontWeight="bold">
                  Date: {saleItem?.date}
                  <br />
                  cash sale: {saleItem?.cashSale}
                  <br />
                  credit sale: {saleItem?.creditSale}
                  <br />
                  Today Total Sale: {totalSale}
                </Text>
              );
            })}
            {!todaySaleData?.length && (
              <Flex direction="column" mt="4">
                <Text>Enter Cash sale Amount</Text>
                <Input
                  type="number"
                  placeholder="Enter cash sale"
                  value={cashSaleAmount}
                  onChange={(e) => setCashSaleAmount(e.target.value)}
                />
                <Text>Enter Credit sale Amount</Text>

                <Input
                  type="number"
                  placeholder="Enter credit sale"
                  value={creditSaleAmount}
                  onChange={(e) => setCreditSaleAmount(e.target.value)}
                />
                <Button
                  colorScheme="blue"
                  mt="2"
                  onClick={handleAddSale}
                  // isDisabled={!newSaleAmount}
                >
                  Add Sale
                </Button>
              </Flex>
            )}
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
            {advanceSalaryData?.map((salaryItem, index) => {
              console.log("salarData", salaryItem);
              return (
                <Text key={index} color={textColorPrimary} fontWeight="bold">
                  Employee Name: {salaryItem?.employees_datum?.EmployeeName}
                  <br />
                  Advance: {salaryItem?.amount} SAR
                </Text>
              );
            })}
            ____________________
            <Text color={textColorPrimary} fontWeight="bold">
              Total Advance: {totalAdvanceSalary} SAR
            </Text>
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
