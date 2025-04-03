
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Phone, MessageSquare, Car } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";

const RideConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  const [matchAnimation, setMatchAnimation] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!currentRide) {
      navigate("/home");
      return;
    }

    // Show the ride match animation
    setTimeout(() => {
      setMatchAnimation(true);
      
      // Add driver information after animation
      setTimeout(() => {
        if (currentRide) {
          setCurrentRide({
            ...currentRide,
            driver: {
              id: "driver-123",
              name: "Michael Johnson",
              vehicleType: "Toyota Camry • ABC 123",
              licensePlate: "ABC 123",
              rating: 4.8,
              tier: 2
            },
            status: "confirmed"
          });
        }
      }, 1000);
    }, 1000);

    // Start countdown to tracking
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/ride-tracking");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentRide, navigate, setCurrentRide]);

  if (!currentRide) return null;

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="Ride Confirmation" />

      <div className="flex-1 relative">
        {/* Map Placeholder - In a real app this would be an actual map */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <p className="text-rideroot-darkGrey">Map view would appear here</p>
        </div>

        {/* Match found animation */}
        {matchAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 p-6 rounded-2xl shadow-lg flex flex-col items-center animate-fade-in">
              <Car size={48} className="text-rideroot-accent mb-3" />
              <h2 className="text-xl font-bold text-rideroot-text mb-1">Match Found!</h2>
              <p className="text-rideroot-darkGrey">Your driver is on the way</p>
            </div>
          </div>
        )}

        {/* Driver info card */}
        {currentRide.driver && (
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-4 animate-slide-in-right">
            <div className="bg-rideroot-primary/10 text-rideroot-primary font-medium text-center py-2 rounded-full mb-4">
              Driver is on the way - Arriving in {countdown} seconds
            </div>

            <div className="flex items-center mb-4">
              <div className="w-14 h-14 bg-rideroot-lightGrey rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-rideroot-darkGrey">
                  {currentRide.driver.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-rideroot-text mr-2">
                    {currentRide.driver.name}
                  </h3>
                  <div className="flex items-center bg-rideroot-accent/10 text-rideroot-accent text-xs px-2 py-1 rounded-full">
                    <CheckCircle size={12} className="mr-1" />
                    Verified
                  </div>
                </div>
                <p className="text-rideroot-darkGrey">{currentRide.driver.vehicleType}</p>
                <div className="flex items-center text-yellow-500">
                  <span>★</span>
                  <span className="ml-1 text-rideroot-darkGrey">
                    {currentRide.driver.rating}
                  </span>
                </div>
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

            <button
              onClick={() => navigate("/home")}
              className="btn-outline w-full"
            >
              Cancel Ride
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideConfirmation;
