// api/Customer/Doctors/DoctorDetails/1
// api/Customer/Doctors/DoctorDetails/1
import axios from "./axios";
import api from "./axios";
const API_URL = "/Customer/Doctors"; 
const TOKEN = import.meta.env.VITE_API_TOKEN;

// ✅ Get doctor by ID
export const getDoctorById = (id: number) => {
    return api.get(`${API_URL}/DoctorDetails/${id}`);
};

// ✅ Get nearest doctors (by location)
export const getNearestDoctors = (
  latitude: number,
  longitude: number,
) => {
  return api.get(`${API_URL}/GetNearestDoctors`, {
    params: { latitude, longitude },
    headers: {
        Authorization: `Bearer ${TOKEN}`,
    },
  });
};
//favorite doctor
export const toggleFavouriteDoctor = async (doctorId: number) => {
  try {
    const response = await axios.post(`/Customer/Favourites/FavouriteAndUnFavourite`, {
      doctorId,
    });
    return response.data;
  } catch (error: any) {
    console.error("Failed to toggle favourite:", error);
    throw error.response?.data || error.message;
  }
};
