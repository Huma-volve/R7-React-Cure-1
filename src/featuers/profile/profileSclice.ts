import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, updateProfile, type Profile } from "../apis/profileApi";

// get profile
export const fetchProfile = createAsyncThunk<Profile>(
  "profile/fetchProfile",
  async () => {
    const data = await getProfile();
    return data; 
  }
);

// saving updated profile
export const saveProfile = createAsyncThunk<Profile, Partial<Profile>>(
  "profile/saveProfile",
  async (profileData) => {
    const data = await updateProfile(profileData);
    return data;
  }
);

interface ProfileState {
  profile: Profile;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: {
    fullName: "",
    Email: "",
    PhoneNumber: "",
    Address: "",
    BirthDate: "",
    data: null,
  },
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; 
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load profile";
      })

      // Save Profile
      .addCase(saveProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update profile";
      });
  },
});

export default profileSlice.reducer;
