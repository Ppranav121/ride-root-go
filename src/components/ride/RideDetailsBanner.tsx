
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

interface RideDetailsBannerProps {
  secondsLeft: number;
  ridePhase?: "arriving" | "arrived" | "in_progress" | "approaching" | "almost_there" | "completed";
  minutesToDestination?: number;
}

const RideDetailsBanner: React.FC<RideDetailsBannerProps> = ({ 
  secondsLeft,
  ridePhase = "arriving",
  minutesToDestination = 0
}) => {
  // Helper function to get the appropriate message based on ride phase
  const getMessage = () => {
    switch(ridePhase) {
      case "arriving":
        return `Driver arriving in ${secondsLeft} seconds`;
      case "arrived":
        return "Your driver has arrived";
      case "in_progress":
        return `${minutesToDestination} minutes to destination`;
      case "approaching":
        return "5 minutes to destination";
      case "almost_there":
        return "Almost there! 2 minutes to destination";
      case "completed":
        return "You have arrived at your destination";
      default:
        return `Driver arriving in ${secondsLeft} seconds`;
    }
  };

  return (
    <motion.div 
      className="absolute top-16 left-0 right-0 flex justify-center z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center max-w-[90%]">
        {ridePhase === "arriving" || ridePhase === "arrived" ? (
          <Clock size={20} className="text-rideroot-primary mr-2" />
        ) : (
          <MapPin size={20} className="text-rideroot-accent mr-2" />
        )}
        <span className="font-medium text-sm text-rideroot-text">
          {getMessage()}
        </span>
      </div>
    </motion.div>
  );
};

export default RideDetailsBanner;
