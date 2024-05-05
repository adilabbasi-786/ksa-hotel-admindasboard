import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Banner from "./components/Banner";
import banner from "assets/img/auth/banner.png";
import EmployeeForm from "./EmployeeForm";

// Importing the JSON data directly for demonstration purposes
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import Drivers from "./Drivers";

const EmployeesData = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  // Set all the data initially
  useEffect(() => {
    setEmployeeData(tableDataDevelopment);
  }, []);

  const handleOpenAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const handleCloseAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Button
        me="100%"
        mb="50px"
        w="180px"
        minW="140px"
        mt={{ base: "-10px", "1xl": "auto" }}
        marginTop="-85px"
        variant="brand"
        fontWeight="500"
        onClick={handleOpenAddEmployeeModal}
      >
        Create new Employee
      </Button>
      <Drivers />
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1fr 1.62fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        {employeeData.map((employee, index) => (
          <Banner
            key={index}
            gridArea="1 / 1 / 2 / 2"
            name={employee.name}
            passportNumber={employee.passportNumber}
            status={employee.status}
            avatar={employee.avatar}
            banner={banner}
          />
        ))}
      </Grid>
      <Modal
        size="xl"
        isOpen={isAddEmployeeModalOpen}
        onClose={handleCloseAddEmployeeModal}
      >
        <ModalOverlay />
        <ModalContent maxW="700px">
          <ModalHeader>Add New Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EmployeeForm onClose={handleCloseAddEmployeeModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeesData;
