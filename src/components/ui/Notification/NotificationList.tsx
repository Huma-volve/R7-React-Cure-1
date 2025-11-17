import NotificationItem from "./NotificationItem";
import NotificationEmpty from "./NotificationEmpty";
import { useNotifications } from "./useNotifications";

export default function NotificationList() {
  const { notifications } = useNotifications();
  console.log(notifications);

  if (!notifications || notifications.length === 0) {
    return <NotificationEmpty />;
  }

  // Group notifications by date
  const groupNotificationsByDate = () => {
    const groupsMap = new Map<string, { label: string; date: Date; notifications: typeof notifications }>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    notifications.forEach((notification) => {
      const notifDate = new Date(notification.createdAt);
      notifDate.setHours(0, 0, 0, 0);
      
      let label: string;
      
      if (notifDate.getTime() === today.getTime()) {
        label = "Today";
      } else if (notifDate.getTime() === yesterday.getTime()) {
        label = "Yesterday";
      } else {
        label = notifDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: notifDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
        });
      }

      const dateKey = notifDate.toISOString();
      if (!groupsMap.has(dateKey)) {
        groupsMap.set(dateKey, { label, date: notifDate, notifications: [] });
      }
      groupsMap.get(dateKey)!.notifications.push(notification);
    });

    // Convert to array and sort: Today first, then Yesterday, then by date (newest first)
    const groups = Array.from(groupsMap.values());
    groups.sort((a, b) => {
      if (a.label === "Today") return -1;
      if (b.label === "Today") return 1;
      if (a.label === "Yesterday") return -1;
      if (b.label === "Yesterday") return 1;
      return b.date.getTime() - a.date.getTime();
    });

    return groups;
  };

  const groupedNotifications = groupNotificationsByDate();

  return (
    <div className="p-4">
      {groupedNotifications.map((group) => (
        <div key={group.date.toISOString()} className="mb-6">
          <p className="text-sm text-gray-400 mb-3">{group.label}</p>
          <div className="flex flex-col gap-3">
            {group.notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
