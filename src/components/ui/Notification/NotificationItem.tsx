import type { Notification } from "./NotificationList";
import { CheckCircle, CalendarX, Clock } from "lucide-react";

export default function NotificationItem({ notification }: { notification: Notification }) {
  const { title, message, time, type } = notification;

  const icon =
    type === "upcoming" ? (
      <Clock className="w-5 h-5" />
    ) : type === "completed" ? (
      <CheckCircle className="w-5 h-5" />
    ) : (
      <CalendarX className="w-5 h-5" />
    );

  const color =
    type === "upcoming"
      ? "bg-blue-100 text-blue-600"
      : type === "completed"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="flex items-start justify-between bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${color}`}>
          {icon}
        </div>
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-gray-500 text-sm">{message}</p>
        </div>
      </div>
      <p className="text-xs text-gray-400 whitespace-nowrap mt-1">{time}</p>
    </div>
  );
}
