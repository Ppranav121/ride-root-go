
import React from "react";
import { motion } from "framer-motion";

interface MapBackgroundProps {
  children?: React.ReactNode;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Map background with blur effect */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-73.9857,40.7484,12,0/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center blur-[1px]"></div>
      
      {/* Gradient overlays for better contrast and depth - using rideroot colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-rideroot-primary/30 via-rideroot-secondary/20 to-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      
      {/* Animated dots pattern overlay using rideroot accent color */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.6) 2px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '24px 24px']
        }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Infinity
        }}
      />
      
      {children}
    </div>
  );
};

export default MapBackground;
