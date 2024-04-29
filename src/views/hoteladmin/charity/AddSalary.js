import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

const AddSalary = ({ isOpen, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleAddItem = () => {
    const newItem = { itemName, quantity, price, category };
    onAddItem(newItem);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Employee</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Employee Name</FormLabel>
              <Input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Total Salary</FormLabel>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Advance</FormLabel>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Deduction</FormLabel>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Total Paid Salary</FormLabel>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddItem}>
            Add Item
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSalary;
