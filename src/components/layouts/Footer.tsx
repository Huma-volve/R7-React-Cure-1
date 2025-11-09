import { BsHeartPulse } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { SlLocationPin } from "react-icons/sl";
import footerLogo from "../../../public/footer.svg"

const Footer = () => {
  return (
    <>  
    <div className="relative top-30 z-10 flex justify-center">
      <img src={footerLogo} alt="" />
    </div>
    <footer className=" w-full text-white border-t footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <BsHeartPulse className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white cursor-pointer" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Cure</h2>
            </div>
            
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Cure helps you find trusted doctors, book appointments, and manage your health—quickly and easily.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-[#1877F2]" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    fill="#25D366"
                  />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5 text-[#FF0000]" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Company</h2>
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li className="text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                <a href="#">Home</a>
              </li>
              <li className="text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                <a href="#">About</a>
              </li>
              <li className="text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                <a href="#">Services</a>
              </li>
              <li className="text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Support</h2>
            <ul className="flex flex-col gap-3 sm:gap-4">
              <li className="text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                Help Center
              </li>
              <li className="text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                How it Works
              </li>
              <li className="text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </li>
              <li className="text-sm sm:text-base font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contact Info</h2>
            <div className="flex flex-col gap-4 sm:gap-5">
              
              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <FiPhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm text-gray-400">Phone</p>
                  <p className="text-sm sm:text-base font-medium">080 707 555-321</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4">
                <TfiEmail className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm text-gray-400">Email</p>
                  <p className="text-sm sm:text-base font-medium break-all">demo@demo.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <SlLocationPin className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs sm:text-sm text-gray-400">Address</p>
                  <p className="text-sm sm:text-base font-medium">123 Main St, Anytown, USA</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <p className="text-center text-xs sm:text-sm text-gray-400">
            © 2024 Cure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;