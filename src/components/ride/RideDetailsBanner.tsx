
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Car, Navigation, CheckCircle, Shield } from "lucide-react";

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

  const getIcon = () => {
    switch (ridePhase) {
      case "arriving":
        return <Clock size={24} className="text-rideroot-primary" />;
      case "arrived":
        return <Car size={24} className="text-green-500" />;
      case "in_progress":
        return <Navigation size={24} className="text-rideroot-accent" />;
      case "approaching":
        return <Navigation size={24} className="text-yellow-500" />;
      case "almost_there":
        return <Navigation size={24} className="text-orange-500" />;
      case "completed":
        return <CheckCircle size={24} className="text-green-500" />;
      default:
        return <Clock size={24} className="text-rideroot-primary" />;
    }
  };

  const getBgColor = () => {
    switch (ridePhase) {
      case "arriving":
        return "from-white to-blue-50";
      case "arrived":
        return "from-white to-green-50";
      case "in_progress":
        return "from-white to-blue-50";
      case "approaching":
        return "from-white to-yellow-50";
      case "almost_there":
        return "from-white to-orange-50";
      case "completed":
        return "from-white to-green-50";
      default:
        return "from-white to-blue-50";
    }
  };

  return (
    <motion.div 
      className="fixed top-16 left-0 right-0 flex justify-center z-30 px-4" 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`bg-gradient-to-b ${getBgColor()} py-4 px-6 rounded-2xl shadow-lg flex flex-col items-center justify-center max-w-md w-full border border-gray-100`}>
        <div className="flex items-center justify-center w-full space-x-3">
          {getIcon()}
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{getMessage()}</span>
            {ridePhase === "in_progress" && (
              <span className="text-sm text-gray-500">Keep following the route</span>
            )}
          </div>
          
          {ridePhase === "in_progress" && (
            <motion.button 
              className="ml-auto bg-blue-100 p-2 rounded-full"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Shield size={20} className="text-blue-600" />
            </motion.button>
          )}
        </div>
        
        {(ridePhase === "approaching" || ridePhase === "almost_there") && (
          <motion.div 
            className="w-full bg-gray-200 rounded-full h-1.5 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="bg-yellow-500 h-1.5 rounded-full" 
              initial={{ width: "0%" }}
              animate={{ width: ridePhase === "approaching" ? "70%" : "90%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RideDetailsBanner;
