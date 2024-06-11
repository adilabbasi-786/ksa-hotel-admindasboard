import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Input,
  Flex,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { URL } from "Utils";
import Card from "components/card/Card.js";
import DriversFullDetail from "./DriversFullDetail"; // Import the DriversFullDetail component

const Drivers = () => {
  const [driversData, setDriversData] = useState([]);
  const [newDriverName, setNewDriverName] = useState("");
  const [newDriverLicenseNumber, setNewDriverLicenseNumber] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [newPassportNumber, setNewPassportNumber] = useState("");
  const [newiqamaNumber, setNewiqamaNumber] = useState("");
  const [newdriverPhoneNumber, setNewdriverPhoneNumber] = useState("");
  const [newpassportExpiry, setNewpassportExpiry] = useState("");
  const [newiqamaExpiry, setNewiqamaExpiry] = useState("");
  const [iqamaPicture, setIqamaPicture] = useState(null);
  const [passportPicture, setPassportPicture] = useState(null);
  const [healthCard, sethealthCard] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [EmployeePicture, setEmployeePicture] = useState(null);
  const [selectedDriverDetails, setSelectedDriverDetails] = useState(null);
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
  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

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
      const iqamaPictureUpload = iqamaPicture
        ? await handleFileUpload(iqamaPicture)
        : null;
      const passportPictureUpload = passportPicture
        ? await handleFileUpload(passportPicture)
        : null;
      const healthCardUpload = healthCard
        ? await handleFileUpload(healthCard)
        : null;
      const employeepicutreUpload = EmployeePicture
        ? await handleFileUpload(EmployeePicture)
        : null;

      const response = await axios.post(
        `${URL}/api/driver-details`,
        {
          data: {
            driverName: newDriverName,
            driverLisenceNumber: newDriverLicenseNumber,
            salary: newSalary,
            PassportNumber: newPassportNumber,
            iqamaNumber: newiqamaNumber,
            driverPhoneNumber: newdriverPhoneNumber,
            passportExpiry: newpassportExpiry,
            iqamaExpiry: newiqamaExpiry,
            iqamaPicture: iqamaPictureUpload?.id,
            passportImage: passportPictureUpload?.id,
            healthCard: healthCardUpload?.id,
            EmployeePicture: employeepicutreUpload?.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDriversData([...driversData, response.data.data]);
      setNewDriverName("");
      setNewDriverLicenseNumber("");
      setNewSalary("");
      setNewPassportNumber("");
      setNewiqamaNumber("");
      setNewdriverPhoneNumber("");
      setNewpassportExpiry("");
      setNewiqamaExpiry("");
      setIqamaPicture(null);
      setPassportPicture(null);
      sethealthCard(null);
      setEmployeePicture(null);
      onAddModalClose();
    } catch (error) {
      console.error("Error adding new driver:", error);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post(`${URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data[0];
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
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
            PassportNumber: newPassportNumber,
            iqamaNumber: newiqamaNumber,
            driverPhoneNumber: newdriverPhoneNumber,
            passportExpiry: newpassportExpiry,
            iqamaExpiry: newiqamaExpiry,
            iqamaPicture: iqamaPicture,
            passportImage: passportPicture,
            healthCard: healthCard,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDriversData(
        driversData.map((driver) =>
          driver.id === selectedDriver.id ? response.data.data : driver
        )
      );

      setNewDriverName("");
      setNewDriverLicenseNumber("");
      setNewSalary("");
      setNewPassportNumber("");
      setNewiqamaNumber("");
      setNewdriverPhoneNumber("");
      setNewpassportExpiry("");
      setNewiqamaExpiry("");
      setIqamaPicture(null);
      setPassportPicture(null);
      sethealthCard(null);
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

  const openDetailModal = async (driver) => {
    setSelectedDriver(driver);
    try {
      const response = await axios.get(
        `${URL}/api/driver-details/${driver.id}?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedDriverDetails(response.data.data);
      onDetailModalOpen();
    } catch (error) {
      console.error("Error fetching driver details:", error);
    }
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
                  <Button
                    colorScheme="blue"
                    width="fit-content"
                    mr="2"
                    onClick={() => openDetailModal(driver)}
                  >
                    View Full details
                  </Button>
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
            <FormLabel>Driver Name</FormLabel>
            <Input
              placeholder="Name"
              value={newDriverName}
              onChange={(e) => setNewDriverName(e.target.value)}
              mb="2"
            />
            <FormLabel>Driver License number</FormLabel>
            <Input
              placeholder="License Number"
              value={newDriverLicenseNumber}
              onChange={(e) => setNewDriverLicenseNumber(e.target.value)}
              mb="4"
            />
            <FormLabel>Driver Salary</FormLabel>
            <Input
              type="number"
              placeholder="Salary"
              value={newSalary}
              onChange={(e) => setNewSalary(e.target.value)}
              mb="4"
            />
            <FormLabel>Passport Number</FormLabel>
            <Input
              placeholder="Passport Number"
              value={newPassportNumber}
              onChange={(e) => setNewPassportNumber(e.target.value)}
              mb="4"
            />
            <FormLabel>Iqama Number</FormLabel>
            <Input
              placeholder="Iqama Number"
              value={newiqamaNumber}
              onChange={(e) => setNewiqamaNumber(e.target.value)}
              mb="4"
            />
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="number"
              placeholder="Driver Phone Number"
              value={newdriverPhoneNumber}
              onChange={(e) => setNewdriverPhoneNumber(e.target.value)}
              mb="4"
            />
            <FormLabel>Passport Expiry Date</FormLabel>
            <Input
              type="date"
              placeholder="Passport Expiry"
              value={newpassportExpiry}
              onChange={(e) => setNewpassportExpiry(e.target.value)}
              mb="4"
            />
            <FormLabel>Iqama Expiry Date</FormLabel>
            <Input
              type="date"
              placeholder="Iqama Expiry"
              value={newiqamaExpiry}
              onChange={(e) => setNewiqamaExpiry(e.target.value)}
              mb="4"
            />
            <FormLabel>Driver profile Picture</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setEmployeePicture(e.target.files[0])}
              mb="4"
            />
            <FormLabel>Iqama Picture</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setIqamaPicture(e.target.files[0])}
              mb="4"
            />
            <FormLabel>Passport Picture</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setPassportPicture(e.target.files[0])}
              mb="4"
            />
            <FormLabel>Health card Picture</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => sethealthCard(e.target.files[0])}
              mb="4"
            />
            <Button
              colorScheme="blue"
              onClick={handleAddDriver}
              disabled={
                !newDriverName ||
                !newDriverLicenseNumber ||
                !newSalary ||
                !newPassportNumber ||
                !newiqamaNumber ||
                !newdriverPhoneNumber ||
                !newpassportExpiry ||
                !newiqamaExpiry
              }
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

      <Modal isOpen={isDetailModalOpen} onClose={onDetailModalClose}>
        {/* Driver Full Details Modal */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Driver Full Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedDriverDetails && (
              <DriversFullDetail driver={selectedDriverDetails} />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onDetailModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Drivers;
