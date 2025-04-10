
import React, { useState } from "react";
import { Info, Phone, MessageSquare } from "lucide-react";
import MessageDialog from "./MessageDialog";
import { useApp } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";

interface RouteInfoCardProps {
  pickupLocation: string;
  dropoffLocation: string;
  rideOption: string;
  capacityOption: string;
  distance: string | number;
  fare: number;
}

const RouteInfoCard: React.FC<RouteInfoCardProps> = ({
  pickupLocation,
  dropoffLocation,
  rideOption,
  capacityOption,
  distance,
  fare
}) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const { currentRide } = useApp();

  // Helper function to generate a readable label for the ride option
  const rideOptionLabel = (option: string, capacity: string) => {
    let label = option.charAt(0).toUpperCase() + option.slice(1);
    if (capacity === "xl") {
      label += " Capacity XL";
    }
    return label;
  };

  const handleCallDriver = () => {
    // In a real app, this would initiate a call
    toast({
      title: "Calling driver",
      description: "This feature would initiate a call to your driver in a real app.",
    });
  };

  return (
    <>
      <div className="bg-rideroot-lightGrey p-3 rounded-xl mb-4">
        <div className="flex items-start mb-3">
          <div className="mr-3 flex flex-col items-center mt-1">
            <div className="w-3 h-3 rounded-full bg-rideroot-primary"></div>
            <div className="w-0.5 h-8 bg-rideroot-mediumGrey my-1"></div>
            <div className="w-3 h-3 rounded-full bg-rideroot-accent"></div>
          </div>
          <div className="flex-1">
            <p className="font-medium text-rideroot-text">{pickupLocation}</p>
            <div className="h-6"></div> {/* Spacer */}
            <p className="font-medium text-rideroot-text">{dropoffLocation}</p>
          </div>
        </div>
        <div className="flex items-center text-rideroot-darkGrey text-sm">
          <Info size={14} className="mr-1" />
          <span>
            {rideOptionLabel(rideOption, capacityOption)} • 
            {distance} miles • ${fare}
          </span>
        </div>
      </div>

      <div className="flex space-x-3 mb-4">
        <button 
          className="flex-1 py-2 bg-rideroot-primary text-white rounded-lg flex items-center justify-center hover:bg-rideroot-primary/90 transition-colors"
          onClick={handleCallDriver}
        >
          <Phone size={18} className="mr-2" />
          Call
        </button>
        <button 
          className="flex-1 py-2 bg-rideroot-accent text-white rounded-lg flex items-center justify-center hover:bg-rideroot-accent/90 transition-colors"
          onClick={() => setIsMessageOpen(true)}
        >
          <MessageSquare size={18} className="mr-2" />
          Message
        </button>
      </div>

      {currentRide && currentRide.driver && (
        <MessageDialog 
          isOpen={isMessageOpen} 
          onClose={() => setIsMessageOpen(false)}
          driverName={currentRide.driver.name}
        />
      )}
    </>
  );
};

export default RouteInfoCard;
