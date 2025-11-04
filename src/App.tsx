import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails";
import ConfirmAppointment from "./pages/ConfirmAppointment/ConfirmAppointment";
import MapPage from "./pages/Map/MapPage";


import { Toaster } from "sonner";
import { NotificationProvider } from "../src/components/ui/Notification/NotificationContext";
import NotificationsPage from "./pages/Notifications/NotificationsPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* ✅ wrap all app with NotificationProvider */}
      <NotificationProvider>
        {/* ✅ Toast notifications */}
        <Toaster position="top-right" richColors />

        <Router>
          <Routes>
            {/* login page outside the layout*/}
            <Route path="/login" />

            {/* all pages have the same layout */}
            <Route element={<MainLayout />}>
              <Route path="/doctor-details/:id" element={<DoctorDetails />} />
              <Route path="/confirm-appointment" element={<ConfirmAppointment />} />
              <Route path="map" element={<MapPage />} />
              <Route path="/notification" element={<NotificationsPage/>} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
          </Routes>
        </Router>
      </NotificationProvider>
    </>
  );
}

export default App;
