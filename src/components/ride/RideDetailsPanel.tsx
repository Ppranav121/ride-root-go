
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DriverInfoCard from "./DriverInfoCard";
import RouteInfoCard from "./RouteInfoCard";
import AdditionalRideInfo from "./AdditionalRideInfo";

interface RideDetailsPanelProps {
  currentRide: {
    driver: {
      name: string;
      vehicleType: string;
      licensePlate: string;
      rating: number;
    };
    pickupLocation: string;
    dropoffLocation: string;
    rideOption: string;
    capacityOption: string;
    distance: string;
    fare: number;
  };
}

const RideDetailsPanel: React.FC<RideDetailsPanelProps> = ({ currentRide }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg pb-24">
      <ScrollArea className="h-72">
        <div className="p-4">
          <DriverInfoCard driver={currentRide.driver} />
          
          <RouteInfoCard 
            pickupLocation={currentRide.pickupLocation}
            dropoffLocation={currentRide.dropoffLocation}
            rideOption={currentRide.rideOption}
            capacityOption={currentRide.capacityOption}
            distance={currentRide.distance}
            fare={currentRide.fare}
          />
          
          <AdditionalRideInfo isSubscribed={false} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default RideDetailsPanel;
