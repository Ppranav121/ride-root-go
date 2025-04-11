
import React from "react";
import { motion } from "framer-motion";

interface HotspotProps {
  hotspots: {
    id: number;
    location: {
      top: string;
      left: string;
    };
    demandLevel: "low" | "medium" | "high";
  }[];
}

const HotspotOverlay: React.FC<HotspotProps> = ({ hotspots }) => {
  // Map demand level to color and size
  const getHotspotStyles = (demandLevel: string) => {
    switch (demandLevel) {
      case "high":
        return {
          color: "rgba(239, 68, 68, 0.7)", // red
          size: "w-32 h-32",
          pulseSize: [1, 1.2, 1]
        };
      case "medium":
        return {
          color: "rgba(249, 115, 22, 0.6)", // orange
          size: "w-24 h-24",
          pulseSize: [1, 1.15, 1]
        };
      case "low":
        return {
          color: "rgba(234, 179, 8, 0.5)", // yellow
          size: "w-20 h-20",
          pulseSize: [1, 1.1, 1]
        };
      default:
        return {
          color: "rgba(234, 179, 8, 0.5)",
          size: "w-20 h-20",
          pulseSize: [1, 1.1, 1]
        };
    }
  };

  return (
    <>
      {hotspots.map((hotspot) => {
        const styles = getHotspotStyles(hotspot.demandLevel);
        
        return (
          <div 
            key={hotspot.id}
            className="absolute" 
            style={{ 
              top: hotspot.location.top, 
              left: hotspot.location.left 
            }}
          >
            <motion.div
              animate={{ 
                scale: styles.pulseSize,
                opacity: [0.7, 0.9, 0.7]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className={`rounded-full ${styles.size}`}
              style={{ backgroundColor: styles.color }}
            />
            
            {/* Inner pulse effect */}
            <motion.div
              animate={{ 
                scale: [0.8, 1.1, 0.8],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5
              }}
              className={`rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                hotspot.demandLevel === "high" ? "w-16 h-16" :
                hotspot.demandLevel === "medium" ? "w-12 h-12" : "w-10 h-10"
              }`}
              style={{ 
                backgroundColor: styles.color, 
                filter: "brightness(1.2)" 
              }}
            />
            
            {/* Text label for high demand only */}
            {hotspot.demandLevel === "high" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-0.5 rounded text-xs font-medium shadow-sm"
              >
                High Demand
              </motion.div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default HotspotOverlay;
