import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import DoctorDetails from './pages/DoctorDetails/DoctorDetails';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
        {/* login page outside the layout*/}
        <Route path="/login"  />

        {/* all pages have the same layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DoctorDetails />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
