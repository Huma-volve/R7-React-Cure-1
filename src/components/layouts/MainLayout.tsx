import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
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
