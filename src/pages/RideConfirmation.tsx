
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Phone, MessageSquare, Car, ArrowLeft } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Map Placeholder - In a real app this would be an actual map */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-73.9857,40.7484,12,0/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative flex flex-col flex-1 items-center justify-center z-10 px-4">
        {/* Finding driver section */}
        <div className="flex flex-col items-center mb-24">
          {/* Driver pulse animation */}
          <div className="relative mb-10">
            {!driverFound && (
              <div className="relative">
                <motion.div
                  className="absolute w-40 h-40 rounded-full bg-green-500/20"
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.7, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ left: "-20px", top: "-20px" }}
                />
                <motion.div
                  className="absolute w-40 h-40 rounded-full bg-green-500/20"
                  animate={{
                    scale: [1, 2.2],
                    opacity: [0.7, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5
                  }}
                  style={{ left: "-20px", top: "-20px" }}
                />
                <motion.div
                  className="absolute w-40 h-40 rounded-full bg-green-500/20"
                  animate={{
                    scale: [1, 2],
                    opacity: [0.7, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                  style={{ left: "-20px", top: "-20px" }}
                />
                <div className="relative w-24 h-24 rounded-full bg-green-500/30 flex items-center justify-center">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Car size={28} className="text-white" />
                  </motion.div>
                </div>
              </div>
            )}
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
        <Button 
          onClick={() => navigate("/home")}
          variant="outline" 
          className="w-full border border-red-500/50 bg-transparent text-red-500 hover:bg-red-500/10 hover:text-red-400 py-6 rounded-full text-lg"
        >
          Cancel Ride
        </Button>
      </div>
    </div>
  );
};

export default RideConfirmation;
