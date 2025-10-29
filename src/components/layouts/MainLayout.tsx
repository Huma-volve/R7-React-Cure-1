import { Outlet } from "react-router-dom";
// import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet /> {/* Render our pages here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
