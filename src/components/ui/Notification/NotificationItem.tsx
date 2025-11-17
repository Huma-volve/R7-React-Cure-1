import type { Notification } from "./NotificationContextBase";
import { CheckCircle, CalendarX, Clock } from "lucide-react";
import { useNotifications } from "./useNotifications";

export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const { markNotificationAsRead } = useNotifications();
  const { id, title, content, createdAt, isRead, types } = notification;

  const icon =
    types === 0 ? (
      <CheckCircle className="w-5 h-5" />
    ) : types === 1 ? (
      <Clock className="w-5 h-5" />
    ) : (
      <CalendarX className="w-5 h-5" />
    );

  const color =
    types === 0
      ? "bg-blue-100 text-blue-600"
      : types === 1
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  return (
    <div
      className={`flex w-full items-start justify-between bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition ${
        isRead ? "opacity-70" : ""
      }`}
      onClick={() => markNotificationAsRead(id)}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 flex items-center justify-center rounded-full ${color}`}>
          {icon}
        </div>
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-gray-500 text-sm">{content}</p>
        </div>
      </div>
      <p className="text-xs text-gray-400 whitespace-nowrap mt-1">
        {new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  );
}
