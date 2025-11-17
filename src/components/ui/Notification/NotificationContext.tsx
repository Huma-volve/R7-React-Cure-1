import React, { useEffect, useState } from "react";
import { createNotificationConnection } from "../../../featuers/Notifications/NotificationHub";
import { toast } from "sonner";
import {
  getNotificationsByUser,
  markNotificationAsRead,
  type NotificationType,
} from "../../../featuers/apis/notificationApi"; 
import { NotificationContext, type Notification } from "./NotificationContextBase";

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("🔄 Fetching notifications...");
        const res = await getNotificationsByUser();
        console.log("📬 Notifications received:", res);
        const normalized = (res || []).map(mapToNotification);
        console.log("✅ Normalized notifications:", normalized);
        setNotifications(normalized);
      } catch (err) {
        console.error("❌ Failed to load notifications", err);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  // Setup SignalR connection separately
  useEffect(() => {
    const token = localStorage.getItem("token") || import.meta.env.VITE_API_TOKEN;
    if (!token) {
      console.log("⚠️ No token in localStorage, skipping SignalR connection");
      return;
    }

    const connection = createNotificationConnection(token);

    connection
      .start()
      .then(() => console.log("✅ SignalR Connected"))
      .catch((err) => console.error("❌ SignalR Connection Failed", err));

    // استقبال إشعار جديد من SignalR
    connection.on("ReceiveNotification", (title: string, message: string) => {
      const newNote: Notification = {
        id: Date.now(),
        content: message,
        title,
        applicationUserId: "",
        types: 0,
        isRead: false,
        createdAt: new Date().toISOString(),
      };

      setNotifications((prev) => [newNote, ...prev]);
      toast(`${title}: ${message}`);

      if (Notification.permission === "granted") {
        new Notification(title, { body: message });
      }
    });

    Notification.requestPermission();

    return () => {
      connection.stop();
      connection.off("ReceiveNotification");
    };
  }, []);

  const handleMarkNotificationAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, markNotificationAsRead: handleMarkNotificationAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const mapToNotification = (apiNote: NotificationType): Notification => ({
  id: apiNote.id,
  content: apiNote.content,
  applicationUserId: apiNote.applicationUserId,
  types: apiNote.types,
  isRead: apiNote.isRead,
  createdAt: apiNote.createdAt,
  title: apiNote.title ?? apiNote.content,
});
