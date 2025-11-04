import type {  PayloadAction } from "@reduxjs/toolkit";
import {  createSlice } from "@reduxjs/toolkit";
import type { Doctor } from "./doctorTypes";

interface DoctorState {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
}

const initialState: DoctorState = {
  doctors: [
    {
      id: 1,
      name: "Dr. Jessica Turner",
      specialization: "Pulmonologist",
      address: "129, El-Nasr Street, Cairo",
      rating: 4.5,
      reviewsCount: 1872,
      experience: 10,
      patients: 2000,
      price: 350,
      about: "Dr. Jessica Turner is a highly experienced pulmonologist with over a decade of expertise in treating respiratory conditions. She is dedicated to providing personalized care and utilizing the latest medical advancements to ensure optimal patient outcomes.",
      education: "MD, Pulmonology - Harvard Medical School",
      hospital: "Cairo Medical Center",
      languages: ["English", "Arabic", "French"],
      fee: 350,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      reviews: [
        {
          id: 1,
          name: "Nabila Reyna",
          rating: 4.5,
          comment: "Excellent service! Dr. Jessica Turner was attentive and thorough. Highly recommend for in-person care!",
          time: "30 min ago",
        },
        {
          id: 2,
          name: "Nabila Reyna",
          rating: 4.5,
          comment: "Excellent service! Dr. Jessica Turner was attentive and thorough. Highly recommend for in-person care!",
          time: "30 min ago",
        },
        {
          id: 3,
          name: "Nabila Reyna",
          rating: 4.5,
          comment: "Excellent service! Dr. Jessica Turner was attentive and thorough. Highly recommend for in-person care!",
          time: "30 min ago",
        },
      ],
      selectedDoctor: undefined
    },
  ],
  selectedDoctor: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setSelectedDoctor(state, action: PayloadAction<Doctor>) {
      state.selectedDoctor = action.payload;
    },
    addReview: (
      state,
      action: PayloadAction<{ doctorId: number; name: string; rating: number; comment: string }>
    ) => {
      const doctor = state.doctors.find((d) => d.id === action.payload.doctorId);
      if (doctor) {
        const newReview = {
          id: Date.now(),
          name: action.payload.name,
          rating: action.payload.rating,
          comment: action.payload.comment,
          time: "Just now",
        };
        doctor.reviews.unshift(newReview);
      }
    },
  },
});

export const { setSelectedDoctor, addReview } = doctorSlice.actions;
export default doctorSlice.reducer;
