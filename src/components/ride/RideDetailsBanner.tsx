import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Car, Navigation } from "lucide-react";

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
    switch (ridePhase) {
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

  // Helper function to get the appropriate icon
  const getIcon = () => {
    switch (ridePhase) {
      case "arriving":
        return <Clock size={20} className="text-rideroot-primary mr-2" />;
      case "arrived":
        return <Car size={20} className="text-green-500 mr-2" />;
      case "in_progress":
      case "approaching":
      case "almost_there":
        return <Navigation size={20} className="text-rideroot-accent mr-2" />;
      case "completed":
        return <MapPin size={20} className="text-green-500 mr-2" />;
      default:
        return <Clock size={20} className="text-rideroot-primary mr-2" />;
    }
  };

  // Helper function to get background color based on phase
  const getBgColor = () => {
    switch (ridePhase) {
      case "arriving":
        return "bg-white";
      case "arrived":
        return "bg-green-50";
      case "in_progress":
        return "bg-blue-50";
      case "approaching":
        return "bg-yellow-50";
      case "almost_there":
        return "bg-orange-50";
      case "completed":
        return "bg-green-50";
      default:
        return "bg-white";
    }
  };

  return (
    <motion.div 
      className="fixed top-16 left-0 right-0 flex justify-center z-30 px-4" 
      initial={{
        opacity: 0,
        y: -20
      }} 
      animate={{
        opacity: 1,
        y: 0
      }} 
      transition={{
        duration: 0.3
      }}
    >
      <div className={`${getBgColor()} py-2 px-4 rounded-lg shadow-md flex items-center justify-center max-w-md w-full`}>
        {getIcon()}
        <span className="text-sm font-medium">{getMessage()}</span>
      </div>
    </motion.div>
  );
};

export default RideDetailsBanner;
