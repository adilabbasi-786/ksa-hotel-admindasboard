import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdOutlineHotel,
  MdBarChart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/hoteladmin/default";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/hoteladmin/dataTables";
import Expanse from "views/hoteladmin/expanses";
import Salary from "views/hoteladmin/salaries";
import Charity from "views/hoteladmin/charity";
import Rents from "views/hoteladmin/hotelrentkafalat";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signout";

const hotelroutes = [
  {
    name: "Hotel Dashboard",
    layout: "/hotel",
    path: "/dashboard",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },

  {
    name: "Employees",
    layout: "/hotel",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/emp-table",
    component: DataTables,
  },
  {
    name: "Daily Register",
    layout: "/hotel",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/register",
    component: Expanse,
  },
  {
    name: "Salaries",
    layout: "/hotel",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/salary",
    component: Salary,
  },
  {
    name: "Charity",
    layout: "/hotel",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/charity",
    component: Charity,
  },
  {
    name: "Hotel Rents/Kafalat",
    layout: "/hotel",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: "/rents",
    component: Rents,
  },

  {
    name: "signout",
    layout: "/hotel",
    path: "/singout",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
];

export default hotelroutes;
