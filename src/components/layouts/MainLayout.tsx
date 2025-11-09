import { Outlet } from "react-router-dom";
// import { Outlet } from "react-router";
// import Navbar from "./Navbar";
import Navbar from "../navbar/Navbar"

import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col max-w-screen-2xl ">
      <Navbar />
      <main className="flex-grow flex justify-center ">
        <div className="w-[97%] sm:w-[95%] lg:w-[92%] max-w-screen-2xl">
          <Outlet /> {/* Render our pages here */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
