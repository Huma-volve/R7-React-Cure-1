import api from "./axios";
const TOKEN = import.meta.env.VITE_API_TOKEN;
export interface NotificationType {
  id: number;
  content: string;
  applicationUserId: string;
  types: number;
  isRead: boolean;
  createdAt: string;
  title?: string;
}

export const getNotificationsByUser = async (): Promise<NotificationType[]> => {
  const response = await api.get(
    `/Customer/Notifications/GetNotificationsByUser`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  // Log the response for debugging
  
  // Normalize common shapes: { data: [...] } or just [...]
  const payload = response?.data?.data ?? response?.data;
  console.log("Notification API Response:", payload);

  if (Array.isArray(payload)) {
    return payload;
  }
  // Fallbacks for unexpected shapes
  if (Array.isArray(response?.data)) {
    return response.data;
  }
  if (Array.isArray(response?.data?.items)) {
    return response.data.items;
  }
  return [];
};

export const markNotificationAsRead = async (id: number) => {
  const response = await api.put(
    `/Customer/Notifications/MarkAsRead/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data;
};

export const getNotificationSettings = async () => {
  const response = await api.get("/Profile/NotificationSettings", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const toggleNotificationSetting = async (settingKey: string) => {
  const response = await api.put(
    "/Profile/NotificationSettings/toggle",
    { settingKey },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data;
};
