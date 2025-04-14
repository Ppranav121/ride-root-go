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
        return "Driver has arrived";
      case "in_progress":
        return `${minutesToDestination} mins to destination`;
      case "approaching":
        return "5 mins to destination";
      case "almost_there":
        return "Almost there! 2 mins left";
      case "completed":
        return "You've arrived";
      default:
        return `Driver arriving in ${secondsLeft} seconds`;
    }
  };
  const getIcon = () => {
    switch (ridePhase) {
      case "arriving":
        return <Clock size={20} className="text-rideroot-primary" />;
      case "arrived":
        return <Car size={20} className="text-green-500" />;
      case "in_progress":
        return <Navigation size={20} className="text-rideroot-accent" />;
      case "approaching":
        return <Navigation size={20} className="text-yellow-500" />;
      case "almost_there":
        return <Navigation size={20} className="text-orange-500" />;
      case "completed":
        return <CheckCircle size={20} className="text-green-500" />;
      default:
        return <Clock size={20} className="text-rideroot-primary" />;
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
  return <motion.div className="fixed top-16 left-0 right-0 flex justify-center z-30 px-4 md:px-6" initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
      
    </motion.div>;
};
export default RideDetailsBanner;