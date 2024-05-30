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
  const [showDriverSalaryModal, setShowDriverSalaryModal] = useState(false);
  const [newSaleAmount, setNewSaleAmount] = useState("");
  const [cashSaleAmount, setCashSaleAmount] = useState("");
  const [creditSaleAmount, setCreditSaleAmount] = useState("");
  const [driverData, setDriverData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [amountPaid, setAmountPaid] = useState("");
  const [salary, setSalary] = useState("");
  const [sumofAllTax, setSumofAllTax] = useState(0);
  const [driverSalaryReport, setDriverSalaryReport] = useState("");
  const [sumSalary, setSumSalary] = useState("");

  const handleDriverSalaryModalClose = () => setShowDriverSalaryModal(false);
  const handleTodaySaleModalClose = () => setShowTodaySaleModal(false);
  const handleAdvanceSalaryModalClose = () => setShowAdvanceSalaryModal(false);
  const handlePaymentModalClose = () => setShowPaymentModal(false);
  const { columnsData, tableData, selectedDate, updateTableData } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

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
        `${URL}/api/advance-salaries?&filters[date][$eq]=${selectedDate}`,

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
  const handleOpenPaymentModal = (driver) => {
    setSelectedDriver(driver);
    setShowPaymentModal(true);
  };
  const handlePayment = async () => {
    try {
      // Assuming there's an API to update the driver's paid salary
      await axios.post(
        `${URL}/api/driver-salaries`,
        {
          data: {
            date: selectedDate,
            driver_detail: selectedDriver.id,
            salary: salary,
            paidAmount: amountPaid,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state or refetch data if necessary
      setShowPaymentModal(false);
      setAmountPaid("");
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };
  const handleDriverSalaryModalOpen = async () => {
    try {
      const response = await axios.get(`${URL}/api/driver-details?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDriverData(response.data.data);
      console.log("resss", response.data.data);
      if (response.data.data.length > 0) {
        setSalary(response.data.data[0].attributes.salary);
      }
      setShowDriverSalaryModal(true);
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  const payment = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/driver-salaries?populate=*&filters[date][$eq]=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resp = response.data;
      if (!resp) {
        console.error("Response data is empty or undefined.");
        return;
      }
      let count = 0;
      resp.forEach((item) => {
        const paid = item.paidAmount;
        count = count + paid;
        console.log("count", count);
      });
      setSumSalary(count);
      console.log("Resp", resp);
      // setShowDriverSalaryModal(true);
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  useEffect(() => {
    // alert("hotelchange");
    payment();
  }, [selectedDate]);

  const dataWithTax = useMemo(() => {
    let cumulativeTax = 0;

    const newData = tableData.map((item) => {
      const totalPrice = parseFloat(item.totalPrice);
      const tax = parseFloat((totalPrice * 0.15).toFixed(2)); // 15% tax
      cumulativeTax += tax;
      return {
        ...item,
        tax: tax.toFixed(2),
      };
    });

    setSumofAllTax(cumulativeTax);

    return newData;
  }, [tableData]);

  useEffect(() => {
    console.log("Total Tax:", sumofAllTax.toFixed(2));
  }, [sumofAllTax]);
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => dataWithTax, [dataWithTax]);

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
          <Text color={textColorPrimary} fontWeight="bold" mt="10px" mb="4px">
            <Button
              colorScheme="blue"
              width="fit-content"
              alignSelf="flex-end"
              onClick={handleDriverSalaryModalOpen}
            >
              View Driver Salary
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
                        {cell.value}SAR
                      </Text>
                    );
                  }
                  if (cell.column.Header === "TAX") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}SAR
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
      <Text fontWeight="bold">Total today Sale Tax:{sumofAllTax} </Text>
      <Text fontWeight="bold">Total today driver salary:{sumSalary} </Text>
      <Text fontWeight="bold">
        Total Deposit: {totalSale - totalExpense - sumSalary}
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
      {/* Driver Salary Modal */}
      <Modal
        isOpen={showDriverSalaryModal}
        onClose={handleDriverSalaryModalClose}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Driver Salary</ModalHeader>
          <ModalBody>
            {driverData?.map((driver, index) => {
              const { driverName, salary, driver_salaries, remainingSalary } =
                driver.attributes;
              const paidAmounts = driver_salaries.data.map(
                (salaryEntry) => salaryEntry.attributes.paidAmount
              );
              const totalPaidAmount = paidAmounts.reduce((a, b) => a + b, 0);

              let paidSalaryText;
              let isFullyPaid = totalPaidAmount >= salary;
              if (isFullyPaid) {
                paidSalaryText = `Salary is fully paid`;
              } else {
                paidSalaryText = `${totalPaidAmount} SAR`;
              }

              return (
                <div key={index}>
                  <Text color={textColorPrimary} fontWeight="bold">
                    Driver Name: {driverName}
                    <br />
                    Total Salary: {salary} SAR
                    <br />
                    Paid Salary: {paidSalaryText}
                    <br />
                    Remaining Salary: {salary - totalPaidAmount} SAR
                  </Text>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleOpenPaymentModal(driver)}
                    disabled={isFullyPaid}
                  >
                    Pay the salary
                  </Button>
                </div>
              );
            })}
            {!driverData?.length && <Text>No driver data available</Text>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleDriverSalaryModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={handlePaymentModalClose}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay Driver Salary</ModalHeader>
          <ModalBody>
            {selectedDriver && (
              <Text color={textColorPrimary} fontWeight="bold">
                Driver Name: {selectedDriver.attributes.driverName}
                <br />
                <br />
                <Input
                  type="number"
                  placeholder="Enter paid amount"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                />
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handlePayment}
              isDisabled={!amountPaid}
            >
              Pay
            </Button>
            <Button colorScheme="blue" ml={3} onClick={handlePaymentModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
