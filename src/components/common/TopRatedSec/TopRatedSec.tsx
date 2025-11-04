import { Button } from "../../ui/button"
import photoDr from "../../../../public/photoDr.svg"
import vectorStar from "../../../../public/vectorStar.svg"
import vectorOcl from "../../../../public/vectorOcl.svg"
// import Heart from '../Heart/Heart'

const TopRatedSec = () => {
  return (
    <section className="container py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-16">
        {/* title */}
        <div className="flex flex-col lg:flex-row gap-5 text-center lg:text-left justify-between items-center mb-8 md:mb-12">
            {/* left title and description */}
            <div className="max-w-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-secondary-defult mb-2">
                    Top-Rated Doctors Chosen by Patients
                </h1>
                <p className="text-sm md:text-base text-neutral-darker font-normal">
                    Explore our highest-rated doctors, trusted by real patients for their expertise, care, and service. Book with confidence today.
                </p>
            </div>
            {/* right button */}
            <div className="flex-shrink-0">
                <Button 
                    variant={"outline"} 
                    className="cursor-pointer w-[123px] h-[48px] text-primary-defult border-primary-defult hover:bg-primary-defult hover:text-white transition-colors"
                >
                    View All
                </Button>
            </div>
        </div>

        {/* cards - responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {/* Card 1 */}
            <div className="shadow-lg rounded-2xl overflow-hidden">
                {/* image and info */}
                <div className="flex gap-3 md:gap-4 p-4 md:p-6">
                    <div className="shrink-0">
                        <img src={photoDr} alt="Dr. Robert Johanson" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover" />
                    </div>
                    {/* right side */}
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <h3 className="font-normal text-lg md:text-xl truncate">Robert Johanson</h3>
                        {/* <Heart/> */}
                        <p className="font-normal text-xs md:text-sm text-neutral-darker">
                            Orthopedic | El-Nasr Hospital
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-4 items-center mt-2">
                            <div className="flex items-center gap-1">
                                <img src={vectorStar} alt="Rating" className="w-4 h-4" />
                                <p className="text-sm">4.9</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={vectorOcl} alt="Hours" className="w-4 h-4" />
                                <p className="text-xs md:text-sm">9:30am - 8:00pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* price and hour */}
                <div className="flex justify-between py-3 px-4 md:px-6 items-center border-t">
                    <div>
                        <p className="text-sm md:text-base">Price/<span className="text-neutral-darker">hour</span></p>
                    </div>
                    <div>
                        <p className="text-error-defult font-semibold text-lg md:text-xl">$350</p>
                    </div>
                </div>
                
                {/* button */}
                <div className="w-full py-4 px-4 md:px-6">
                    <Button 
                        variant={"outline"} 
                        className="cursor-pointer w-full text-primary-defult border-primary-defult hover:bg-primary-defult hover:text-white transition-colors"
                    >
                        Book appointment
                    </Button>
                </div>
            </div>

            {/* Card 2 */}
            <div className="shadow-lg rounded-2xl overflow-hidden">
                <div className="flex gap-3 md:gap-4 p-4 md:p-6">
                    <div className="shrink-0">
                        <img src={photoDr} alt="Dr. Robert Johanson" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <h3 className="font-normal text-lg md:text-xl truncate">Robert Johanson</h3>
                        <p className="font-normal text-xs md:text-sm text-neutral-darker">
                            Orthopedic | El-Nasr Hospital
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-4 items-center mt-2">
                            <div className="flex items-center gap-1">
                                <img src={vectorStar} alt="Rating" className="w-4 h-4" />
                                <p className="text-sm">4.9</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={vectorOcl} alt="Hours" className="w-4 h-4" />
                                <p className="text-xs md:text-sm">9:30am - 8:00pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between py-3 px-4 md:px-6 items-center border-t">
                    <div>
                        <p className="text-sm md:text-base">Price/<span className="text-neutral-darker">hour</span></p>
                    </div>
                    <div>
                        <p className="text-error-defult font-semibold text-lg md:text-xl">$350</p>
                    </div>
                </div>
                
                <div className="w-full py-4 px-4 md:px-6">
                    <Button 
                        variant={"outline"} 
                        className="cursor-pointer w-full text-primary-defult border-primary-defult hover:bg-primary-defult hover:text-white transition-colors"
                    >
                        Book appointment
                    </Button>
                </div>
            </div>

            {/* Card 3 */}
            <div className="shadow-lg rounded-2xl overflow-hidden">
                <div className="flex gap-3 md:gap-4 p-4 md:p-6">
                    <div className="shrink-0">
                        <img src={photoDr} alt="Dr. Robert Johanson" className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <h3 className="font-normal text-lg md:text-xl truncate">Robert Johanson</h3>
                        <p className="font-normal text-xs md:text-sm text-neutral-darker">
                            Orthopedic | El-Nasr Hospital
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-4 items-center mt-2">
                            <div className="flex items-center gap-1">
                                <img src={vectorStar} alt="Rating" className="w-4 h-4" />
                                <p className="text-sm">4.9</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <img src={vectorOcl} alt="Hours" className="w-4 h-4" />
                                <p className="text-xs md:text-sm">9:30am - 8:00pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between py-3 px-4 md:px-6 items-center border-t">
                    <div>
                        <p className="text-sm md:text-base">Price/<span className="text-neutral-darker">hour</span></p>
                    </div>
                    <div>
                        <p className="text-error-defult font-semibold text-lg md:text-xl">$350</p>
                    </div>
                </div>
                
                <div className="w-full py-4 px-4 md:px-6">
                    <Button 
                        variant={"outline"} 
                        className="cursor-pointer w-full text-primary-defult border-primary-defult hover:bg-primary-defult hover:text-white transition-colors"
                    >
                        Book appointment
                    </Button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TopRatedSec