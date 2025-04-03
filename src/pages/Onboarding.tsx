
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Slide {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const slides: Slide[] = [
  {
    title: "Affordable Rides",
    description: "Enjoy fair prices with no hidden fees or surge pricing.",
    icon: "🚗",
    color: "bg-gradient-to-r from-rideroot-primary to-rideroot-accent",
  },
  {
    title: "Driver-First Model",
    description: "Our drivers choose their tier and keep more of what they earn.",
    icon: "👨‍✈️",
    color: "bg-gradient-to-r from-rideroot-secondary to-rideroot-primary",
  },
  {
    title: "Eco-Friendly Options",
    description: "Ride green and help reduce carbon emissions.",
    icon: "🌿",
    color: "bg-gradient-to-r from-rideroot-accent to-rideroot-secondary",
  },
];

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/signup");
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-rideroot-lightGrey to-white">
      {/* Header with logo */}
      <div className="pt-8 pb-4 flex justify-center">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rideroot-primary to-rideroot-secondary">
          RideRoot
        </div>
      </div>

      {/* Slides */}
      <motion.div 
        className="flex-1 flex flex-col items-center justify-center p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl mb-8 ${slides[currentSlide].color} animate-bounce-soft shadow-lg`}>
          {slides[currentSlide].icon}
        </div>

        <h1 className="text-2xl font-bold mb-3 text-rideroot-text animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-rideroot-primary to-rideroot-secondary">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-center text-rideroot-darkGrey mb-10 max-w-xs animate-fade-in">
          {slides[currentSlide].description}
        </p>

        {/* Indicators */}
        <div className="flex space-x-3 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-10 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary shadow-sm"
                  : "w-2.5 bg-rideroot-mediumGrey"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom navigation */}
      <div className="p-8 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-6">
          {currentSlide > 0 ? (
            <button
              onClick={prevSlide}
              className="flex items-center text-rideroot-darkGrey hover:text-rideroot-primary transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back</span>
            </button>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}

          {currentSlide < slides.length - 1 ? (
            <button
              onClick={nextSlide}
              className="flex items-center text-rideroot-primary font-medium hover:text-rideroot-secondary transition-colors"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}
        </div>

        <Button 
          onClick={goToSignup} 
          className="w-full mb-4 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary hover:opacity-90 transition-opacity text-white py-3 rounded-xl font-medium text-base"
        >
          Create Account
        </Button>
        
        <Button 
          onClick={goToSignIn} 
          variant="outline" 
          className="w-full border-2 border-rideroot-primary/30 text-rideroot-primary hover:bg-rideroot-primary/5"
        >
          Already have an account? Sign In
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
