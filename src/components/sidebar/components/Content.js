import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Text, Flex } from "@chakra-ui/react";

const Content = ({ routes, onClose }) => {
  return (
    <Box>
      {routes.map((route, index) => (
        <NavLink
          key={index}
          to={`${route.layout}${route.path}`}
          onClick={onClose}
        >
          <Flex align="center" p="4">
            {route.icon}
            <Text ml="4">{route.name}</Text>
          </Flex>
        </NavLink>
      ))}
    </Box>
  );
};

export default Content;
