
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

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
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-rideroot-primary p-4">
      <div className="animate-pulse-scale">
        <div className="text-5xl font-bold text-white mb-2">RideRoot</div>
        <div className="text-xl text-white text-center">Your ride, your way</div>
      </div>
    </div>
  );
};

export default Splash;
