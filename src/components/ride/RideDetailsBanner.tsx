
import React from "react";
import { Navigation } from "lucide-react";

interface RideDetailsBannerProps {
  secondsLeft: number;
}

const RideDetailsBanner: React.FC<RideDetailsBannerProps> = ({ secondsLeft }) => {
  return (
    <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-md p-3 flex items-center">
      <div className="w-10 h-10 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-3">
        <Navigation size={20} className="text-rideroot-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-rideroot-darkGrey">Estimated arrival</p>
        <p className="font-semibold text-rideroot-text">10:45 AM ({secondsLeft} seconds)</p>
      </div>
    </div>
  );
};

export default RideDetailsBanner;
