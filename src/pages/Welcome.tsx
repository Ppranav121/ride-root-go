
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

interface OnboardingSlide {
  title: string;
  description: string;
  image: React.ReactNode;
  backgroundColor: string;
}

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: OnboardingSlide[] = [
    {
      title: "Welcome to RideRoot - Your Journey, Your Way",
      description: "Get ready to experience hassle-free transportation with prices you'll love. Let's get you started!",
      image: <Car size={60} className="text-white" />,
      backgroundColor: "bg-rideroot-primary",
    },
    {
      title: "Choose Your Ride - Tailored to Your Needs",
      description: "Select your preferred mode of transportation, compare costs, and book with ease in just a few taps.",
      image: <div className="relative w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
              <Car size={80} className="text-white" />
            </div>,
      backgroundColor: "bg-rideroot-secondary",
    },
    {
      title: "Secure Payments & Seamless Transactions",
      description: "Pay fast and experience payments the way you like with multiple options including Google Pay, Apple Pay, card, and in-app.",
      image: <div className="relative w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
              <Car size={80} className="text-white" />
            </div>,
      backgroundColor: "bg-rideroot-accent",
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/onboarding");
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const skipToOnboarding = () => {
    navigate("/onboarding");
  };

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-500 ${slides[currentSlide].backgroundColor}`}>
      {/* Skip button */}
      <div className="w-full flex justify-end p-4">
        <button 
          onClick={skipToOnboarding}
          className="text-white/70 hover:text-white p-2"
        >
          Skip
        </button>
      </div>

      {/* Main content */}
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center px-6 py-10 w-full"
        key={currentSlide}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image/Icon area */}
        <div className="mb-12 animate-bounce-soft">
          {slides[currentSlide].image}
        </div>

        {/* Text content */}
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-white mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-white/80 text-lg mb-10">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Indicators */}
        <div className="flex space-x-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex w-full max-w-xs justify-between mt-6">
          {currentSlide > 0 ? (
            <Button
              variant="outline"
              onClick={prevSlide}
              className="border-white text-white hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="mr-1" size={18} />
              Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout
          )}
          
          <Button
            onClick={nextSlide}
            className="bg-white text-rideroot-primary hover:bg-white/90"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            {currentSlide < slides.length - 1 && <ChevronRight className="ml-1" size={18} />}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
