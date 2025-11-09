// doctorSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Doctor } from "./doctorTypes";
import { getDoctorById } from "../apis/doctorApi";

//  Thunk to get doctor by ID
export const getDoctorByIdThunk = createAsyncThunk(
  "doctor/getDoctorById",
  async (id: number, thunkAPI) => {
    try {
      const response = await getDoctorById(id);
      console.log("response ", response.data.data);
      
      return response.data.data as Doctor;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch doctor");
    }
  }
);

interface DoctorState {
  selectedDoctor: Doctor | null;
  loading: boolean;
  error: string | null;
}

const initialState: DoctorState = {
  selectedDoctor: null,
  loading: false,
  error: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    addReview: (
  state,
  action: PayloadAction<{ name: string; rating: number; comment: string }>
) => {
  if (state.selectedDoctor) {
    if (!state.selectedDoctor.reviews) {
      state.selectedDoctor.reviews = [];
    }

    const newReview = {
      patientId: 3,
      doctorId: state.selectedDoctor.id,  
      patientName: action.payload.name,
      doctorName: state.selectedDoctor.fullName,
      rating: action.payload.rating,
      comment: action.payload.comment,
      createdAt: Date.now().toString(),
    };

    state.selectedDoctor.reviews.unshift(newReview);
  }
},
    setSelectedDoctor(state, action: PayloadAction<Doctor>) {
      state.selectedDoctor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctorByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDoctorByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDoctor = {
          ...action.payload,
          reviews: action.payload.reviews ?? [] };
      })
      .addCase(getDoctorByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
      
  },
});

export const { addReview , setSelectedDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
