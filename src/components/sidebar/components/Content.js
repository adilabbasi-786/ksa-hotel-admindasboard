import React from "react";
import { NavLink } from "react-router-dom";
import Brand from "components/sidebar/components/Brand";
import { Box, Flex, Text } from "@chakra-ui/react";
const Content = ({ routes, onClose }) => {
  console.log("Content routes:", routes);
  return (
    <Box>
      <Brand />
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
