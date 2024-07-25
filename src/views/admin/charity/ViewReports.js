import React from "react";
import { Button } from "@chakra-ui/react";

const ViewReports = ({ onOpen }) => {
  return (
    <Button onClick={onOpen} colorScheme="teal" size="md" ml="4">
      View Reports
    </Button>
  );
};

export default ViewReports;
