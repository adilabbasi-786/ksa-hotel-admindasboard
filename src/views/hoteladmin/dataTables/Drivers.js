import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Text,
  Input,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { URL } from "Utils";
import Card from "components/card/Card.js";

const Drivers = () => {
  const [driversData, setDriversData] = useState([]);
  const [newDriverName, setNewDriverName] = useState("");
  const [newDriverLicenseNumber, setNewDriverLicenseNumber] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [token, setToken] = useState("");

  const {
    isOpen: isViewModalOpen,
    onOpen: onViewModalOpen,
    onClose: onViewModalClose,
  } = useDisclosure();
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  useEffect(() => {
    // Fetch token from local storage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    // Fetch drivers data
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(`${URL}/api/driver-details`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setDriversData(response.data.data);
      } catch (error) {
        console.error("Error fetching drivers data:", error);
      }
    };

    fetchDrivers();
  }, []);

  const handleAddDriver = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/driver-details`,
        {
          data: {
            driverName: newDriverName,
            driverLisenceNumber: newDriverLicenseNumber,
            salary: newSalary,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add the new driver to the local state
      setDriversData([...driversData, response.data.data]);

      // Clear input fields
      setNewDriverName("");
      setNewDriverLicenseNumber("");
      setNewSalary("");

      // Close the modal
      onAddModalClose();
    } catch (error) {
      console.error("Error adding new driver:", error);
    }
  };

  const handleEditDriver = async () => {
    try {
      const response = await axios.put(
        `${URL}/api/driver-details/${selectedDriver.id}`,
        {
          data: {
            driverName: newDriverName,
            driverLisenceNumber: newDriverLicenseNumber,
            salary: newSalary,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the driver in the local state
      setDriversData(
        driversData.map((driver) =>
          driver.id === selectedDriver.id ? response.data.data : driver
        )
      );

      // Clear input fields
      setNewDriverName("");
      setNewDriverLicenseNumber("");
      setNewSalary("");

      // Close the modal
      onEditModalClose();
    } catch (error) {
      console.error("Error editing driver:", error);
    }
  };

  const handleDeleteDriver = async (driverId) => {
    try {
      await axios.delete(`${URL}/api/driver-details/${driverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the driver from the local state
      setDriversData(driversData.filter((driver) => driver.id !== driverId));
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const openEditModal = (driver) => {
    setSelectedDriver(driver);
    setNewDriverName(driver.attributes.driverName);
    setNewDriverLicenseNumber(driver.attributes.driverLisenceNumber);
    setNewSalary(driver.attributes.salary);
    onEditModalOpen();
  };

  return (
    <>
      <Button
        colorScheme="blue"
        width="fit-content"
        mt="10px"
        alignSelf="flex-end"
        onClick={onViewModalOpen}
      >
        View Drivers
      </Button>

      <Modal isOpen={isViewModalOpen} onClose={onViewModalClose}>
        {/* View Drivers Modal */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Drivers Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {driversData.map((driver, index) => (
              <Card mb={{ base: "0px", "2xl": "20px" }} key={index}>
                <Text>Name: {driver?.attributes?.driverName}</Text>
                <Text>
                  License Number: {driver?.attributes?.driverLisenceNumber}
                </Text>
                <Text>Salary: {driver?.attributes?.salary}</Text>
                <Flex mt="10px">
                  {/* <Button
                    colorScheme="blue"
                    width="fit-content"
                    mr="2"
                    onClick={() => openEditModal(driver)}
                  >
                    Edit Driver
                  </Button>
                  <Button
                    colorScheme="blue"
                    width="fit-content"
                    onClick={() => handleDeleteDriver(driver.id)}
                  >
                    Delete Driver
                  </Button> */}
                </Flex>
              </Card>
            ))}
            <Button
              colorScheme="blue"
              width="fit-content"
              mt="10px"
              alignSelf="flex-end"
              onClick={onAddModalOpen}
            >
              Add Driver
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isAddModalOpen} onClose={onAddModalClose}>
        {/* Add Driver Modal */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Driver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              value={newDriverName}
              onChange={(e) => setNewDriverName(e.target.value)}
              mb="2"
            />
            <Input
              placeholder="License Number"
              value={newDriverLicenseNumber}
              onChange={(e) => setNewDriverLicenseNumber(e.target.value)}
              mb="4"
            />
            <Input
              type="number"
              placeholder="Salary"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              mb="4"
            />
            <Button
              colorScheme="blue"
              onClick={handleAddDriver}
              disabled={!newDriverName || !newDriverLicenseNumber}
            >
              Add Driver
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
        {/* Edit Driver Modal */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Driver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              value={newDriverName}
              onChange={(e) => setNewDriverName(e.target.value)}
              mb="2"
            />
            <Input
              placeholder="License Number"
              value={newDriverLicenseNumber}
              onChange={(e) => setNewDriverLicenseNumber(e.target.value)}
              mb="4"
            />
            <Input
              placeholder="Salary"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              mb="4"
            />
            <Button
              colorScheme="blue"
              onClick={handleEditDriver}
              disabled={!newDriverName || !newDriverLicenseNumber}
            >
              Save Changes
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Drivers;
