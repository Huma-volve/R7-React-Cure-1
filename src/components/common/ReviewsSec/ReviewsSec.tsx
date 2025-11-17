import { useState, useEffect } from 'react';
import starRev from '../../../../public/starRev.svg';

// Define your review images
import review1 from '../../../../public/photoDr.svg';
import review2 from '../../../../public/chooseAdate.svg';
import review3 from '../../../../public/searchForDoctor.svg';
import review4 from '../../../../public/payOnline.svg';
import review5 from '../../../../public/starRev.svg';

interface Review {
  id: number;
  image: string;
  alt: string;
}

const ReviewsSec = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const reviews: Review[] = [
    { id: 1, image: review1, alt: "Customer review 1" },
    { id: 2, image: review2, alt: "Customer review 2" },
    { id: 3, image: review3, alt: "Customer review 3" },
    { id: 4, image: review4, alt: "Customer review 4" },
    { id: 5, image: review5, alt: "Customer review 5" },
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Get visible slides (show 5 at a time)
  const getVisibleSlides = () => {
    const slides = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + reviews.length) % reviews.length;
      slides.push({ ...reviews[index], position: i });
    }
    return slides;
  };

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white ">
      <div className="container mx-auto px-4 md:px-6 lg:px-16">
        {/* Title */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-center text-gray-900 leading-tight">
            Reviews
            <br />
            That Speak for Themselves
          </h2>
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-1 md:gap-2 mb-6 md:mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star}>
              <img 
                src={starRev} 
                alt={`Star ${star}`} 
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </div>
          ))}
        </div>

        {/* Review Text */}
        <p className="text-sm md:text-base lg:text-lg text-neutral-darker text-center text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 px-4 leading-relaxed">
          "Quick and easy booking! I found a <br /> great dermatologist near me and <br /> booked an appointment in just a <br /> few minutes."
        </p>

        {/* Slider Container */}
        <div className="relative max-w-6xl mx-auto px-4 md:px-12">
          {/* Images Slider */}
          <div className="relative h-32 md:h-40 lg:h-48 overflow-hidden">
            <div className="flex items-center justify-center h-full gap-2 md:gap-4">
              {getVisibleSlides().map((slide, idx) => {
                const scale = slide.position === 0 ? 'scale-110' : 'scale-90';
                const opacity = Math.abs(slide.position) === 2 ? 'opacity-50' : 'opacity-100';
                const size = slide.position === 0 
                  ? 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40' 
                  : 'w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32';

                return (
                  <button
                    key={`${slide.id}-${idx}`}
                    onClick={() => {
                      const actualIndex = (currentIndex + slide.position + reviews.length) % reviews.length;
                      goToSlide(actualIndex);
                    }}
                    className={`shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-500 ease-in-out ${size} ${scale} ${opacity} hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 lg:p-3 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center"
            aria-label="Previous review"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 lg:p-3 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center"
            aria-label="Next review"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 md:w-10 h-2 md:h-2.5 bg-blue-600'
                    : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-gray-300 hover:bg-gray-400'
                } disabled:cursor-not-allowed`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSec;