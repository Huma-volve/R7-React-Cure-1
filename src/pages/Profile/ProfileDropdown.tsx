import { useState, useEffect } from "react";
import {
  FaBell,
  FaCreditCard,
  FaHeart,
  FaCog,
  FaQuestionCircle,
  FaLock,
  FaSignOutAlt,
  FaChevronRight,
  FaMapMarkerAlt,
  FaUserCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getProfile } from "../../featuers/apis/profileApi";
import defultUser from "../../assets/defultUser.png";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data?.data || res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutConfirm(false);
    setOpen(false);
    navigate("/login"); // go to login page
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleSettingsClick = () => {
    setOpen(false);
    navigate("/edit-profile"); // go to settings page
  };

  const menuItems = [
    { icon: <FaBell />, label: "Notification", toggle: true },
    { icon: <FaCreditCard />, label: "Payment Method" },
    { icon: <FaHeart />, label: "Favorite" },
    { icon: <FaCog />, label: "Settings", onClick: handleSettingsClick },
    { icon: <FaQuestionCircle />, label: "FAQs" },
    { icon: <FaLock />, label: "Privacy Policy" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-white shadow  rounded-full transition"
      >
        {/* <FaUserCircle className="text-2xl text-gray-600" />
        <span className="text-gray-700 font-medium hidden sm:block">
          Profile
        </span> */}
        <img src={profile?.imageUrl || defultUser} alt="Profile" loading="lazy" className={"h-12 w-12 rounded-full"}/>
      </button>

      <AnimatePresence>
        {open && profile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-lg p-4 z-50"
          >
            {/* Profile Header */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <img
                src={profile.imageUr || defultUser}
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-gray-800 font-semibold">
                  {profile.fullName || "User"}
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-400" />{" "}
                  {profile.address || "No address"}
                </p>
              </div>
              {/* <FaChevronRight className="text-gray-400" /> */}
            </div>

            <hr className="my-3 border-gray-200" />

            {/* Menu Items */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition"
                  onClick={item.onClick}
                >
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.toggle ? (
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={notifications}
                        onChange={() => setNotifications(!notifications)}
                      />
                      <div
                        className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 ${
                          notifications ? "bg-green-500" : ""
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                            notifications ? "translate-x-5" : ""
                          }`}
                        />
                      </div>
                    </label>
                  ) : (
                    <FaChevronRight className="text-gray-400" />
                  )}
                </div>
              ))}

              {/* Logout */}
              <div
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-red-500 cursor-pointer"
              >
                <FaSignOutAlt />
                <span>Log out</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Logout Confirmation Popup */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/40 transition-opacity flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-semibold mb-3">Confirm Logout</h3>
              <p className="text-gray-600 mb-5">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
