
import React from "react";
import { motion } from "framer-motion";

interface MapBackgroundProps {
  children?: React.ReactNode;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Dark themed map background with custom styling */}
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/static/-73.9857,40.7484,12,0/1200x800?access_token=YOUR_TOKEN')] bg-cover bg-center"></div>
      
      {/* Enhanced gradient overlays using RideRoot theme colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-rideroot-primary/20 via-rideroot-secondary/15 to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      
      {/* Animated grid pattern overlay */}
      <motion.div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(90, 99, 244, 0.4) 2px, transparent 0)',
          backgroundSize: '30px 30px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '30px 30px']
        }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity
        }}
      />
      
      {children}
    </div>
  );
};

export default MapBackground;
