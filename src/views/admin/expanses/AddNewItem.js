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
  Text,
} from "@chakra-ui/react";
import axios from "axios";
const AddNewItem = ({
  isOpen,
  onClose,
  onAddItem,
  selectedHotel,
  selectedDate,
  updateTableData,
  getData,
}) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleAddItem = () => {
    const newItem = {
      itemName,
      quantity,
      price,
      category,
      hotel_name: selectedHotel,
      date: selectedDate,
    };
    axios
      .post(
        "http://localhost:1337/api/daily-registers",
        {
          data: newItem,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Item added successfully!");
        onAddItem(newItem);
        // updateTableData(onAddItem);
        onClose();

        getData();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Item Name</FormLabel>
              <Input
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={category}
                placeholder="Select category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="kitchen">Kitchen</option>

                <option value="others">Others</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormControl>
          </VStack>
          {successMessage && (
            <Text color="green.500" fontSize="sm">
              {successMessage}
            </Text>
          )}
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

export default AddNewItem;
