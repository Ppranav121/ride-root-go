
import React from "react";
import { Car } from "lucide-react";
import { motion } from "framer-motion";

interface DriverPulseAnimationProps {
  driverFound: boolean;
}

const DriverPulseAnimation: React.FC<DriverPulseAnimationProps> = ({ driverFound }) => {
  if (driverFound) {
    return (
      <motion.div
        className="relative w-28 h-28 rounded-full bg-green-500/20 flex items-center justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260, 
          damping: 20 
        }}
      >
        <motion.div 
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg"
          animate={{
            boxShadow: ["0px 0px 10px rgba(34, 197, 94, 0.3)", "0px 0px 20px rgba(34, 197, 94, 0.6)", "0px 0px 10px rgba(34, 197, 94, 0.3)"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Car size={32} className="text-white" />
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-rideroot-primary/30"
        animate={{
          scale: [1, 2.5],
          opacity: [0.7, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ left: "calc(50% - 20px)", top: "calc(50% - 20px)", transform: "translate(-50%, -50%)" }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-rideroot-primary/20"
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
        style={{ left: "calc(50% - 20px)", top: "calc(50% - 20px)", transform: "translate(-50%, -50%)" }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-rideroot-primary/30"
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
        style={{ left: "calc(50% - 20px)", top: "calc(50% - 20px)", transform: "translate(-50%, -50%)" }}
      />
      <motion.div 
        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-rideroot-primary to-rideroot-secondary flex items-center justify-center shadow-lg z-10"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Car size={30} className="text-white" />
      </motion.div>
    </div>
  );
};

export default DriverPulseAnimation;
