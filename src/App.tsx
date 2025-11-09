import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
// import DoctorDetails from './pages/DoctorDetails/DoctorDetails';
import Home from "./pages/Home/Home";
import Favorite from "./pages/Favorite/Favorite";
import DoctorsPage from "./pages/Doctors/Doctors";
import { FavoriteProvider } from "./context/FavoriteContext";
import  TokenAndUrlContextProvider  from "./context/TokenAndUrlContext";
import AllTopRate from "./pages/AllTopRate/AllTopRate";
import MethodForm from "./pages/MethodForm/MethodForm";
import Methods from "./pages/Methods/Methods";
import PayMethod from "./pages/PayMethod/PayMethod";
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails";
import ConfirmAppointment from "./pages/ConfirmAppointment/ConfirmAppointment";
import MapPage from "./pages/Map/MapPage";
import EditProfile from "./pages/Profile/EditProfile";

import { Toaster } from "sonner";
import { NotificationProvider } from "../src/components/ui/Notification/NotificationContext";
import NotificationsPage from "./pages/Notifications/NotificationsPage";


function App() {
  

  return (
    <>
    <TokenAndUrlContextProvider>
    <FavoriteProvider>
       {/* ✅ wrap all app with NotificationProvider */}
      <NotificationProvider>
        {/* ✅ Toast notifications */}
        <Toaster position="top-right" richColors />
      <Router>
      <Routes>
        {/* login page outside the layout*/}
        <Route path="/login"  />

        {/* all pages have the same layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/all-top-rate" element={<AllTopRate />} />
          <Route path="/methodform" element={<MethodForm />} />
          <Route path="/payment" element={<PayMethod />} />
          <Route path="/methods" element={<Methods />} />
           <Route path="/doctor-details/:id" element={<DoctorDetails />} />
              <Route path="/confirm-appointment" element={<ConfirmAppointment />} />
              <Route path="map" element={<MapPage />} />
              <Route path="/notification" element={<NotificationsPage/>} />
              <Route path="/edit-profile" element={<EditProfile/>} />
              <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </Router>
        </NotificationProvider>
    </FavoriteProvider>
    </TokenAndUrlContextProvider>
    </>
  );
}

export default App;
