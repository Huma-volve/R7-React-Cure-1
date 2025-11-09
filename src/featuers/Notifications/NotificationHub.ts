import * as signalR from "@microsoft/signalr";

const baseURL = "https://cure-doctor-booking.runasp.net/api";

export const createNotificationConnection = (token: string) => {
  return new signalR.HubConnectionBuilder()
    .withUrl(`${baseURL}/notificationHub`, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
};
