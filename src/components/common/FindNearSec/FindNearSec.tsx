import {
  SearchIcon,
} from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../components/ui/input-group"
import "../../../index.css"

const FindNearSec = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-25">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-12 xl:gap-16">
        
        {/* Left Content */}
        <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-1/2 text-center lg:text-left">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
            Find Care Near You in Seconds
          </h1>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-darker leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Allow location access or choose your city to instantly discover trusted doctors and clinics around you—quick, easy, and local.
          </p>
          
          {/* Search Input */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <InputGroup className="w-full">
              <InputGroupInput 
                placeholder="Search by location" 
                className="py-2 px-3 md:py-3 md:px-4"
              />
              <InputGroupAddon>
                <SearchIcon className="w-4 h-4 md:w-5 md:h-5 bg-neutral-lightest"/>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        
        {/* Right Map */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27326.46358121222!2d30.9526528!3d31.1150695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1761833529914!5m2!1sar!2seg" 
            className="rounded-2xl md:rounded-3xl lg:rounded-4xl w-full h-64 sm:h-80 md:h-96 lg:h-[440px] max-w-md lg:max-w-lg xl:max-w-xl"
            style={{border:"0"}} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location map"
          />
        </div>
      </div>
    </section>
  )
}

export default FindNearSec