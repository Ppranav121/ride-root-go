
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, MessageCircle, Phone, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Ride } from "@/contexts/AppContext"; 
import { toast } from "sonner";

interface RideDetailsPanelProps {
  currentRide: Ride;
}

const RideDetailsPanel: React.FC<RideDetailsPanelProps> = ({ currentRide }) => {
  const [expanded, setExpanded] = useState(false);

  const handleShareDriver = async () => {
    try {
      const driverInfo = `${currentRide.driver?.name} - ${currentRide.driver?.vehicleType} (${currentRide.driver?.licensePlate})`;
      
      if (navigator.share) {
        await navigator.share({
          title: "My RideRoot Driver",
          text: `My driver is ${driverInfo}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`My RideRoot driver: ${driverInfo}\n${window.location.href}`);
        toast.success("Driver details copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Could not share driver details");
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-b-3xl shadow-lg border-b border-rideroot-mediumGrey/30 z-20"
      animate={{ 
        height: expanded ? "70vh" : "auto",
        transition: { type: "spring", stiffness: 300, damping: 30 }
      }}
    >
      {currentRide.driver && (
        <motion.div 
          className="px-4 py-3"
          layout
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Driver is heading to your location...</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Driver will arriving in 1 min...</p>
          
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
              <Button size="icon" variant="outline" className="rounded-full h-9 w-9" onClick={handleShareDriver}>
                <Share2 size={18} />
              </Button>
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
      
      <div 
        className="flex flex-col items-center pb-2 pt-1 cursor-pointer border-t border-gray-100" 
        onClick={() => setExpanded(!expanded)}
      >
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {expanded ? <ChevronDown size={20} className="text-gray-500" /> : <ChevronUp size={20} className="text-gray-500" />}
        </motion.div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScrollArea className="px-4 py-3 h-[calc(70vh-160px)]">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Trip Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Trip Fare</span>
                      <span className="font-medium">${currentRide.fare.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distance</span>
                      <span className="font-medium">{currentRide.distance} miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ride Option</span>
                      <span className="font-medium">{currentRide.rideOption}</span>
                    </div>
                  </div>
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
