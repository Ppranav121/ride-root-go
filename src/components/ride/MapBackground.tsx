
import React from "react";
import { motion } from "framer-motion";

interface MapBackgroundProps {
  children?: React.ReactNode;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Dark themed map background with custom styling - using a more vibrant night style */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-73.9857,40.7484,12,0/1200x800?access_token=pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2pwZzVrZjJtMDMyZDN2cDdzOXpicTlidiJ9.wNmgYFwBEKK8hD0dPrJcRA')] bg-cover bg-center"></div>
      
      {/* Enhanced gradient overlays with more vibrant RideRoot theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-rideroot-primary/25 to-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      
      {/* Animated grid pattern overlay with more vibrant colors */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(138, 43, 226, 0.6) 2px, transparent 0)',
          backgroundSize: '30px 30px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '30px 30px']
        }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Infinity
        }}
      />
      
      {/* Additional animated pulse effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity
        }}
      >
        <div className="h-full w-full bg-gradient-radial from-rideroot-primary/20 via-transparent to-transparent"></div>
      </motion.div>
      
      {children}
    </div>
  );
};

export default MapBackground;
