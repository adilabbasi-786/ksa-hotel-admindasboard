import React, { useState } from "react";
import {
  Portal,
  Box,
  useDisclosure,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import Sidebar from "components/sidebar/Sidebar.js";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";
import MainDashboard from "./MainDashboard";

import { Icon } from "@chakra-ui/react";

import { SidebarContext } from "contexts/SidebarContext";
const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin-dashboard",
    path: "/",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
];
const AdminDashboard = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <Box>
      <Box>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar routes={routes} display="none" />
        </SidebarContext.Provider>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
