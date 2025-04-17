
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import RootHeader from "@/components/RootHeader";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationSearchContainer from "@/components/ride/LocationSearchContainer";
import RideBookingForm from "@/components/ride/RideBookingForm";
import BottomNav from "@/components/BottomNav";

interface LocationState {
  dropoffLocation?: string;
}

const BookRide: React.FC = () => {
  const location = useLocation();
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [panelExpanded, setPanelExpanded] = useState(true);

  // Get pre-selected location from navigation state if available
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.dropoffLocation) {
      setDropoffLocation(state.dropoffLocation);
      
      toast.success("Destination selected", {
        description: state.dropoffLocation,
        duration: 2000,
      });
    }
  }, [location]);

  const togglePanel = () => {
    setPanelExpanded(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-rideroot-lightGrey">
      <RootHeader title="Book a Ride" />

      <div className="flex-1 relative">
        {/* Map Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
          <p className="text-rideroot-darkGrey">Map view would appear here</p>
          
          {/* Map Pins Animation */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute w-6 h-6 bg-rideroot-primary rounded-full top-1/3 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
          >
            <div className="absolute w-6 h-6 bg-rideroot-primary rounded-full animate-ping opacity-75"></div>
            <MapPin size={16} className="text-white" />
          </motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute w-6 h-6 bg-rideroot-accent rounded-full bottom-1/3 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
          >
            <MapPin size={16} className="text-white" />
          </motion.div>
        </div>

        {/* Toggle Button for Panel */}
        <motion.button
          className="absolute left-1/2 transform -translate-x-1/2 top-3 z-40 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
          onClick={togglePanel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-1 bg-rideroot-mediumGrey rounded-full" />
        </motion.button>

        {/* Ride Booking Interface */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl"
          style={{ maxHeight: panelExpanded ? "70vh" : "90px" }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            height: panelExpanded ? "auto" : "90px",
            transition: { duration: 0.5 }
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ScrollArea className={`${panelExpanded ? 'h-[70vh]' : 'h-[90px]'} w-full overflow-hidden`}>
            <div className={`${panelExpanded ? 'pt-6' : 'pt-3 px-4'}`}>
              {!panelExpanded ? (
                <div className="flex items-center">
                  <div className="bg-rideroot-primary/10 p-3 rounded-full mr-3">
                    <MapPin size={20} className="text-rideroot-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-rideroot-darkGrey">Search destination</p>
                    <p className="font-medium">{dropoffLocation || "Where to?"}</p>
                  </div>
                </div>
              ) : (
                <>
                  <LocationSearchContainer
                    pickupLocation={pickupLocation}
                    dropoffLocation={dropoffLocation}
                    onPickupChange={setPickupLocation}
                    onDropoffChange={setDropoffLocation}
                  />
                  
                  <RideBookingForm
                    pickupLocation={pickupLocation}
                    dropoffLocation={dropoffLocation}
                  />
                </>
              )}
            </div>
          </ScrollArea>
        </motion.div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default BookRide;
