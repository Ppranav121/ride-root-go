
import React from "react";
import { motion } from "framer-motion";

interface MapBackgroundProps {
  children?: React.ReactNode;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Map background with blur effect */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-73.9857,40.7484,12,0/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center blur-[2px]"></div>
      
      {/* Gradient overlays for better contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-rideroot-primary/20 via-black/40 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      
      {/* Animated dots pattern overlay for an elegant touch */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 2px, transparent 0)',
          backgroundSize: '30px 30px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '30px 30px']
        }}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity
        }}
      />
      
      {children}
    </div>
  );
};

export default MapBackground;
