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
function App() {
  return (
    <>
    <TokenAndUrlContextProvider>
    <FavoriteProvider>
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
        </Route>
      </Routes>
    </Router>
    </FavoriteProvider>
    </TokenAndUrlContextProvider>
    </>
  )
}

export default App
