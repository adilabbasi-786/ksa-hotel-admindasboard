import React, { useEffect, useState } from "react";
import { Box, Text, VStack, useToast } from "@chakra-ui/react";
import { useUnreadNotifications } from "UnreadNotificationsContext";
import Pagination from "./Pagination";

const Index = () => {
  const toast = useToast();
  const { notifications, markAsRead, currentPage, setCurrentPage, totalPages } =
    useUnreadNotifications();
  const [localNotifications, setLocalNotifications] = useState([]);

  useEffect(() => {
    // Sort notifications based on timestamp in descending order
    const sortedNotifications = notifications.sort((a, b) => {
      return (
        new Date(b.attributes.timestamp) - new Date(a.attributes.timestamp)
      );
    });

    // Separate unread and read notifications
    const unreadNotifications = sortedNotifications.filter(
      (notification) => !notification.attributes.read
    );
    const readNotifications = sortedNotifications.filter(
      (notification) => notification.attributes.read
    );

    // Combine unread and read notifications, with unread ones first
    const combinedNotifications = [
      ...unreadNotifications,
      ...readNotifications,
    ];

    setLocalNotifications(combinedNotifications);
  }, [notifications]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
      {localNotifications.length === 0 ? (
        <Text fontWeight="bold" fontSize="xl" mt="100px" ml="300px">
          No notifications
        </Text>
      ) : (
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
              display="flex"
              justifyContent="space-between"
            >
              <Text>{notification.attributes.message}</Text>
              <Text>
                {new Date(notification.attributes.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default Index;
