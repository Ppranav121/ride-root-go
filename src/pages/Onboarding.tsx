
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Slide {
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Affordable Rides",
    description: "Enjoy fair prices with no hidden fees or surge pricing.",
    image: "🚗", // In a real app, we would use actual image paths
  },
  {
    title: "Driver-First Model",
    description: "Our drivers choose their tier and keep more of what they earn.",
    image: "👨‍✈️", // In a real app, we would use actual image paths
  },
  {
    title: "Eco-Friendly Options",
    description: "Ride green and help reduce carbon emissions.",
    image: "🌿", // In a real app, we would use actual image paths
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Slides */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-6xl mb-6 animate-fade-in">{slides[currentSlide].image}</div>
        <h1 className="text-2xl font-bold mb-2 text-rideroot-text animate-fade-in">
          {slides[currentSlide].title}
        </h1>
        <p className="text-center text-rideroot-darkGrey mb-8 animate-fade-in">
          {slides[currentSlide].description}
        </p>

        {/* Indicators */}
        <div className="flex space-x-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-rideroot-primary"
                  : "w-2 bg-rideroot-mediumGrey"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="p-6 border-t border-rideroot-mediumGrey">
        <div className="flex justify-between items-center mb-4">
          {currentSlide > 0 ? (
            <button
              onClick={prevSlide}
              className="flex items-center text-rideroot-darkGrey"
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
              className="flex items-center text-rideroot-primary font-medium"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          ) : (
            <div></div> // Empty div to maintain spacing
          )}
        </div>

        <button onClick={goToSignup} className="btn-primary w-full mb-3">
          Sign Up
        </button>
        <button onClick={goToSignIn} className="btn-outline w-full">
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
