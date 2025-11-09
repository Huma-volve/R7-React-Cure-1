import axios from "./axios"; 


export const getNotificationsByUser = async () => {
  const { data } = await axios.get("/api/Customer/Notifications/GetNotificationsByUser");
  return data;
};

export const markNotificationAsRead = async (id: number) => {
  const { data } = await axios.put(`/api/Customer/Notifications/MarkAsRead/${id}`);
  return data;
};

export const getNotificationSettings = async () => {
  const { data } = await axios.get("/api/Profile/NotificationSettings");
  return data;
};

export const toggleNotificationSetting = async (settingKey: string) => {
  const { data } = await axios.put("/api/Profile/NotificationSettings/toggle", { settingKey });
  return data;
};
