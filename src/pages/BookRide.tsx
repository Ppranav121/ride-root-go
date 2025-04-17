
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import RootHeader from "@/components/RootHeader";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationSearchContainer from "@/components/ride/LocationSearchContainer";
import RideBookingForm from "@/components/ride/RideBookingForm";

interface LocationState {
  dropoffLocation?: string;
}

const BookRide: React.FC = () => {
  const location = useLocation();
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [mapInteractionEnabled, setMapInteractionEnabled] = useState(true);

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

  return (
    <div className="flex flex-col h-screen bg-rideroot-lightGrey">
      <RootHeader title="Book a Ride" />

      <div className="flex-1 relative">
        {/* Interactive Map Area */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          {/* Map view with click handler for pin dropping */}
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
            <p className="text-rideroot-darkGrey">Map view would appear here</p>
            <p className="text-rideroot-darkGrey mt-6">Tap on map to pin a location</p>
            
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
        </div>

        {/* Ride Booking Interface */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl"
          style={{ maxHeight: "70vh" }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ScrollArea className="h-[70vh] w-full">
            <div className="pt-6">
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
            </div>
          </ScrollArea>
        </motion.div>
      </div>
    </div>
  );
};

export default BookRide;
