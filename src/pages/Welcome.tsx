
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, MapPin, Shield } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface OnboardingSlide {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Add a small delay to ensure smooth animation on mount
    setTimeout(() => setIsLoaded(true), 100);
  }, []);
  
  const slides: OnboardingSlide[] = [
    {
      title: "Welcome to RideRoot",
      description: "Your journey, your way. Get ready for a seamless ride experience.",
      icon: <Car size={72} className="text-white" />,
      color: "bg-gradient-to-br from-rideroot-primary to-rideroot-secondary",
    },
    {
      title: "Find Your Perfect Ride",
      description: "Choose from various ride options tailored to your needs and budget.",
      icon: <MapPin size={72} className="text-white" />,
      color: "bg-gradient-to-br from-rideroot-secondary to-rideroot-accent",
    },
    {
      title: "Safe & Secure",
      description: "Enjoy peace of mind with our verified drivers and secure payment options.",
      icon: <Shield size={72} className="text-white" />,
      color: "bg-gradient-to-br from-rideroot-accent to-rideroot-primary",
    },
  ];

  const skipToOnboarding = () => {
    navigate("/onboarding");
  };

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate("/onboarding");
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen w-screen flex flex-col"
        >
          {/* Skip button */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 right-6 z-20"
          >
            <Button 
              variant="outline" 
              onClick={skipToOnboarding}
              className="text-gray-800 bg-white/80 backdrop-blur-sm hover:bg-white/90 border-none rounded-full px-6"
            >
              Skip
            </Button>
          </motion.div>

          {/* Main carousel */}
          <Carousel 
            className="w-full h-full" 
            onSelect={(index) => {
              setCurrentSlide(index);
            }}
            defaultIndex={currentSlide}
          >
            <CarouselContent className="h-screen">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="h-full">
                  <div className={`w-full h-full flex flex-col items-center justify-center px-8 py-16 ${currentSlide === index ? slide.color : "bg-white"} transition-colors duration-700`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="flex flex-col items-center max-w-md text-center"
                    >
                      {/* Icon with background */}
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                        className="bg-white/20 p-10 rounded-full mb-16 shadow-xl backdrop-blur-sm"
                      >
                        {slide.icon}
                      </motion.div>
                      
                      {/* Text content */}
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-5xl font-bold text-white mb-8 font-heading"
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-white/90 text-xl font-light leading-relaxed"
                      >
                        {slide.description}
                      </motion.p>
                    </motion.div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Bottom navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-0 left-0 right-0 p-8 pt-16 bg-gradient-to-t from-black/20 via-black/10 to-transparent backdrop-blur-sm"
          >
            <div className="flex flex-col items-center">
              {/* Dots */}
              <div className="flex justify-center space-x-2 mb-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`transition-all duration-500 rounded-full ${
                      index === currentSlide
                        ? "w-12 h-3 bg-white shadow-glow" 
                        : "w-3 h-3 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next/Get Started button */}
              <Button
                onClick={handleNext}
                className="w-full max-w-xs bg-white text-rideroot-primary hover:bg-white/90 hover:scale-105 transition-transform duration-300 rounded-full py-7 text-lg shadow-lg font-medium"
              >
                {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                <ChevronRight className="ml-1 animate-pulse" size={20} />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePage;
