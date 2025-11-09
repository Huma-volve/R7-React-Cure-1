import star from '../../../../public/star.svg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion"

const QuestionAnswersSec = () => {
  return (
    <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-16">
            {/* Header Section */}
            <div className='flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-12'>
                {/* Badge */}
                <div className="flex items-center gap-2 bg-primary-lightest rounded-full px-3 py-1.5 md:px-4 md:py-2">
                    <div className="shrink-0">
                        <img src={star} alt="Star icon" className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <h2 className='text-sm md:text-base font-medium text-primary-defult'>
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* Main Title */}
                <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-normal text-secondary-defult px-4'>
                    Got Questions? We've got Answers!
                </h1>
            </div>

            {/* Accordion Section */}
            <div className='flex justify-center items-center w-full'>
                <div className='w-full max-w-[800px] px-4 md:px-6 lg:px-0'>
                    <div className='flex flex-col gap-3 md:gap-4'>
                        <Accordion className=' bg-neutral-lightest rounded-lg p-3 md:p-4 shadow-sm' type="single" collapsible>
                            <AccordionItem value="item-1" className="border-none ">
                                <AccordionTrigger className='cursor-pointer text-base md:text-lg lg:text-xl text-secondary-defult font-normal hover:no-underline'>
                                    How do I book an appointment?
                                    
                                </AccordionTrigger>
                                <AccordionContent className='text-sm md:text-base text-neutral-darker pt-2'>
                                    You can easily book an appointment by searching for a doctor, selecting an available time slot, and confirming your booking. It only takes a few minutes!
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion className='bg-neutral-lightest rounded-lg p-3 md:p-4 shadow-sm' type="single" collapsible>
                            <AccordionItem value="item-2" className="border-none">
                                <AccordionTrigger className='cursor-pointer text-base md:text-lg lg:text-xl text-secondary-defult font-normal hover:no-underline'>
                                    Can I cancel or reschedule my appointment?
                                </AccordionTrigger>
                                <AccordionContent className='text-sm md:text-base text-neutral-darker pt-2'>
                                    Yes, you can cancel or reschedule your appointment through your account dashboard. Please note that cancellation policies may vary by doctor.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                      

                       

                       
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default QuestionAnswersSec