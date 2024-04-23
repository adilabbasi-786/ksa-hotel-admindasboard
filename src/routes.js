import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdOutlineHotel,
  MdLogout,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Hotel from "views/admin/hotel";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signout";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/dashboard",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "Hotels",
    layout: "/admin",

    path: "/hotel",
    icon: (
      <Icon as={MdOutlineHotel} width="20px" height="20px" color="inherit" />
    ),
    component: Hotel,
  },

  {
    name: "Employees Data",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/emp-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "signout",
    layout: "/admin",
    path: "/singout",
    icon: <Icon as={MdLogout} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },

  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: RTL,
  },
];

export default routes;
