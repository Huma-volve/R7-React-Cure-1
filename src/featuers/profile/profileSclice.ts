import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "../apis/profileApi";

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const data = await getProfile();
  return data;
});

export const saveProfile = createAsyncThunk("profile/saveProfile", async (profileData: any) => {
  const data = await updateProfile(profileData);
  return data;
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {
      fullName: "",
      Email: "",
      PhoneNumber: "",
      Address: "",
      BirthDate: "",
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      // .addCase(fetchProfile.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || null;
      // })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default profileSlice.reducer;
