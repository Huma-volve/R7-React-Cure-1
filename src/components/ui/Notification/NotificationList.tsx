import { useNotifications } from "./NotificationContext";
import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";

export default function NotificationList() {
  const { notifications } = useNotifications();

  if (!notifications || notifications.length === 0) {
    return <NotificationEmpty />;
  }

  return (
    <div className="p-4">
      <p className="text-sm text-gray-400 mb-3">Today</p>
      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
}
