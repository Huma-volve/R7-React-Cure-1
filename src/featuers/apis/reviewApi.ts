import api from "./axios";
const TOKEN = import.meta.env.VITE_API_TOKEN;


export interface Review {
  id: number;
  doctorId: number;
  patientName: string;
  rating: number;
  review: string;
  createdAt: string;
  
}

//   "doctorId": 2,
//   "patientId": 2,
//   "rating": 4,
//   "comment": "Excellent service!"
// ✅ data send when add Review
export interface AddReviewPayload {
  doctorId: number;
    patientId: number;
  rating: number;
  review: string;
}

/* ----------------------- 🔹 1. Add Reviwe ----------------------- */
export const addReview = async (payload: AddReviewPayload): Promise<Review> => {
  // const token = localStorage.getItem("token"); // 

  const response = await api.post<Review>(
    "/Customer/Reviews/AddReview",
    payload,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return response.data;
};


/* ----------------------- 🔹 2. Get all Reviews ----------------------- */
export const getAllReviews = async (): Promise<Review[]> => {
  const response = await api.get<Review[]>("/Customer/Reviews/GetReviews");
  return response.data;
};

/* ----------------------- 🔹 3. Get Reviews by Doctor -----------------------api/Customer/Reviews/GetReviewsByDoctor/2 */
export const getReviewsByDoctor = async (doctorId: number): Promise<Review[]> => {
  const response = await api.get<Review[]>(`/Customer/Reviews/GetReviewsByDoctor/${doctorId}`);
  return response.data;
};
/* ----------------------- 🔹 4. Delete Review ----------------------- */
export const deleteReview = async (id: number): Promise<void> => {
  await api.delete(`/Customer/Reviews/DeleteReview/${id}`);
};