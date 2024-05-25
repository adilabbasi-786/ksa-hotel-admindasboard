import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export function SidebarLinks(props) {
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes, onClose } = props;

  const activeRoute = (routeName) => {
    return location.pathname === routeName;
  };

  const createLinks = (routes) => {
    console.log("Current location:", location.pathname);
    console.log("Routes:", routes);
    return routes.map((route, index) => {
      if (route.category) {
        return (
          <React.Fragment key={index}>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight="bold"
              mx="auto"
              ps={{ sm: "10px", xl: "16px" }}
              pt="18px"
              pb="12px"
            >
              {route.name}
            </Text>
            {createLinks(route.items)}
          </React.Fragment>
        );
      } else if (
        route.layout === "/admin" ||
        route.layout === "/hotel" ||
        route.layout === "/rtl"
      ) {
        const fullPath = route.layout + route.path;
        return (
          <NavLink key={index} to={fullPath} onClick={onClose}>
            {route.icon ? (
              <Box>
                <HStack
                  spacing={activeRoute(fullPath) ? "22px" : "26px"}
                  py="5px"
                  ps="10px"
                >
                  <Flex w="100%" alignItems="center" justifyContent="center">
                    <Box
                      color={activeRoute(fullPath) ? activeIcon : textColor}
                      me="18px"
                    >
                      {route.icon}
                    </Box>
                    <Text
                      me="auto"
                      color={activeRoute(fullPath) ? activeColor : textColor}
                      fontWeight={activeRoute(fullPath) ? "bold" : "normal"}
                    >
                      {route.name}
                    </Text>
                  </Flex>
                  <Box
                    h="36px"
                    w="4px"
                    bg={activeRoute(fullPath) ? brandColor : "transparent"}
                    borderRadius="5px"
                  />
                </HStack>
              </Box>
            ) : (
              <Box>
                <HStack
                  spacing={activeRoute(fullPath) ? "22px" : "26px"}
                  py="5px"
                  ps="10px"
                >
                  <Text
                    me="auto"
                    color={activeRoute(fullPath) ? activeColor : inactiveColor}
                    fontWeight={activeRoute(fullPath) ? "bold" : "normal"}
                  >
                    {route.name}
                  </Text>
                  <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                </HStack>
              </Box>
            )}
          </NavLink>
        );
      }
    });
  };

  return createLinks(routes);
}

export default SidebarLinks;
