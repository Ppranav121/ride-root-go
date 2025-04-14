
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DriverInfoCard from "./DriverInfoCard";
import RouteInfoCard from "./RouteInfoCard";
import AdditionalRideInfo from "./AdditionalRideInfo";
import { Ride } from "@/contexts/AppContext"; 
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, MessageCircle, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RideDetailsPanelProps {
  currentRide: Ride;
}

const RideDetailsPanel: React.FC<RideDetailsPanelProps> = ({ currentRide }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg border-t border-rideroot-mediumGrey/30 z-20"
      animate={{ 
        height: expanded ? "70vh" : "auto",
        transition: { type: "spring", stiffness: 300, damping: 30 }
      }}
    >
      <div 
        className="flex flex-col items-center pb-2 pt-3 cursor-pointer" 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="h-1.5 w-12 rounded-full bg-gray-300 mb-2"></div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {expanded ? <ChevronDown size={20} className="text-gray-500" /> : <ChevronUp size={20} className="text-gray-500" />}
        </motion.div>
      </div>
      
      {currentRide.driver && (
        <motion.div 
          className="px-4 py-3 border-b border-gray-100"
          layout
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-rideroot-primary rounded-full flex items-center justify-center text-white mr-3">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-semibold">{currentRide.driver.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{currentRide.driver.vehicleType}</span>
                  <span className="mx-1.5">•</span>
                  <span>{currentRide.driver.licensePlate}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <MessageCircle size={18} />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
                <Phone size={18} />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScrollArea className="px-4 py-3 h-[calc(70vh-160px)]">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-sm text-gray-500">ROUTE DETAILS</h4>
                  <RouteInfoCard 
                    pickupLocation={currentRide.pickupLocation}
                    dropoffLocation={currentRide.dropoffLocation}
                    rideOption={currentRide.rideOption}
                    capacityOption={currentRide.capacityOption}
                    distance={currentRide.distance}
                    fare={currentRide.fare}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-sm text-gray-500">ADDITIONAL INFORMATION</h4>
                  <AdditionalRideInfo isSubscribed={false} />
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RideDetailsPanel;
