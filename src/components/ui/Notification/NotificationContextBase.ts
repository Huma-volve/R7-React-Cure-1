import { createContext } from "react";

export interface Notification {
  id: number;
  content: string;
  applicationUserId: string;
  types: number;
  isRead: boolean;
  createdAt: string;
  title?: string;
}

type NotificationContextType = {
  notifications: Notification[];
  markNotificationAsRead: (id: number) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);


