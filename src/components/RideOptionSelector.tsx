import React from "react";
import { Car, Truck, Zap, Clock } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const RideOptionSelector: React.FC = () => {
  const { rideOption, capacityOption, setRideOption, setCapacityOption } = useApp();

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-card-soft">
      <h3 className="text-lg font-semibold mb-5 text-rideroot-text">Choose your ride</h3>
      
      {/* Ride Type Selection */}
      <div className="mb-6">
        <div className="text-sm font-medium text-rideroot-darkGrey mb-3">Ride Type</div>
        <div className="flex bg-rideroot-lightGrey rounded-xl p-1.5">
          <RideTypeButton 
            label="Standard"
            description="Affordable & Quick"
            icon={<Clock size={16} className="mr-2" />}
            isSelected={rideOption === "standard"}
            onClick={() => setRideOption("standard")}
          />
          <RideTypeButton 
            label="Premium"
            description="Extra Comfort"
            icon={<Zap size={16} className="mr-2" />}
            isSelected={rideOption === "premium"}
            onClick={() => setRideOption("premium")}
          />
        </div>
      </div>
      
      {/* Capacity Selection */}
      <div>
        <div className="text-sm font-medium text-rideroot-darkGrey mb-3">Vehicle Size</div>
        <div className="flex bg-rideroot-lightGrey rounded-xl p-1.5">
          <RideTypeButton 
            label="Regular"
            description="Up to 4 people"
            icon={<Car size={16} className="mr-2" />}
            isSelected={capacityOption === "regular"}
            onClick={() => setCapacityOption("regular")}
          />
          <RideTypeButton 
            label="Capacity XL" 
            description="Up to 6 people"
            icon={<Truck size={16} className="mr-2" />}
            isSelected={capacityOption === "xl"}
            onClick={() => setCapacityOption("xl")}
          />
        </div>
      </div>
      
      {/* Price Estimate */}
      <div className="mt-6 pt-5 border-t border-rideroot-mediumGrey">
        <div className="flex justify-between items-center">
          <div className="text-sm text-rideroot-darkGrey">Estimated fare:</div>
          <div className="text-lg font-semibold text-rideroot-text">
            ${getPriceEstimate(rideOption, capacityOption)}
          </div>
        </div>
        {capacityOption === "xl" && (
          <p className="text-xs text-rideroot-darkGrey mt-1">
            Higher capacity vehicles have additional costs
          </p>
        )}
      </div>
    </div>
  );
};

// Helper price estimate function - this is just UI, keeping actual price calculation logic intact
const getPriceEstimate = (rideOption: string, capacityOption: string): string => {
  const basePrice = rideOption === "standard" ? 14 : 16.50;
  const xlMultiplier = capacityOption === "xl" ? 1.5 : 1;
  return (basePrice * xlMultiplier).toFixed(2);
};

interface RideTypeButtonProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const RideTypeButton: React.FC<RideTypeButtonProps> = ({ 
  label, 
  description, 
  icon, 
  isSelected, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-3 rounded-lg flex flex-col items-center justify-center transition-all ${
        isSelected 
          ? "bg-white text-rideroot-primary shadow-sm" 
          : "text-rideroot-darkGrey hover:bg-white/50"
      }`}
    >
      <div className="flex items-center mb-1">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <span className="text-xs opacity-75">{description}</span>
    </button>
  );
};

export default RideOptionSelector;
