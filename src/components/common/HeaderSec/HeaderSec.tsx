
import star from '../../../../public/star.svg'
import happyPatient from '../../../../public/happyP.svg'
import '../../../index.css'
import { Button } from '../../../components/ui/button';
import { IoCalendarOutline } from "react-icons/io5";
const HeaderSec = () => {
  return (
    <>  
   
     <div className='bgMain min-h-screen py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 container mx-auto flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8'>
        
        {/* Upgrade badge */}
        <div>
          <div className="flex items-center gap-2 bg-primary-lightest rounded-full px-3 py-1.5 md:px-4 md:py-2">
            <div className="shrink-0">
              <img src={star} alt="" className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <h1 className='text-sm md:text-base font-medium'>Upgrade your account</h1>
          </div>
        </div>
        
        {/* Main heading */}
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-regular leading-tight" 
              style={{fontFamily:"var(--font-montserrat)", fontWeight:"var(--weight-regular)"}}>
            Find and book top doctors near you
          </h1>
        </div>
        
        {/* Description */}
        <div className="max-w-3xl px-4">
          <p className='text-center text-neutral-darker text-sm sm:text-base md:text-lg leading-relaxed' 
             style={{fontFamily:"var(--font-montserrat)", fontWeight:"var(--weight-regular)"}}>
            Easily find top-rated specialists near you and book <br /> appointments in just a few clicks. Whether you <br /> need an in-person visit consultation, we're here to <br /> connect you with the right care—fast, simple, and <br /> secure.
          </p>
        </div>
        
        {/* Happy patients image */}
        <div className="my-2 md:my-4">
          <img src={happyPatient} alt="Happy patients" className="w-32 sm:w-40 md:w-48 lg:w-auto" />
        </div>
        
        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-9 w-full sm:w-auto px-4'>
          <Button 
            className='cursor-pointer w-full sm:w-auto text-sm md:text-base py-5 md:py-6 px-6 md:px-16' 
            style={{background:"var(--primary-defult)", color:"var(--primary-lightest)"}}>
            Get started
          </Button>
          <Button 
            variant={"outline"} 
            className='cursor-pointer w-full sm:w-auto text-sm md:text-base py-5 md:py-6 px-6 md:px-8 flex items-center justify-center gap-2' 
            style={{color:"var(--primary-defult)", borderColor:"var(--primary-defult)"}}>
            <IoCalendarOutline className="w-4 h-4 md:w-5 md:h-5" /> 
            Book Appointment
          </Button>
        </div>
      </div>
    </>
  )
}

export default HeaderSec