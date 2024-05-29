import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, VStack, useToast } from "@chakra-ui/react";
import { URL } from "Utils";
import { useUnreadNotifications } from "UnreadNotificationsContext";

const Index = () => {
  const toast = useToast();
  const { notifications, markAsRead } = useUnreadNotifications();
  const [localNotifications, setLocalNotifications] = useState([]);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const handleNotificationClick = async (id, read) => {
    if (read) {
      return;
    }
    try {
      await markAsRead(id);
      setLocalNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                attributes: { ...notification.attributes, read: true },
              }
            : notification
        )
      );
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
        {localNotifications.map((notification) => (
          <Box
            key={notification.id}
            w="100%"
            p={4}
            bg={notification.attributes.read ? "white" : "gray.200"}
            borderRadius="md"
            cursor="pointer"
            onClick={() =>
              handleNotificationClick(
                notification.id,
                notification.attributes.read
              )
            }
          >
            <Text>{notification.attributes.message}</Text>
            {console.log("notification.attributes.message", notification)}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;
