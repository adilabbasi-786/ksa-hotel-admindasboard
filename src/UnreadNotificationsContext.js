import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "Utils";

// Create Context
const UnreadNotificationsContext = createContext();

// Provider Component
export const UnreadNotificationsProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`${URL}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const unreadNotifications = response.data.data.filter(
          (notification) => !notification.attributes.read
        );
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
  }, [token]);

  return (
    <UnreadNotificationsContext.Provider
      value={{ unreadCount, setUnreadCount }}
    >
      {children}
    </UnreadNotificationsContext.Provider>
  );
};

// Custom Hook to use the Unread Notifications Context
export const useUnreadNotifications = () =>
  useContext(UnreadNotificationsContext);
