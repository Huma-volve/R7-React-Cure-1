
import emptyNotification from "../../../assets/icons/empty-notification.svg";
export default function NotificationEmpty() {
  return (
    <div className="flex flex-col items-center justify-center mt-24 text-center">
      <img src={emptyNotification} alt="No notifications" className="w-30 h-40 text-gray-300 mb-4" />
      <p className="text-gray-600 font-medium text-lg">Nothing to display here!</p>
      <p className="text-gray-400 text-sm mt-1">
        We’ll notify you once we have new notifications.
      </p>
    </div>
  );
}
