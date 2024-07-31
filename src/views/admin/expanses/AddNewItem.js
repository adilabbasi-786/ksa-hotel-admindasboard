import React, { useState, useEffect } from "react";
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

  const handleAddItem = async () => {
    // Validation logic
    if (!itemName || !quantity || !price || !category) {
      setErrorMessage("All fields are required.");
      return;
    }

    const dailyExpanse = price * quantity;

    setIsLoading(true);

    try {
      const newItem = {
        itemName,
        quantity,
        price,
        category,
        hotel_name: selectedHotel,
        date: selectedDate,
      };

      // Add the new item to daily-register
      await axios.post(
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
      );

      // Fetch the existing daily total expanse for the selected date
      const totalExpanseResponse = await axios.get(
        `${URL}/api/daily-total-expanses`,
        {
          params: {
            filters: { date: selectedDate, hotel_name: selectedHotel },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const totalExpanseData = totalExpanseResponse.data.data;
      if (totalExpanseData.length > 0) {
        // Update the existing total daily expanse
        const existingRecordId = totalExpanseData[0].id;
        const existingTotalExpanse =
          totalExpanseData[0].attributes.totalexpanse;

        await axios.put(
          `${URL}/api/daily-total-expanses/${existingRecordId}`,
          {
            data: {
              totalexpanse: existingTotalExpanse + dailyExpanse,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create a new total daily expanse record
        await axios.post(
          `${URL}/api/daily-total-expanses`,
          {
            data: {
              date: selectedDate,
              totalexpanse: dailyExpanse,
              hotel_name: selectedHotel,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert("Item added successfully");
      onAddItem(newItem);
      setItemName("");
      setPrice("");
      setQuantity("");
      onClose();
      getData();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add item. Please try again.");
    }

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
