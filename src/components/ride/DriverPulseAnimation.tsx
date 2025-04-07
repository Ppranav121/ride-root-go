
import React from "react";
import { Car } from "lucide-react";
import { motion } from "framer-motion";

interface DriverPulseAnimationProps {
  driverFound: boolean;
}

const DriverPulseAnimation: React.FC<DriverPulseAnimationProps> = ({ driverFound }) => {
  if (driverFound) return null;
  
  return (
    <div className="relative">
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-green-500/20"
        animate={{
          scale: [1, 2.5],
          opacity: [0.7, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ left: "-20px", top: "-20px" }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-green-500/20"
        animate={{
          scale: [1, 2.2],
          opacity: [0.7, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay: 0.5
        }}
        style={{ left: "-20px", top: "-20px" }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-green-500/20"
        animate={{
          scale: [1, 2],
          opacity: [0.7, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
        style={{ left: "-20px", top: "-20px" }}
      />
      <div className="relative w-24 h-24 rounded-full bg-green-500/30 flex items-center justify-center">
        <motion.div 
          className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Car size={28} className="text-white" />
        </motion.div>
      </div>
    </div>
  );
};

export default DriverPulseAnimation;
