import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Car, Navigation, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [isExpanded, setIsExpanded] = useState(true);

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

  return (
    <motion.div 
      className="fixed left-0 right-0 z-30 px-4 md:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1,
        y: isExpanded ? 64 : -120,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 30
        }
      }}
    >
      <div className={`bg-gradient-to-b ${getBgColor()} rounded-xl shadow-lg p-4 relative`}>
        <div className="flex items-center justify-between">
          {getIcon()}
          <span className="flex-1 mx-4 font-medium">{getMessage()}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-black/5"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 
              <ChevronUp className="h-5 w-5 text-gray-600" /> : 
              <ChevronDown className="h-5 w-5 text-gray-600" />
            }
          </Button>
        </div>
      </div>

      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full shadow-lg bg-white hover:bg-gray-50 border border-gray-200"
            onClick={() => setIsExpanded(true)}
          >
            <ChevronUp className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Show Details</span>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RideDetailsBanner;
