
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DriverInfoCard from "./DriverInfoCard";
import RouteInfoCard from "./RouteInfoCard";
import AdditionalRideInfo from "./AdditionalRideInfo";
import type { Ride } from "@/contexts/AppContext"; // Add import for Ride type

// Update the interface to match the Ride type from AppContext
interface RideDetailsPanelProps {
  currentRide: Ride;
}

const RideDetailsPanel: React.FC<RideDetailsPanelProps> = ({ currentRide }) => {
  // Only render driver info if driver exists
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg pb-24">
      <ScrollArea className="h-72">
        <div className="p-4">
          {currentRide.driver && <DriverInfoCard driver={currentRide.driver} />}
          
          <RouteInfoCard 
            pickupLocation={currentRide.pickupLocation}
            dropoffLocation={currentRide.dropoffLocation}
            rideOption={currentRide.rideOption}
            capacityOption={currentRide.capacityOption}
            distance={currentRide.distance.toString()}
            fare={currentRide.fare}
          />
          
          <AdditionalRideInfo isSubscribed={false} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default RideDetailsPanel;
