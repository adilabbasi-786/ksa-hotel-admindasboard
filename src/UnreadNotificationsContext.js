import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "Utils";

// Create Context
const UnreadNotificationsContext = createContext();

// Provider Component
export const UnreadNotificationsProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`${URL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort notifications based on timestamp in descending order
        const sortedNotifications = response.data.data.sort((a, b) => {
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

        setNotifications(combinedNotifications);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
  }, [token]);

  const markAsRead = async (id) => {
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
    }
  };

  return (
    <UnreadNotificationsContext.Provider
      value={{ unreadCount, setUnreadCount, notifications, markAsRead }}
    >
      {children}
    </UnreadNotificationsContext.Provider>
  );
};

// Custom Hook to use the Unread Notifications Context
export const useUnreadNotifications = () =>
  useContext(UnreadNotificationsContext);
