import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Link } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");
  let mainText = useColorModeValue("navy.700", "white");

  return (
    <Flex align="center" direction="column">
      <Link
        color={mainText}
        href="/admin/dashboard"
        bg="inherit"
        borderRadius="inherit"
        fontWeight="bold"
        fontSize="24px"
        _hover={{ color: { mainText } }}
        _active={{
          bg: "inherit",
          transform: "none",
          borderColor: "transparent",
        }}
        _focus={{
          boxShadow: "none",
        }}
      >
        ADMIN DASHBOARD
      </Link>
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
