// src/features/apis/profileApi.ts
import api from "./axios"; 
const TOKEN = import.meta.env.VITE_API_TOKEN

// data types
export interface Profile {
  // data: any;
  fullName: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  BirthDate: string;
}

//  GET PROFILE
export const getProfile = async (): Promise<Profile> => {
  const response = await api.get("/profile/Editprofile/getprofile", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data; // 
};

//  UPDATE PROFILE
export const updateProfile = async (data: Partial<Profile>): Promise<Profile> => {
  const response = await api.put("/profile/Editprofile/updateprofile", data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};
