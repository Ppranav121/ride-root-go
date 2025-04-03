
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, MessageSquare, MapPin, Navigation, Info } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";

const RideTracking: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();

  useEffect(() => {
    if (!currentRide || !currentRide.driver) {
      navigate("/home");
      return;
    }

    // Update ride status to in-progress
    setCurrentRide({
      ...currentRide,
      status: "in-progress"
    });

    // Automatically navigate to completion after 10 seconds (simulating a ride)
    const timer = setTimeout(() => {
      navigate("/ride-completion");
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentRide, navigate, setCurrentRide]);

  if (!currentRide || !currentRide.driver) return null;

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="Your Ride" />

      <div className="flex-1 relative">
        {/* Map Placeholder - In a real app this would be an actual map */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <p className="text-rideroot-darkGrey">Map view with route would appear here</p>
        </div>

        {/* ETA Banner */}
        <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-md p-3 flex items-center">
          <div className="w-10 h-10 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-3">
            <Navigation size={20} className="text-rideroot-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-rideroot-darkGrey">Estimated arrival</p>
            <p className="font-semibold text-rideroot-text">10:45 AM (5 min)</p>
          </div>
        </div>

        {/* Ride details */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-4">
          <div className="flex items-center mb-4">
            <div className="w-14 h-14 bg-rideroot-lightGrey rounded-full flex items-center justify-center mr-4">
              <span className="text-xl font-bold text-rideroot-darkGrey">
                {currentRide.driver.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-rideroot-text">
                {currentRide.driver.name}
              </h3>
              <p className="text-rideroot-darkGrey">{currentRide.driver.vehicleType}</p>
            </div>
          </div>

          <div className="bg-rideroot-lightGrey p-3 rounded-xl mb-4">
            <div className="flex items-start mb-3">
              <div className="mr-3 flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-rideroot-primary"></div>
                <div className="w-0.5 h-8 bg-rideroot-mediumGrey my-1"></div>
                <div className="w-3 h-3 rounded-full bg-rideroot-accent"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-rideroot-text">{currentRide.pickupLocation}</p>
                <div className="h-6"></div> {/* Spacer */}
                <p className="font-medium text-rideroot-text">{currentRide.dropoffLocation}</p>
              </div>
            </div>
            <div className="flex items-center text-rideroot-darkGrey text-sm">
              <Info size={14} className="mr-1" />
              <span>
                {rideOptionLabel(currentRide.rideOption, currentRide.capacityOption)} • 
                {currentRide.distance} miles • ${currentRide.fare}
              </span>
            </div>
          </div>

          <div className="flex space-x-3 mb-4">
            <button className="flex-1 py-2 border border-rideroot-mediumGrey rounded-lg flex items-center justify-center text-rideroot-text">
              <Phone size={18} className="mr-2" />
              Call
            </button>
            <button className="flex-1 py-2 border border-rideroot-mediumGrey rounded-lg flex items-center justify-center text-rideroot-text">
              <MessageSquare size={18} className="mr-2" />
              Message
            </button>
          </div>

          {/* Eco-Ride Impact Animation (would be triggered conditionally in a real app) */}
          <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center mb-4 animate-fade-in">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-green-600 text-xl">🍃</span>
            </div>
            <div>
              <p className="font-medium text-green-700">Eco-Ride Impact</p>
              <p className="text-sm text-green-600">CO2 Saved: 0.5 kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate a readable label for the ride option
const rideOptionLabel = (option: string, capacity: string) => {
  let label = option.charAt(0).toUpperCase() + option.slice(1);
  if (capacity === "xl") {
    label += " Capacity XL";
  }
  return label;
};

export default RideTracking;
