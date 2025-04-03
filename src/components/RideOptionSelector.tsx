
import React from "react";
import { Car, Truck } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const RideOptionSelector: React.FC = () => {
  const { rideOption, capacityOption, setRideOption, setCapacityOption } = useApp();

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-rideroot-text">Choose your ride</h3>
      
      {/* Ride Type Selection */}
      <div className="flex mb-4 bg-rideroot-lightGrey rounded-lg p-1">
        <button
          onClick={() => setRideOption("standard")}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-colors ${
            rideOption === "standard" 
              ? "bg-white text-rideroot-primary shadow-sm" 
              : "text-rideroot-darkGrey"
          }`}
        >
          <Car className="mr-2" size={18} />
          <span>Standard</span>
        </button>
        <button
          onClick={() => setRideOption("premium")}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-colors ${
            rideOption === "premium" 
              ? "bg-white text-rideroot-primary shadow-sm" 
              : "text-rideroot-darkGrey"
          }`}
        >
          <Car className="mr-2" size={18} />
          <span>Premium</span>
        </button>
      </div>
      
      {/* Capacity Selection */}
      <div className="flex bg-rideroot-lightGrey rounded-lg p-1">
        <button
          onClick={() => setCapacityOption("regular")}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-colors ${
            capacityOption === "regular" 
              ? "bg-white text-rideroot-primary shadow-sm" 
              : "text-rideroot-darkGrey"
          }`}
        >
          <Car className="mr-2" size={18} />
          <span>Regular (4)</span>
        </button>
        <button
          onClick={() => setCapacityOption("xl")}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-colors ${
            capacityOption === "xl" 
              ? "bg-white text-rideroot-primary shadow-sm" 
              : "text-rideroot-darkGrey"
          }`}
        >
          <Truck className="mr-2" size={18} />
          <span>Capacity XL (6+)</span>
        </button>
      </div>
    </div>
  );
};

export default RideOptionSelector;
