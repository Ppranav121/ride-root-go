
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Car, MapPin, Shield } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
  
  const slides: OnboardingSlide[] = [
    {
      title: "Welcome to RideRoot",
      description: "Your journey, your way. Get ready for a seamless ride experience.",
      icon: <Car size={64} className="text-white" />,
      color: "bg-gradient-to-br from-rideroot-primary to-rideroot-secondary",
    },
    {
      title: "Find Your Perfect Ride",
      description: "Choose from various ride options tailored to your needs and budget.",
      icon: <MapPin size={64} className="text-white" />,
      color: "bg-gradient-to-br from-rideroot-secondary to-rideroot-accent",
    },
    {
      title: "Safe & Secure",
      description: "Enjoy peace of mind with our verified drivers and secure payment options.",
      icon: <Shield size={64} className="text-white" />,
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
    <div className="min-h-screen flex flex-col">
      {/* Skip button */}
      <div className="absolute top-4 right-4 z-10">
        <Button 
          variant="ghost" 
          onClick={skipToOnboarding}
          className="text-gray-600 hover:text-gray-900"
        >
          Skip
        </Button>
      </div>

      {/* Main carousel */}
      <Carousel className="w-full flex-1 flex items-center justify-center" 
        setApi={(api) => {
          api?.on('select', () => {
            setCurrentSlide(api.selectedScrollSnap());
          });
        }}>
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${currentSlide === index ? slide.color : "bg-white"} transition-colors duration-500`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center max-w-md text-center"
                >
                  {/* Icon with background */}
                  <div className="bg-white/20 p-8 rounded-full mb-10 animate-bounce-soft">
                    {slide.icon}
                  </div>
                  
                  {/* Text content */}
                  <h1 className="text-4xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-white/90 text-lg mb-12">
                    {slide.description}
                  </p>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/10 to-transparent">
        <div className="flex flex-col items-center">
          {/* Dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-8 h-2 bg-rideroot-primary" 
                    : "w-2 h-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next/Get Started button */}
          <Button
            onClick={handleNext}
            className="w-full max-w-xs bg-rideroot-primary hover:bg-rideroot-primary/90 text-white"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="ml-1" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
