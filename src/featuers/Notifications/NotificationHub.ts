import * as signalR from "@microsoft/signalr";

const hubUrl = "https://your-api-url/notificationsHub";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(hubUrl)
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Information)
  .build();

export const startConnection = async () => {
  try {
    await connection.start();
    console.log("✅ SignalR Connected");
  } catch (err) {
    console.error("❌ SignalR Connection Failed", err);
    setTimeout(startConnection, 5000);
  }
};
startConnection();