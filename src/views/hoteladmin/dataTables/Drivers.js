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
  Spinner,
  useToast,
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
  const [EmployeePicture, setEmployeePicture] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedDriverDetails, setSelectedDriverDetails] = useState(null);

  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

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
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${URL}/api/driver-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDriversData(response.data.data);
    } catch (error) {
      console.error("Error fetching drivers data:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    fetchDrivers();
  }, []);

  const handleFileChange = (e, setState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDriver = async () => {
    if (
      !newDriverName ||
      !newDriverLicenseNumber ||
      !newSalary ||
      !newPassportNumber ||
      !newiqamaNumber ||
      !newdriverPhoneNumber ||
      !newpassportExpiry ||
      !newiqamaExpiry ||
      !iqamaPicture ||
      !passportPicture ||
      !healthCard ||
      !EmployeePicture
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const newDriver = {
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
        EmployeePicture: EmployeePicture,
      };

      const response = await axios.post(
        `${URL}/api/driver-details`,
        { data: newDriver },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const AddednewDriver = { ...response.data.data };
      setDriversData((prevDriversData) => [...prevDriversData, AddednewDriver]);

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
      toast({
        title: "Driver created successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding new driver:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openDetailModal = async (driver) => {
    setSelectedDriver(driver);
    setSelectedDriverDetails(null);
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
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Drivers Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {driversData.map((driver, index) => (
              <Card key={index} mb={{ base: "0px", "2xl": "20px" }}>
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
            {error && <Text color="red.500">{error}</Text>}
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
            <FormLabel>Driver Phone Number</FormLabel>
            <Input
              placeholder="Phone Number"
              value={newdriverPhoneNumber}
              onChange={(e) => setNewdriverPhoneNumber(e.target.value)}
              mb="4"
            />
            <FormLabel>Passport Expiry</FormLabel>
            <Input
              type="date"
              placeholder="Passport Expiry"
              value={newpassportExpiry}
              onChange={(e) => setNewpassportExpiry(e.target.value)}
              mb="4"
            />
            <FormLabel>Iqama Expiry</FormLabel>
            <Input
              type="date"
              placeholder="Iqama Expiry"
              value={newiqamaExpiry}
              onChange={(e) => setNewiqamaExpiry(e.target.value)}
              mb="4"
            />
            <FormLabel>Iqama Picture</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, setIqamaPicture)}
              mb="4"
            />
            <FormLabel>Passport Picture</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, setPassportPicture)}
              mb="4"
            />
            <FormLabel>Health Card</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, sethealthCard)}
              mb="4"
            />
            <FormLabel>Employee Picture</FormLabel>
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, setEmployeePicture)}
              mb="4"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleAddDriver}
              isLoading={isLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {selectedDriverDetails && (
        <DriversFullDetail
          fetchDrivers={fetchDrivers}
          driver={selectedDriverDetails}
          isOpen={isDetailModalOpen}
          onClose={onDetailModalClose}
        />
      )}
    </>
  );
};

export default Drivers;
