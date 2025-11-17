import NotificationList from "../../components/ui/Notification/NotificationList";

export default function NotificationsPage() {
  return (
    <div className=" bg-white px-5 py-12">
      <div className=" mx-auto">
        {/* <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            ←
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Notifications</h1>
        </div> */}

        <NotificationList />
      </div>
    </div>
  );
}
