import React, { createContext, useContext, useEffect, useState } from "react";
import { createNotificationConnection } from "../../../featuers/Notifications/NotificationHub";
import { toast } from "sonner";
import {
  getNotificationsByUser,
  markNotificationAsRead,
} from "../../../featuers/apis/notificationApi"; // ← حسب مكان ملفك

export interface Notification {
  id: string | number;
  title: string;
  message: string;
  time: string;
  type?: "upcoming" | "completed" | "cancelled";
  isRead?: boolean;
}

type NotificationContextType = {
  notifications: Notification[];
  markNotificationAsRead: (id: string | number) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const connection = createNotificationConnection(token);

    connection
      .start()
      .then(() => console.log("✅ SignalR Connected"))
      .catch((err) => console.error("❌ SignalR Connection Failed", err));

    // جلب الإشعارات من الـ API أول مرة
    getNotificationsByUser()
      .then((res) => setNotifications(res.data || []))
      .catch((err) => console.error("❌ Failed to load notifications", err));

    // استقبال إشعار جديد من SignalR
    connection.on("ReceiveNotification", (title: string, message: string) => {
      const newNote: Notification = {
        id: Date.now(),
        title,
        message,
        time: new Date().toISOString(),
        type: "upcoming",
        isRead: false,
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

 const handleMarkNotificationAsRead = async (id: string | number) => {
  try {
    await markNotificationAsRead(Number(id)); // 👈 نحول id لرقم
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
