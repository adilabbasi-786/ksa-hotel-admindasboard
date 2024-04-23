import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

import Dropzone from "views/admin/expanses/components/Dropzone";

const EmployeeForm = ({ isOpen, onClose }) => {
  const brandColor = useColorModeValue("brand.500", "white");

  return (
    <Box p={10} bg="white">
      <FormControl width="300px" height="280px" mt={4} mb={-10}>
        <FormLabel>Employee picture</FormLabel>
        <Dropzone
          w={{ base: "100%", "2xl": "268px" }}
          me="36px"
          maxH={{ base: "100%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "100%", lg: "50%", "2xl": "100%" }}
          content={
            <Box>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Text
                fontSize="xl"
                fontWeight="700"
                color={brandColor}
                textAlign="center"
              >
                Upload Files
              </Text>
              <Text
                fontSize="sm"
                fontWeight="500"
                color="secondaryGray.500"
                textAlign="center"
              >
                PNG, JPG and GIF files are allowed
              </Text>
            </Box>
          }
        />
      </FormControl>
      <Flex direction="row">
        <FormControl flex="1" mr={4}>
          <FormLabel>Employee name</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
        <FormControl flex="1">
          <FormLabel>passport Number</FormLabel>
          <Input placeholder="Passport Number" />
        </FormControl>
      </Flex>
      <Flex direction="row">
        <FormControl mr={4}>
          <FormLabel>Passport Expiry</FormLabel>
          <Input placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel>Passport picture</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
      </Flex>
      <Flex direction="row">
        <FormControl mr={4}>
          <FormLabel>iqama number</FormLabel>
          <Input placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel>iqama Expiry</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
      </Flex>
      <Flex direction="row">
        <FormControl mr={4}>
          <FormLabel>iqama picture</FormLabel>
          <Input placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel>iqama Expiry</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
      </Flex>

      <Button colorScheme="blue" onClick={onClose} mt={4}>
        Close
      </Button>
      <Button variant="brand" fontWeight="500" ml={4} mt={4}>
        Submit
      </Button>
    </Box>
  );
};

export default EmployeeForm;
