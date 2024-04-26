import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Stack,
} from "@chakra-ui/react";
import { Card } from "@material-ui/core";
const HotelForm = () => {
  return (
    <Box p={4} bg="white">
      <FormControl>
        <FormLabel>Hotel name</FormLabel>
        <Input placeholder="First name" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Location</FormLabel>
        <Input placeholder="Last name" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Hotel Rent</FormLabel>
        <Input placeholder="Last name" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Manager Name</FormLabel>
        <Input placeholder="Last name" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Manager User Name</FormLabel>
        <Input placeholder="Last name" />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Manager Password</FormLabel>
        <Input placeholder="Last name" />
      </FormControl>
      <Button
        colorScheme="blue"
        width="fit-content"
        mt="10px"
        alignSelf="flex-end"
      >
        Submit
      </Button>
    </Box>
    // <Card
    //   align="center"
    //   direction="column"
    //   w="100%"
    //   maxW="max-content"
    //   p="20px 15px"
    //   h="max-content"
    // >
    //   <Stack spacing={3}>
    //     <Input placeholder="extra small size" size="xs" borderRadius="10px" />
    //     <Input placeholder="small size" size="sm" borderRadius="12px" />
    //     <Input placeholder="medium size" size="md" borderRadius="14px" />
    //     <Input placeholder="large size" size="lg" borderRadius="16px" />
    //   </Stack>
    // </Card>
  );
};

export default HotelForm;
