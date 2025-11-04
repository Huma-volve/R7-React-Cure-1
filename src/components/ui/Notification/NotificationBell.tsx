import { Bell } from "lucide-react";
import { useNotifications } from "./NotificationContext";

export const NotificationBell = () => {
  const { notifications } = useNotifications();
  const count = notifications.length;

  return (
    <div className="relative cursor-pointer">
      <Bell className="w-6 h-6 text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};
