import { BsHeartPulse } from "react-icons/bs";
import { FiAlignRight } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
import {   Avatar,
  AvatarFallback,
  AvatarImage } from "../ui/avatar";
  import {
    SearchIcon,
  } from "lucide-react"
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "../../components/ui/input-group"
  import "../../index.css"


const Navbar = () => {
  return (
    <nav className="bg-white h-auto md:h-14 py-3 md:py-0 px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between md:justify-around items-center gap-4 md:gap-0">
      {/* heart plus */}
      <div className="shrink-0">
        <BsHeartPulse className="w-6 h-6 md:w-8 md:h-8 text-primary-defult cursor-pointer" />
      </div>
      
      {/* search input */}
      <div className="w-full md:w-auto md:flex-1 md:max-w-xl md:mx-4 lg:mx-8">
        <InputGroup>
          <InputGroupInput 
            className="py-2 px-3 md:py-3 md:px-4 text-sm md:text-base" 
            placeholder="Search..." 
          />
          <InputGroupAddon>
            <SearchIcon className="w-4 h-4 md:w-5 md:h-5 ml-1.5 bg-neutral-lightest"/>
          </InputGroupAddon>
        </InputGroup>
      </div>
      
      {/* avatar section */}
      <div className="shrink-0">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex gap-2 md:gap-3">
            <FiAlignRight className="w-5 h-5 md:w-6 md:h-6 cursor-pointer bg-neutral-lightest"/>
            <BiBell className="w-5 h-5 md:w-6 md:h-6 cursor-pointer bg-neutral-lightest"/>
          </div>
          <Avatar className="w-8 h-8 md:w-10 md:h-10 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;