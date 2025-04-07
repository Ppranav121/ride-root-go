
import React from "react";
import { Car } from "lucide-react";
import { motion } from "framer-motion";

interface DriverLocationMarkerProps {
  position: { top: string; left: string };
}

const DriverLocationMarker: React.FC<DriverLocationMarkerProps> = ({ position }) => {
  return (
    <motion.div 
      className="absolute w-10 h-10 bg-rideroot-primary rounded-full flex items-center justify-center shadow-lg"
      style={{ 
        top: position.top, 
        left: position.left,
      }}
      animate={{ 
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      <Car size={20} className="text-white" />
    </motion.div>
  );
};

export default DriverLocationMarker;
