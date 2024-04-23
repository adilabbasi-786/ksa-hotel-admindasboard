import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
  useColorModeValue,
  ModalBody,
  Stack,
  Button,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

import Dropzone from "views/admin/profile/components/Dropzone";

const EmployeeForm = () => {
  const brandColor = useColorModeValue("brand.500", "white");

  return (
    <>
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
                <Flex justify="center" mx="auto" mb="12px">
                  <Text fontSize="xl" fontWeight="700" color={brandColor}>
                    Upload Files
                  </Text>
                </Flex>
                <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                  PNG, JPG and GIF files are allowed
                </Text>
              </Box>
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Employee name</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>passport number</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>passport expiry</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>iqama number</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>iqama expiry date</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>iqama image</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>passport image</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>
      </Box>
      <Button
        me="100%"
        mb="50px"
        w="100px"
        ml="1020px"
        minW="140px"
        mt="30px"
        // mt={{ base: "30px", "2xl": "auto" }}
        variant="brand"
        fontWeight="500"
      >
        submit
      </Button>
    </>
  );
};

export default EmployeeForm;
