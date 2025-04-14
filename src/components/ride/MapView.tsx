
import React from "react";
import { MapPin, Car, Navigation, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DriverLocationMarker from "./DriverLocationMarker";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface MapViewProps {
  driverPosition: { top: string; left: string };
  secondsLeft: number;
  onComplete: () => void;
  ridePhase?: "arriving" | "arrived" | "in_progress" | "approaching" | "almost_there" | "completed";
}

const MapView: React.FC<MapViewProps> = ({ 
  driverPosition, 
  secondsLeft, 
  onComplete,
  ridePhase = "arriving" 
}) => {
  const handleShareRide = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Track My Ride",
          text: "Follow my ride in real-time!",
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Ride link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Could not share ride at this time");
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
      {/* Map background - in a real app this would be an actual map */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200 z-0">
        {/* Grid lines for visual map effect */}
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-r border-blue-300/30 h-full" />
          ))}
        </div>
        <div className="grid grid-rows-8 w-full absolute top-0 bottom-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-b border-blue-300/30 w-full" />
          ))}
        </div>
      </div>
      
      {/* Road visualization */}
      <div className="absolute w-[60%] h-4 bg-gray-500/30 rounded-full rotate-[35deg] top-[40%] left-[20%] z-0" />
      
      {/* Active route visualization */}
      <motion.div 
        className="absolute w-[60%] h-2 bg-rideroot-primary/60 rounded-full rotate-[35deg] top-[40%] left-[20%] z-1"
        initial={{ width: "0%" }}
        animate={{ 
          width: ridePhase === "arriving" ? "20%" : 
                ridePhase === "arrived" ? "30%" :
                ridePhase === "in_progress" ? "50%" :
                ridePhase === "approaching" ? "70%" :
                ridePhase === "almost_there" ? "90%" : "100%"
        }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Starting point */}
      <div className="absolute bottom-[35%] left-[30%] z-10">
        <div className="w-6 h-6 bg-rideroot-primary rounded-full flex items-center justify-center shadow-lg">
          <MapPin size={16} className="text-white" />
        </div>
        <div className="bg-white px-2 py-0.5 rounded text-xs mt-1 shadow">Pickup</div>
      </div>
      
      {/* Destination point */}
      <div className="absolute top-[15%] right-[20%] z-10">
        <motion.div 
          animate={{ 
            scale: ridePhase === "approaching" || ridePhase === "almost_there" ? [1, 1.2, 1] : 1 
          }}
          transition={{ 
            repeat: ridePhase === "approaching" || ridePhase === "almost_there" ? Infinity : 0, 
            duration: 1.5 
          }}
          className="w-6 h-6 bg-rideroot-accent rounded-full flex items-center justify-center shadow-lg"
        >
          <Navigation size={16} className="text-white" />
        </motion.div>
        <div className="bg-white px-2 py-0.5 rounded text-xs mt-1 shadow">Destination</div>
      </div>
      
      {/* Driver's car icon on map */}
      <DriverLocationMarker position={driverPosition} />
      
      {/* Progress indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-4 py-2 rounded-lg shadow-md z-20 flex items-center">
        <Car size={16} className="text-rideroot-primary mr-2" />
        <span className="text-sm font-medium">
          {ridePhase === "arriving" ? `Arriving in ${secondsLeft}s` : 
           ridePhase === "arrived" ? "Driver arrived" :
           ridePhase === "in_progress" ? "Ride in progress" :
           ridePhase === "approaching" ? "5 min to arrival" :
           ridePhase === "almost_there" ? "2 min to arrival" : "Arrived"}
        </span>
      </div>

      {/* Share ride button - Only show during ride */}
      {(ridePhase === "in_progress" || ridePhase === "approaching" || ridePhase === "almost_there") && (
        <Button
          onClick={handleShareRide}
          variant="default"
          className="absolute top-4 right-4 bg-white text-rideroot-primary hover:bg-white/90 shadow-lg z-20"
        >
          <Share2 size={16} className="mr-2" />
          Share Ride
        </Button>
      )}
      
      {/* Safety Tips - Show during ride */}
      {(ridePhase === "in_progress" || ridePhase === "approaching" || ridePhase === "almost_there") && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg z-20 w-[90%] max-w-md">
          <h3 className="font-semibold mb-2 text-rideroot-primary">During Your Ride</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-rideroot-primary rounded-full mr-2" />
              Share your trip with trusted contacts
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-rideroot-primary rounded-full mr-2" />
              Keep an eye on the route using the map
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-rideroot-primary rounded-full mr-2" />
              Emergency button available if needed
            </li>
          </ul>
        </div>
      )}
      
      {/* Developer controls - should be removed in production */}
      <Button
        variant="default"
        className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 text-xs"
        onClick={onComplete}
      >
        Complete Ride ({secondsLeft}s)
      </Button>
    </div>
  );
};

export default MapView;
