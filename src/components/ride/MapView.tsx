
import React from "react";
import { MapPin, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import DriverLocationMarker from "./DriverLocationMarker";

interface MapViewProps {
  driverPosition: { top: string; left: string };
  secondsLeft: number;
  onComplete: () => void;
}

const MapView: React.FC<MapViewProps> = ({ driverPosition, secondsLeft, onComplete }) => {
  return (
    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
      <p className="text-rideroot-darkGrey">Map view with route would appear here</p>
      
      {/* Driver's car icon on map */}
      <DriverLocationMarker position={driverPosition} />
      
      {/* Destination pin */}
      <div className="absolute top-[20%] right-[40%]">
        <div className="w-6 h-6 bg-rideroot-accent rounded-full flex items-center justify-center shadow-lg">
          <MapPin size={16} className="text-white" />
        </div>
      </div>

      {/* Debug controls - only visible in development */}
      <Button
        variant="default"
        className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600"
        onClick={onComplete}
      >
        Complete Ride ({secondsLeft}s)
      </Button>
    </div>
  );
};

export default MapView;
