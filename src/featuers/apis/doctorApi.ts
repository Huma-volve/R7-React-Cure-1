// api/Customer/Doctors/DoctorDetails/1
// api/Customer/Doctors/DoctorDetails/1
import axios from "./axios";
import api from "./axios";
const API_URL = "/Customer/Doctors"; 


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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YjlkY2MyMi05YmJmLTQwODYtOThmOC04MjkxYzAwZWUwYzYiLCJ1bmlxdWVfbmFtZSI6IisyMDEyMzQ1Njc5OCIsImZpcnN0TmFtZSI6Im9tbmlhIiwibGFzdE5hbWUiOiIiLCJhZGRyZXNzIjoiIiwiaW1nVXJsIjoiIiwiYmlydGhEYXRlIjoiMDAwMS0wMS0wMSIsImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IiIsImlzTm90aWZpY2F0aW9uc0VuYWJsZWQiOiJUcnVlIiwiZXhwIjoxNzYyNzI2OTA1LCJpc3MiOiJodHRwczovL2N1cmUtZG9jdG9yLWJvb2tpbmcucnVuYXNwLm5ldC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwLGh0dHBzOi8vbG9jYWxob3N0OjU1MDAsaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCAsaHR0cHM6Ly9jdXJlLWRvY3Rvci1ib29raW5nLnJ1bmFzcC5uZXQvIn0.5TrOu39CmebQHXqlSWAJ6Hu09dorpEgiV0VFomkFXQc`,
    //   Authorization: `Bearer YOUR_STATIC_TOKEN_HERE`,
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
