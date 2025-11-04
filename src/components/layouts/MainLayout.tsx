import { Outlet } from "react-router-dom";
// import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col max-w-screen-2xl  ">
      <Navbar />
      <main className="grow container mx-auto">
        <Outlet /> {/* Render our pages here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
