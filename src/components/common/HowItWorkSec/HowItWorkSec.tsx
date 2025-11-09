import searchForDoctor from '../../../../public/searchForDoctor.svg'
import chooseAdate from '../../../../public/chooseAdate.svg'
import payOnline from '../../../../public/payOnline.svg'

const HowItWorkSec = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8">
      {/* Section Title */}
      <div className="pb-8 md:pb-10 lg:pb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-normal">
          How it works
        </h1>
      </div>
      
      {/* Cards Container */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6 md:gap-8 lg:gap-6 xl:gap-0 max-w-7xl mx-auto">
        {/* Card 1 - Search for Doctor */}
        <div className="w-full sm:max-w-md lg:max-w-sm xl:max-w-md">
          <img 
            src={searchForDoctor} 
            alt="Search for a doctor" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Card 2 - Choose a Date */}
        <div className="w-full sm:max-w-md lg:max-w-sm xl:max-w-md">
          <img 
            src={chooseAdate} 
            alt="Choose a date and time" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Card 3 - Pay Online */}
        <div className="w-full sm:max-w-md lg:max-w-sm xl:max-w-md">
          <img 
            src={payOnline} 
            alt="Book and pay online" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  )
}

export default HowItWorkSec