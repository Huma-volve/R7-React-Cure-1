import ProfileDropdown from "../../pages/Profile/ProfileDropdown";

const Navbar = () => {
  return (
    <nav className="p-5 bg-white shadow-md flex justify-between items-center">
      <h1 className="font-bold text-lg text-blue-600">DoctorApp</h1>
      <div className="flex justify-end p-4">
      <ProfileDropdown />
    </div>
    </nav>
  );
};
export default Navbar;
