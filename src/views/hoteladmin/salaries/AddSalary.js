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
} from "@chakra-ui/react";

const AddSalary = ({ isOpen, onClose, onAddItem, defaultValues }) => {
  const [deduction, setDeduction] = useState("");
  const [totalPaidSalary, setTotalPaidSalary] = useState("");

  // Function to handle adding the salary
  const handleAddItem = () => {
    const newItem = {
      employeename: defaultValues.employeename,
      totalsalary: defaultValues.totalsalary,
      advance: defaultValues.advance,
      deduction,
      paidsalary: totalPaidSalary,
    };
    onAddItem(newItem);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Salary</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Employee Name</FormLabel>
              <Input value={defaultValues.employeename} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Total Salary</FormLabel>
              <Input value={defaultValues.totalsalary} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Advance</FormLabel>
              <Input value={defaultValues.advance} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Deduction</FormLabel>
              <Input
                value={deduction}
                onChange={(e) => setDeduction(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Total Paid Salary</FormLabel>
              <Input
                value={totalPaidSalary}
                onChange={(e) => setTotalPaidSalary(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddItem}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddSalary;
