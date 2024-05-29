import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, VStack, useToast } from "@chakra-ui/react";
import { URL } from "Utils";

const Index = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${URL}/api/notifications?sort=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(response.data.data);
        const unreadNotifications = response.data.data.filter(
          (notification) => !notification.attributes.read
        );
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast({
          title: "Error fetching notifications.",
          description: "There was an error fetching notifications.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchNotifications();
  }, [token, toast]);

  const handleNotificationClick = async (id) => {
    try {
      await axios.put(
        `${URL}/api/notifications/${id}`,
        { data: { read: true } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                attributes: { ...notification.attributes, read: true },
              }
            : notification
        )
      );
      setUnreadCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error updating notification:", error);
      toast({
        title: "Error updating notification.",
        description: "There was an error updating the notification.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <h2>All Notifications</h2>
      <VStack spacing={4} align="start">
        {notifications.map((notification) => (
          <Box
            key={notification.id}
            w="100%"
            p={4}
            bg={notification.attributes.read ? "white" : "gray.200"}
            borderRadius="md"
            cursor="pointer"
            onClick={() => handleNotificationClick(notification.id)}
          >
            <Text>{notification.attributes.message}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
