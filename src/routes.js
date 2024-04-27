import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdAttachMoney,
  MdOutlineHotel,
  MdAppRegistration,
  MdLogout,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Hotel from "views/admin/hotel";
import NFTMarketplace from "views/admin/marketplace";
import Expanses from "views/admin/expanses";
import DataTables from "views/admin/dataTables";
import Salaries from "views/admin/salaries";
import Profits from "views/admin/profits";
import Kafalat from "views/admin/hotelrentkafalat";
import Charity from "views/admin/charity";

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
    name: "Daily Register",
    layout: "/admin",
    path: "/expanse",
    icon: (
      <Icon as={MdAppRegistration} width="20px" height="20px" color="inherit" />
    ),
    component: Expanses,
  },

  {
    name: "Salaries",
    layout: "/admin",
    path: "/salaries",
    icon: (
      <Icon as={MdAttachMoney} width="20px" height="20px" color="inherit" />
    ),
    component: Salaries,
  },
  {
    name: "Profits",
    layout: "/admin",
    path: "/profit",
    icon: (
      <Icon as={MdAttachMoney} width="20px" height="20px" color="inherit" />
    ),
    component: Profits,
  },
  {
    name: "Hotel Rents/Kafalat",
    layout: "/admin",
    path: "/kafalat",
    icon: (
      <Icon as={MdAttachMoney} width="20px" height="20px" color="inherit" />
    ),
    component: Kafalat,
  },
  {
    name: "Charity",
    layout: "/admin",
    path: "/charity",
    icon: (
      <Icon as={MdAttachMoney} width="20px" height="20px" color="inherit" />
    ),
    component: Charity,
  },
  {
    name: "signout",
    layout: "/admin",
    path: "/singout",
    icon: <Icon as={MdLogout} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
];

export default routes;
