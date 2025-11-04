import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "upcoming" | "completed" | "cancelled";
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // SignalR Fetch API
    // e.g.,
    // setNotifications([
    //   {
    //     id: 1,
    //     title: "Upcoming Appointment",
    //     message: "Reminder: You have an appointment at 5 PM.",
    //     time: "1h",
    //     type: "upcoming",
    //   },
    //   {
    //     id: 2,
    //     title: "Appointment completed",
    //     message: "You have successfully booked your appointment.",
    //     time: "3h",
    //     type: "completed",
    //   },
    // ]);
  }, []);

  if (notifications.length === 0) return <NotificationEmpty />;

  return (
    <div>
      <p className="text-sm text-gray-400 mb-3">Today</p>
      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
}
