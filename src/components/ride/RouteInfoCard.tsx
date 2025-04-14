import React, { useState } from "react";
import { Info, Phone, MessageSquare, MapPin } from "lucide-react";
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
  const {
    currentRide
  } = useApp();
  const rideOptionLabel = (option: string, capacity: string) => {
    let label = option.charAt(0).toUpperCase() + option.slice(1);
    if (capacity === "xl") {
      label += " Capacity XL";
    }
    return label;
  };
  const handleCallDriver = () => {
    toast({
      title: "Calling driver",
      description: "This feature would initiate a call to your driver in a real app."
    });
  };
  return <>
      <div className="bg-white shadow-sm border border-gray-100 p-4 mb-4 rounded-md">
        <div className="flex items-start mb-4">
          <div className="mr-4 flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-rideroot-primary"></div>
            <div className="w-0.5 h-12 bg-gradient-to-b from-rideroot-primary to-rideroot-accent my-1"></div>
            <div className="w-3 h-3 rounded-full bg-rideroot-accent"></div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Pickup</p>
              <p className="font-medium text-rideroot-text">{pickupLocation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dropoff</p>
              <p className="font-medium text-rideroot-text">{dropoffLocation}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center">
            <Info size={16} className="mr-2" />
            <span>{rideOptionLabel(rideOption, capacityOption)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>{distance} miles</span>
            <span className="font-medium text-rideroot-primary">${fare}</span>
          </div>
        </div>

        <div className="flex space-x-3 mt-4">
          <button className="flex-1 py-3 bg-gradient-to-br from-rideroot-primary to-rideroot-primary/90 text-white rounded-xl flex items-center justify-center hover:from-rideroot-primary/95 hover:to-rideroot-primary/85 transition-all shadow-sm" onClick={handleCallDriver}>
            <Phone size={18} className="mr-2" />
            Call
          </button>
          <button className="flex-1 py-3 bg-gradient-to-br from-rideroot-accent to-rideroot-accent/90 text-white rounded-xl flex items-center justify-center hover:from-rideroot-accent/95 hover:to-rideroot-accent/85 transition-all shadow-sm" onClick={() => setIsMessageOpen(true)}>
            <MessageSquare size={18} className="mr-2" />
            Message
          </button>
        </div>
      </div>

      {currentRide && currentRide.driver && <MessageDialog isOpen={isMessageOpen} onClose={() => setIsMessageOpen(false)} driverName={currentRide.driver.name} />}
    </>;
};
export default RouteInfoCard;