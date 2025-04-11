
import React from "react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import MapBackground from "@/components/ride/MapBackground";
import HotspotOverlay from "@/components/ride/HotspotOverlay";
import DriverLocationMarker from "@/components/ride/DriverLocationMarker";

interface EnhancedMapViewProps {
  showHotspots: boolean;
  hotspots: {
    id: number;
    location: { top: string; left: string };
    demandLevel: "high" | "medium" | "low";
  }[];
  driverPosition?: { top: string; left: string };
  children?: React.ReactNode;
}

const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({ 
  showHotspots, 
  hotspots,
  driverPosition = { top: "50%", left: "50%" },
  children
}) => {
  return (
    <div className="absolute inset-0 z-0">
      <MapBackground>
        {showHotspots && (
          <HotspotOverlay hotspots={hotspots} />
        )}
        
        <DriverLocationMarker position={driverPosition} />
        
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
          className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-indigo-500/20"
        />
        
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} 
          className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-purple-500/20"
        />
        
        {children}
      </MapBackground>
    </div>
  );
};

export default EnhancedMapView;
