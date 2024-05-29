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
        setNotifications(response.data.data);
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
