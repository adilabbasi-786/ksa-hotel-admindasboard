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
import axios from "axios";
import Drivers from "./Drivers";
import { URL } from "Utils";

const EmployeesData = ({ selectedHotel }) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const fetchEmployeeData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `${URL}/api/employee-data?populate=*&filters[hotel_name][id][$in]=${selectedHotel}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployeeData(response.data);
      console.log("employeepicture", response.data.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [selectedHotel]);

  const handleOpenAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const handleCloseAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  return (
    <Box
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      width="100%"
      overflow="hidden"
    >
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
      {/* <Drivers /> */}
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
        {employeeData?.data?.map((employee) => {
          return (
            <Banner
              id={employee.id}
              key={employee.id}
              gridArea="1 / 1 / 2 / 2"
              name={employee.attributes.EmployeeName}
              passportNumber={employee.attributes.PassportNumber}
              avatar={`${URL}${employee?.attributes?.employeePicture?.data?.attributes?.url}`}
              passportImage={`${URL}${employee?.attributes?.employeePicture?.data?.attributes?.url}`}
              banner={banner}
              status={employee.attributes.status}
              Designation={employee.attributes.Designation}
              iqamaNumber={employee.attributes.iqamaNumber}
              passportExpiry={employee.attributes.passportExpiry}
              iqamaExpiry={employee.attributes.iqamaExpiry}
              salary={employee.attributes.salary}
              EmployeePhoneNumber={employee.attributes.EmployeePhoneNumber}
              lastActiveDate={employee.attributes.lastActiveDate}
              healthCard={employee.attributes.Employee_healtCard}
              employeeData={employee.attributes}
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
              selectedHotel={selectedHotel}
              onClose={handleCloseAddEmployeeModal}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EmployeesData;
