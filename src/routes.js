import React from "react";
import { Icon, Box, Badge } from "@chakra-ui/react";
import {
  MdBarChart,
  MdHome,
  MdAttachMoney,
  MdOutlineHotel,
  MdAppRegistration,
  MdLogout,
  MdDoorbell,
} from "react-icons/md";

// Import views
import MainDashboard from "views/admin/default";
import Hotel from "views/admin/hotel";
import Expanses from "views/admin/expanses";
import DataTables from "views/admin/dataTables";
import Salaries from "views/admin/salaries";
import Profits from "views/admin/profits";
import Kafalat from "views/admin/hotelrentkafalat";
import Charity from "views/admin/charity";
import Notifications from "views/admin/notifications";
import SignInCentered from "views/auth/signout";
import { useUnreadNotifications } from "UnreadNotificationsContext";

const Routes = () => {
  const { unreadCount } = useUnreadNotifications();
  return [
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
        <Icon
          as={MdAppRegistration}
          width="20px"
          height="20px"
          color="inherit"
        />
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
      name: "Notifications",
      layout: "/admin",
      path: "/notifications",
      icon: (
        <Box position="relative">
          <Icon as={MdDoorbell} width="20px" height="20px" color="inherit" />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-1px"
              right="-150px"
              borderRadius="full"
              bg="red.500"
              color="white"
              fontSize="xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      ),
      component: Notifications,
    },
    {
      name: "signout",
      layout: "/admin",
      path: "/signout",
      icon: <Icon as={MdLogout} width="20px" height="20px" color="inherit" />,
      component: SignInCentered,
    },
  ];
};

export default Routes;
