
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
        return <Navigation size={20} className="text-rideroot-accent mr-2" />;
      case "approaching":
        return <Navigation size={20} className="text-yellow-500 mr-2" />;
      case "almost_there":
        return <Navigation size={20} className="text-orange-500 mr-2" />;
      case "completed":
        return <CheckCircle size={20} className="text-green-500 mr-2" />;
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

  // Helper function to get additional info based on phase
  const getAdditionalInfo = () => {
    switch (ridePhase) {
      case "arriving":
        return secondsLeft < 60 ? "Driver is nearby!" : null;
      case "arrived":
        return "Meet your driver at the pickup point";
      case "in_progress":
        return "On the way to your destination";
      case "approaching":
        return "Getting closer to your destination";
      case "almost_there":
        return "Prepare to exit the vehicle soon";
      case "completed":
        return "Thank you for riding with us!";
      default:
        return null;
    }
  };

  const additionalInfo = getAdditionalInfo();

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
      <div className={`${getBgColor()} py-3 px-5 rounded-xl shadow-lg flex flex-col items-center justify-center max-w-md w-full border border-gray-100`}>
        <div className="flex items-center justify-center w-full">
          {getIcon()}
          <span className="text-base font-medium">{getMessage()}</span>
          
          {ridePhase === "in_progress" && (
            <motion.button 
              className="ml-auto bg-blue-100 p-1.5 rounded-full"
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Shield size={16} className="text-blue-600" />
            </motion.button>
          )}
        </div>
        
        {additionalInfo && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
            className="text-xs text-gray-500 mt-1 w-full text-center"
          >
            {additionalInfo}
          </motion.div>
        )}
        
        {ridePhase === "approaching" || ridePhase === "almost_there" ? (
          <motion.div 
            className="w-full bg-gray-200 rounded-full h-1 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="bg-yellow-500 h-1 rounded-full" 
              initial={{ width: "0%" }}
              animate={{ 
                width: ridePhase === "approaching" ? "70%" : "90%" 
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default RideDetailsBanner;
