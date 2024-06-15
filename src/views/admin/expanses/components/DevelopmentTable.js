import React, { useEffect, useMemo, useState } from "react";
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
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
// Custom components
import Card from "components/card/Card";
import { MdEdit } from "react-icons/md";
import { URL } from "Utils";

export default function DevelopmentTable(props) {
  const [showTodaySaleModal, setShowTodaySaleModal] = useState(false);
  const [showAdvanceSalaryModal, setShowAdvanceSalaryModal] = useState(false);
  const [showDriverSalaryModal, setShowDriverSalaryModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [todaySaleData, setTodaySaleData] = useState([]);
  const [advanceSalaryData, setAdvanceSalaryData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [amountPaid, setAmountPaid] = useState("");
  const [salary, setSalary] = useState("");
  const [sumSalary, setSumSalary] = useState("");
  const [sumofAllTax, setSumofAllTax] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTodaySaleModalClose = () => setShowTodaySaleModal(false);
  const handleAdvanceSalaryModalClose = () => setShowAdvanceSalaryModal(false);
  const handleDriverSalaryModalClose = () => setShowDriverSalaryModal(false);
  const handlePaymentModalClose = () => setShowPaymentModal(false);

  const {
    columnsData,
    tableData,
    selectedHotel,
    selectedDate,
    updateTableData,
    getData,
  } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const token = localStorage.getItem("token");

  const totalTodayDriverSalary = driverData.reduce((acc, current) => {
    const paidAmounts = current.attributes.driver_salaries.data
      .filter((salaryEntry) => salaryEntry.attributes.date === selectedDate)
      .map((salaryEntry) => salaryEntry.attributes.paidAmount);
    const totalPaidAmount = paidAmounts.reduce((a, b) => a + b, 0);
    return acc + totalPaidAmount;
  }, 0);

  const handleTodaySaleModalOpen = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/daily-sales?populate=*&filters[hotel_name][id][$in]=${selectedHotel}&filters[date][$eq]=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        `${URL}/api/advance-salaries?populate[employees_datum][populate][0]=hotel_name&filters[employees_datum][hotel_name][id][$eq]=${selectedHotel}&filters[date][$eq]=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdvanceSalaryData(response.data);
      setShowAdvanceSalaryModal(true);
    } catch (error) {
      console.error("Error fetching advance salary data:", error);
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
      setShowDriverSalaryModal(true);
      getData();
      console.log("resss", response.data.data);
      console.log("selectedHotel", selectedHotel);
      if (response.data.data.length > 0) {
        setSalary(response.data.data[0].attributes.salary);
      }
    } catch (error) {
      console.error("Error fetching driver data:", error);
    }
  };

  const handleOpenPaymentModal = (driver) => {
    setSelectedDriver(driver);
    setShowPaymentModal(true);
  };

  const payment = async () => {
    try {
      const response = await axios.get(
        `${URL}/api/driver-salaries?populate=*&filters[date][$eq]=${selectedDate}&filters[hotel_name][id][$in]=${selectedHotel}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resp = response.data.data;
      let count = 0;
      resp.forEach((item) => {
        const paid = item.attributes.paidAmount;
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
  }, [selectedHotel, selectedDate]);

  const handlePayment = async () => {
    setIsLoading(true);

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
            hotel_name: selectedHotel,
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
    setIsLoading(false);
  };

  // Calculate the tax for each item in tableData
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
    console.log("Editing Item:", editingItem);
    console.log("Edit Values:", editValues);
  }, [editValues]);
  useEffect(() => {
    console.log("Total Tax:", sumofAllTax.toFixed(2));
  }, [sumofAllTax]);
  const handleEditClick = (item) => {
    setEditingItem(item);

    setEditValues({
      itemName: item.itemName,
      category: item.category,
      quantity: String(item.quantity),
      price: item.price,
    });
    setIsEditMode(true);
  };
  const handleSaveEdit = async () => {
    if (!editingItem || !editingItem.id) {
      console.error("Editing item or its ID is not defined.");
      return;
    }

    // Check if any fields are empty
    if (
      !editValues.itemName ||
      !editValues.category ||
      !editValues.quantity ||
      !editValues.price
    ) {
      setErrorMessage("All fields should be filled.");
      return;
    }

    try {
      const response = await axios.put(
        `${URL}/api/daily-registers/${editingItem.id}`,
        {
          data: {
            itemName: editValues.itemName,
            category: editValues.category,
            quantity: editValues.quantity,
            price: editValues.price,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state with the new data
      const updatedData = tableData.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              itemName: editValues.itemName,
              category: editValues.category,
              quantity: editValues.quantity,
              price: editValues.price,
              totalPrice: (editValues.quantity * editValues.price).toFixed(2), // Update totalPrice
            }
          : item
      );

      // Update the table data state
      updateTableData(updatedData);
      getData();

      // Reset modal state
      setIsEditMode(false);
      setEditingItem(null);
      setEditValues({});
      setErrorMessage(""); // Clear error message

      console.log("Item updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating the item:", error);
    }
  };
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
  const totalExpense = dataWithTax
    .reduce((total, item) => total + parseFloat(item.totalPrice), 0)
    .toFixed(1);
  const totalTax = dataWithTax
    .reduce((total, item) => total + parseFloat(item.tax), 0)
    .toFixed(1);
  const totalWithTax = (
    parseFloat(totalExpense) + parseFloat(totalTax)
  ).toFixed(1);

  const totalAdvanceSalary = (advanceSalaryData?.data || []).reduce(
    (total, item) => total + (item.attributes.amount || 0),
    0
  );
  const totalCashSale = (todaySaleData?.data || []).reduce(
    (total, item) => total + (item.attributes.cashSale || 0),
    0
  );

  const totalCreditSale = (todaySaleData?.data || []).reduce(
    (total, item) => total + (item.attributes.creditSale || 0),
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
                        {cell.value}
                      </Text>
                    );
                  }
                  if (cell.column.Header === "TAX") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value} SAR
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
                  <Button onClick={() => handleEditClick(row.original)}>
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
      <Text fontWeight="bold">Total Advance: {totalAdvanceSalary} </Text>
      <Text fontWeight="bold">Total today driver salary:{sumSalary} </Text>
      <Text fontWeight="bold">Total today Sale Tax:{sumofAllTax} </Text>

      <Text fontWeight="bold">
        Total Deposit:{" "}
        {totalSale - totalExpense - totalAdvanceSalary - sumSalary}
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
            {todaySaleData?.data?.map((saleItem, index) => {
              return (
                <Text key={index} color={textColorPrimary} fontWeight="bold">
                  Date: {saleItem?.attributes?.date}
                  <br />
                  Cash Sale: {saleItem?.attributes?.cashSale}
                  <br />
                  Credit Sale: {saleItem?.attributes?.creditSale}
                  <br />
                  Today Total Sale: {totalSale}
                </Text>
              );
            })}
            {!todaySaleData?.data?.length && (
              <Flex direction="column" mt="4">
                <Text>No Record Found</Text>
                <Text>Manager did not enter sale</Text>
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
            {!advanceSalaryData?.data?.length && (
              <Text>No One take Today advance</Text>
            )}
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
              isLoading={isLoading}
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
      <Modal isOpen={isEditMode} onClose={() => setIsEditMode(false)} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Daily Expense</ModalHeader>
          <ModalBody>
            {errorMessage && (
              <Text color="red" mb="4">
                {errorMessage}
              </Text>
            )}
            {editingItem && (
              <div>
                <Text color={textColorPrimary} fontWeight="bold">
                  Item Name:
                  <Input
                    type="text"
                    value={editValues.itemName || ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        itemName: e.target.value,
                      })
                    }
                  />
                </Text>
                <Text color={textColorPrimary} fontWeight="bold">
                  Category:
                  <Input
                    type="text"
                    value={editValues.category || ""}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        category: e.target.value,
                      })
                    }
                  />
                </Text>
                <Text color={textColorPrimary} fontWeight="bold">
                  Quantity:
                  <Input
                    type="number"
                    value={editValues.quantity}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        quantity: e.target.value,
                      })
                    }
                  />
                </Text>
                <Text color={textColorPrimary} fontWeight="bold">
                  Price:
                  <Input
                    type="number"
                    value={editValues.price || ""}
                    onChange={(e) =>
                      setEditValues({ ...editValues, price: e.target.value })
                    }
                  />
                </Text>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button
              colorScheme="blue"
              ml={3}
              onClick={() => setIsEditMode(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
}
