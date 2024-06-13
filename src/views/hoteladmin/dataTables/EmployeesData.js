import React, { useEffect, useState } from "react";
import axios from "axios";
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
import Banner from "./banner/Banner";
import banner from "assets/img/auth/banner.png";
import EmployeeForm from "./EmployeeForm";
import { URL } from "Utils";
import Drivers from "./Drivers";

const EmployeesData = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const fetchEmployeeData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${URL}/api/employee-data?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployeeData(response.data);
      console.log("employeedatddddddda", response);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleOpenAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const handleCloseAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  return (
    <Box pt={{ base: "50px", md: "80px", xl: "80px" }}>
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
      <div style={{ marginTop: "-20px", marginBottom: "40px" }}>
        <Drivers />
      </div>
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
        {employeeData?.map((employee, index) => {
          console.log("employeedata", employee);
          return (
            <Banner
              key={employee.id || index}
              id={employee.id}
              gridArea="1 / 1 / 2 / 2"
              name={employee?.EmployeeName}
              passportNumber={employee.PassportNumber}
              salary={employee.salary}
              iqamaExpiry={employee.iqamaExpiry}
              iqamaNumber={employee.iqamaNumber}
              passportExpiry={employee.passportNumber}
              passportImage={`${URL}${employee?.passportImage?.url}`}
              iqamaPicture={`${URL}${employee?.iqamaPicture?.url}`}
              status={employee.status}
              EmployeePhoneNumber={employee.EmployeePhoneNumber}
              avatar={employee?.employeePicture}
              healthCard={`${URL}${employee?.Employee_healtCard?.url}`}
              banner={banner}
              employeeData={employee}
              fetchEmployeeData={fetchEmployeeData}
            />
          );
        })}
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
            <EmployeeForm
              fetchEmployeeData={fetchEmployeeData}
              onClose={handleCloseAddEmployeeModal}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeesData;
