import React, { createContext, useContext, useEffect, useState } from "react";
import { connection, startConnection } from "../../../featuers/Notifications/NotificationHub";
import { toast } from "sonner";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: Date;
}

type NotificationContextType = {
  notifications: Notification[];
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    startConnection();

    connection.on("ReceiveNotification", (title: string, message: string) => {
      const newNote = { id: Date.now().toString(), title, message, time: new Date() };
      setNotifications((prev) => [newNote, ...prev]);

      // ✅ Show Toast
      toast(`${title}: ${message}`);

      // ✅ Browser notification
      if (Notification.permission === "granted") {
        new Notification(title, { body: message });
      }
    });

    Notification.requestPermission();

    return () => {
      connection.off("ReceiveNotification");
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
