import {configureStore} from "@reduxjs/toolkit";
import doctorReducer from "../featuers/doctor/doctorSlice";
import profileReducer  from "../featuers/profile/profileSclice";

export const store = configureStore({
   reducer: {
    doctor: doctorReducer,
      profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
