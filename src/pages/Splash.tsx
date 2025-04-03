
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Car } from "lucide-react";

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/home");
      } else {
        navigate("/onboarding");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rideroot-primary via-rideroot-secondary to-rideroot-accent p-4">
      <div className="flex flex-col items-center space-y-6">
        <div className="bg-white p-4 rounded-full animate-bounce-soft mb-2">
          <Car size={42} className="text-rideroot-primary" />
        </div>
        
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-2 animate-fade-in">RideRoot</div>
          <div className="text-xl text-white/80 text-center animate-fade-in opacity-0" style={{ animationDelay: "300ms" }}>
            Your journey, your way
          </div>
        </div>
        
        <div className="w-16 h-1 bg-white/30 rounded-full mt-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-pulse-scale" />
        </div>
      </div>
    </div>
  );
};

export default Splash;
