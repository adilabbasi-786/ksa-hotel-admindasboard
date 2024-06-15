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
import { URL } from "Utils";

const AddNewItem = ({
  isOpen,
  onClose,
  onAddItem,
  selectedHotel,
  selectedDate,
  getData,
}) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleAddItem = () => {
    // Validation logic
    if (!itemName || !quantity || !price || !category) {
      setErrorMessage("All fields are required.");
      return;
    }
    setIsLoading(true);

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
        `${URL}/api/daily-registers`,
        {
          data: newItem,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Item added successfully!");
        onAddItem(newItem);
        onClose();
        getData();
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to add item. Please try again.");
      });
    setIsLoading(false);
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
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
          </VStack>
          {errorMessage && (
            <Text color="red.500" fontSize="sm">
              {errorMessage}
            </Text>
          )}
          {successMessage && (
            <Text color="green.500" fontSize="sm">
              {successMessage}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleAddItem}
            isLoading={isLoading}
          >
            Add Item
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddNewItem;
