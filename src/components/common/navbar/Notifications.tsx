import { Button } from '../../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getNotificationsByUser, markNotificationAsRead } from '../.././../featuers/apis/notificationApi';
import type { NotificationType } from '../.././../featuers/apis/notificationApi';
import noNotification  from "../../../assets/icons/no-notification.jpg"

const Notifications = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();
   
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await getNotificationsByUser();
                console.log(res);
                
                setNotifications(res || []);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const hasNotifications = notifications.length > 0;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-12 cursor-pointer bg-[#F5F6F7] border-0 shadow-none outline-none
            focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-[#E9EAEB] transition-colors duration-200"
                >
                    <img src="/icons/Notifications.svg" alt="Notifications" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-75 sm:w-100 bg-white relative z-50 rounded-xl border-0 mt-2 mr-3 p-0"
                align="center"
                side="bottom"
                sideOffset={10}>
                {loading ? (
                    <div className="flex justify-center items-center p-5 text-gray-500">
                        Loading notifications...
                    </div>
                ) : hasNotifications ? (
 
                    
                    <>
                        <DropdownMenuLabel className="bg-[#93b4de] font-medium text-center p-8 ">
                            <Link to="/notification">Your Notifications  </Link>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {notifications.map((notification) => {
                                const createdAt = notification.createdAt
                                    ? new Date(notification.createdAt).toLocaleString()
                                    : "";
                                return (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className={`mb-2 cursor-pointer hover:bg-gray-100 transition-colors justify-between p-3 rounded-lg ${notification.isRead ? "opacity-70" : "bg-gray-100"}`}
                                        onClick={async () => {
                                            try {
                                                await markNotificationAsRead(notification.id);
                                                setNotifications((prev) =>
                                                    prev.map((item) =>
                                                        item.id === notification.id
                                                            ? { ...item, isRead: true }
                                                            : item
                                                    )
                                                );
                                            } catch (e) {
                                                console.error("Failed to mark as read", e);
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col gap-1">
                                                <p
                                                    style={{ fontFamily: 'var(--font-secondary)' }}
                                                    className="sm:text-[16px] text-[14px] font-medium"
                                                >
                                                    {notification.title ?? "Notification"}
                                                </p>
                                                <p className="text-[14px] text-gray-600 truncate max-w-[200px] sm:max-w-[250px]">
                                                    {notification.content}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-gray-400 text-xs whitespace-nowrap">
                                                {createdAt}
                                            </p>
                                            {!notification.isRead && (
                                                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                                            )}
                                        </div>
                                    </DropdownMenuItem>
                                );
                            })}
                        </DropdownMenuGroup>
                    </>
                ) : (
                    <div className="flex items-center justify-center p-5 flex-col mb-2">
                        <Link to="/notification" className=' text-blue-500 text-sm text-center'>
                            Your Notifications
                        </Link>
                        <img src={noNotification} alt="" className='p-3 h-25 w-25'/>
                        <p className="text-lg font-semibold mb-1">Nothing to display here!</p>
                        <p className="text-gray-500 text-sm text-center">
                            We’ll notify you once we have new notifications.
                        </p>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notifications;
