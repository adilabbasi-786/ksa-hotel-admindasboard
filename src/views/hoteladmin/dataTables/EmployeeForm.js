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
  useBreakpointValue,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

import Dropzone from "views/admin/expanses/components/Dropzone";

const EmployeeForm = ({ isOpen, onClose }) => {
  const brandColor = useColorModeValue("brand.500", "white");
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={10} bg="white">
      <FormControl width="300px" height="280px" mt={4} mb={-10}>
        <FormLabel>Employee picture</FormLabel>
        <Dropzone
          w={{ base: "70%", "2xl": "268px" }}
          me="36px"
          mt="20px"
          mb="20px"
          maxH={{ base: "70%", lg: "30%", "2xl": "50%" }}
          minH={{ base: "70%", lg: "30%", "2xl": "50%" }}
          content={
            <Box>
              <Icon as={MdUpload} w="80px" h="40px" color={brandColor} />
              <Text
                // fontSize="xl"
                fontWeight="700"
                color={brandColor}
                textAlign="center"
                fontSize="15px"
              >
                Upload Files
              </Text>
              <Text
                fontSize="10px"
                fontWeight="100"
                color="secondaryGray.500"
                textAlign="center"
              >
                PNG, JPG and GIF files are allowed
              </Text>
            </Box>
          }
        />
      </FormControl>
      <Flex direction={isMobile ? "column" : "row"}>
        <FormControl flex="1" mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
          <FormLabel>Employee name</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
        {!isMobile && (
          <FormControl flex="1">
            <FormLabel>passport Number</FormLabel>
            <Input placeholder="Passport Number" />
          </FormControl>
        )}
      </Flex>
      <Flex direction={isMobile ? "column" : "row"}>
        <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
          <FormLabel>Passport Expiry</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
        {!isMobile && (
          <FormControl>
            <FormLabel>Passport picture</FormLabel>
            <Input placeholder="First name" />
          </FormControl>
        )}
      </Flex>
      <Flex direction={isMobile ? "column" : "row"}>
        <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
          <FormLabel>iqama number</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
        {!isMobile && (
          <FormControl>
            <FormLabel>iqama Expiry</FormLabel>
            <Input placeholder="First name" />
          </FormControl>
        )}
      </Flex>
      <Flex direction={isMobile ? "column" : "row"}>
        <FormControl mr={!isMobile && 4} mb={isMobile ? 4 : 0}>
          <FormLabel>iqama picture</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
        {!isMobile && (
          <FormControl>
            <FormLabel>iqama Expiry</FormLabel>
            <Input placeholder="First name" />
          </FormControl>
        )}
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
