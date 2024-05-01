import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Link } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  let url = "/hotel/dashboard";
  let text = "HOTEL";

  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");
  let mainText = useColorModeValue("navy.700", "white");
  if (window.location.href.includes("admin")) {
    url = "/admin/dashboard";
    text = "ADMIN";
  }
  return (
    <Flex align="center" direction="column">
      <Link
        color={mainText}
        href={url}
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
        {text} DASHBOARD
      </Link>
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
