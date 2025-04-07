
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { AnimatePresence } from "framer-motion";
import BackButton from "@/components/common/BackButton";
import MapBackground from "@/components/ride/MapBackground";
import DriverPulseAnimation from "@/components/ride/DriverPulseAnimation";
import CancelRideButton from "@/components/ride/CancelRideButton";

const RideConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  const [driverFound, setDriverFound] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!currentRide) {
      navigate("/home");
      return;
    }

    // Add driver information after a delay
    const driverTimer = setTimeout(() => {
      if (currentRide) {
        setCurrentRide({
          ...currentRide,
          driver: {
            id: "driver-123",
            name: "Michael Johnson",
            vehicleType: "Toyota Camry",
            licensePlate: "ABC 123",
            rating: 4.8,
            tier: 2
          },
          status: "confirmed"
        });
        setDriverFound(true);
      }
    }, 5000);

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

    return () => {
      clearInterval(timer);
      clearTimeout(driverTimer);
    };
  }, [currentRide, navigate, setCurrentRide]);

  if (!currentRide) return null;

  return (
    <div className="flex flex-col h-screen bg-black relative">
      <BackButton />

      <MapBackground />

      {/* Content Container */}
      <div className="relative flex flex-col flex-1 items-center justify-center z-10 px-4">
        {/* Finding driver section */}
        <div className="flex flex-col items-center mb-24">
          {/* Driver pulse animation */}
          <div className="relative mb-10">
            <DriverPulseAnimation driverFound={driverFound} />
          </div>

          {/* Text content */}
          <h2 className="text-2xl font-bold text-white mb-2">
            {!driverFound ? "Finding you a nearby driver..." : "Driver found!"}
          </h2>
          <p className="text-white/70 text-center max-w-xs">
            {!driverFound 
              ? "The driver will pick you up as soon as possible after they confirm your order."
              : `Your driver will arrive in ${countdown} seconds.`
            }
          </p>
        </div>
      </div>

      {/* Cancel Ride Button */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
        <CancelRideButton />
      </div>
    </div>
  );
};

export default RideConfirmation;
