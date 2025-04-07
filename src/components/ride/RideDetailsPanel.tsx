
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DriverInfoCard from "./DriverInfoCard";
import RouteInfoCard from "./RouteInfoCard";
import AdditionalRideInfo from "./AdditionalRideInfo";
import { Ride } from "@/contexts/AppContext"; // Updated import to use the exported type
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface RideDetailsPanelProps {
  currentRide: Ride;
}

const RideDetailsPanel: React.FC<RideDetailsPanelProps> = ({ currentRide }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-white to-rideroot-lightGrey rounded-t-3xl shadow-lg pb-24 border-t border-rideroot-mediumGrey/30">
      <div className="mx-auto mt-2 h-1.5 w-[60px] rounded-full bg-rideroot-mediumGrey/50" />
      
      <div className="px-4 pt-3 pb-2">
        <h3 className="text-lg font-semibold text-rideroot-text">Ride Details</h3>
      </div>
      
      <ScrollArea className="h-72 smooth-scroll">
        <div className="p-4 scrollable">
          <div className="scroll-item mb-4">
            {currentRide.driver && <DriverInfoCard driver={currentRide.driver} />}
          </div>
          
          <div className="scroll-item mb-4">
            <RouteInfoCard 
              pickupLocation={currentRide.pickupLocation}
              dropoffLocation={currentRide.dropoffLocation}
              rideOption={currentRide.rideOption}
              capacityOption={currentRide.capacityOption}
              distance={currentRide.distance.toString()}
              fare={currentRide.fare}
            />
          </div>
          
          <div className="scroll-item">
            <AdditionalRideInfo isSubscribed={false} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RideDetailsPanel;
