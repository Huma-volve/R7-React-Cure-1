import axios from "axios";

const api = axios.create({
  baseURL: "https://cure-doctor-booking.runasp.net/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
