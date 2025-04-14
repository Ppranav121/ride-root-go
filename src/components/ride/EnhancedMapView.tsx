
import React from "react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";
import MapBackground from "@/components/ride/MapBackground";
import HotspotOverlay from "@/components/ride/HotspotOverlay";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface EnhancedMapViewProps {
  showHotspots: boolean;
  hotspots: {
    id: number;
    location: { top: string; left: string };
    demandLevel: "high" | "medium" | "low";
  }[];
  driverPosition?: { top: string; left: string };
  children?: React.ReactNode;
  allowScroll?: boolean;
}

const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({ 
  showHotspots, 
  hotspots,
  driverPosition = { top: "50%", left: "50%" },
  children,
  allowScroll = false
}) => {
  return (
    <div className={`absolute inset-0 z-0 ${allowScroll ? 'overflow-auto' : ''}`}>
      <MapBackground>
        {showHotspots && (
          <HotspotOverlay hotspots={hotspots} />
        )}
        
        {/* Integrated driver location marker */}
        <motion.div 
          className="absolute z-20 flex flex-col items-center"
          style={{ ...driverPosition }}
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
          <Avatar className="w-10 h-10 border-2 border-white shadow-md mb-1">
            <AvatarImage src="/placeholder.svg" alt="Driver" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div className="w-8 h-8 bg-rideroot-primary rounded-full flex items-center justify-center shadow-lg">
            <Car size={16} className="text-white" />
          </div>
        </motion.div>
        
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
