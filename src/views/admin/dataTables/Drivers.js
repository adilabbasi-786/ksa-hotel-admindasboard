import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const Drivers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const driversData = [
    { name: "adil", licenseNumber: "DL123456" },
    { name: "Driver 2", licenseNumber: "DL654321" },
    { name: "Driver 3", licenseNumber: "DL987654" },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        colorScheme="blue"
        width="fit-content"
        mt="10px"
        alignSelf="flex-end"
        onClick={handleOpenModal}
      >
        View Drivers
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Drivers Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {driversData.map((driver, index) => (
              <div key={index}>
                <p>Name: {driver.name}</p>
                <p>License Number: {driver.licenseNumber}</p>
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Drivers;
