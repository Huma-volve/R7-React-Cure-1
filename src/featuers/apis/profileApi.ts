// src/features/apis/profileApi.ts
import api from "./axios"; 

//  مؤقتًا بنستخدم توكن ثابت localStorage
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmODU4YzAyOC0wM2U1LTQ2NTEtOWE4MC1hMGUyZDdlYTBiNDMiLCJ1bmlxdWVfbmFtZSI6IisyMDEyMzQ1Njc5OSIsImZpcnN0TmFtZSI6Im9tbmlhIiwibGFzdE5hbWUiOiIiLCJhZGRyZXNzIjoiIiwiaW1nVXJsIjoiIiwiYmlydGhEYXRlIjoiMDAwMS0wMS0wMSIsImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IiIsImlzTm90aWZpY2F0aW9uc0VuYWJsZWQiOiJUcnVlIiwiZXhwIjoxNzYyNzgzMDI3LCJpc3MiOiJodHRwczovL2N1cmUtZG9jdG9yLWJvb2tpbmcucnVuYXNwLm5ldC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwLGh0dHBzOi8vbG9jYWxob3N0OjU1MDAsaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCAsaHR0cHM6Ly9jdXJlLWRvY3Rvci1ib29raW5nLnJ1bmFzcC5uZXQvIn0.2-YK5qHno7OQGZQ3UwkXUiPmqzlD1hA3Wgdi-tOGe6c";

// data types
export interface Profile {
  data: any;
  fullName: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  BirthDate: string;
}

// 🧠 GET PROFILE
export const getProfile = async (): Promise<Profile> => {
  const response = await api.get("/profile/Editprofile/getprofile", {
    headers: {
      Authorization: TOKEN,
    },
  });
  return response.data; // 
};

// 🛠️ UPDATE PROFILE
export const updateProfile = async (data: Partial<Profile>): Promise<Profile> => {
  const response = await api.put("/profile/Editprofile/updateprofile", data, {
    headers: {
      Authorization: TOKEN,
    },
  });
  return response.data;
};
