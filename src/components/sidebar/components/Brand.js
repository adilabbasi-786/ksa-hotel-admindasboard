import React, { useEffect, useState } from "react";
import { Flex, useColorModeValue, Link } from "@chakra-ui/react";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  const [dashboardInfo, setDashboardInfo] = useState({
    url: "/hotel/dashboard",
    text: "HOTEL",
  });

  // Chakra color mode
  const logoColor = useColorModeValue("navy.700", "white");
  const mainText = useColorModeValue("navy.700", "white");

  useEffect(() => {
    const path = window.location.pathname;
    console.log("windowref", window.location.href);
    if (path.includes("/admin")) {
      setDashboardInfo({ url: "/admin/dashboard", text: "ADMIN" });
    } else {
      setDashboardInfo({ url: "/hotel/dashboard", text: "HOTEL" });
    }
  }, []);

  return (
    <Flex align="center" direction="column">
      <Link
        color={mainText}
        href={dashboardInfo.url}
        bg="inherit"
        borderRadius="inherit"
        fontWeight="bold"
        fontSize="24px"
        _hover={{ color: mainText }}
        _active={{
          bg: "inherit",
          transform: "none",
          borderColor: "transparent",
        }}
        _focus={{
          boxShadow: "none",
        }}
      >
        {dashboardInfo.text} DASHBOARD
      </Link>
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
