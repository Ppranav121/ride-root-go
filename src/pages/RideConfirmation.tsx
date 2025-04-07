
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Car } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
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
    <div className="flex flex-col h-screen w-full relative bg-gradient-to-b from-rideroot-primary/20 to-black">
      {/* Map Background with gradient overlay */}
      <MapBackground />
      
      {/* Back button with proper positioning */}
      <div className="absolute top-6 left-6 z-20">
        <BackButton />
      </div>

      {/* Main content container with better positioning */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 z-10">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Driver pulse animation */}
          <div className="mb-8">
            <DriverPulseAnimation driverFound={driverFound} />
          </div>

          {/* Status text with animations */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
              {!driverFound ? "Finding your driver" : "Driver found!"}
            </h2>
            
            <AnimatePresence mode="wait">
              {!driverFound ? (
                <motion.div
                  key="searching"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center mb-2"
                >
                  <motion.span 
                    className="inline-block mx-0.5 h-2 w-2 rounded-full bg-white"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span 
                    className="inline-block mx-0.5 h-2 w-2 rounded-full bg-white"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span 
                    className="inline-block mx-0.5 h-2 w-2 rounded-full bg-white"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="found"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center text-white"
                >
                  <CheckCircle className="mr-2 text-green-400" size={20} />
                  <span>Starting in {countdown} seconds</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p 
              className="text-white/80 text-center max-w-xs mx-auto mt-3 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5 }}
            >
              {!driverFound 
                ? "We're connecting you with the best available driver nearby"
                : `${currentRide.driver?.name} is on the way with a ${currentRide.driver?.vehicleType}`
              }
            </motion.p>

            {driverFound && (
              <motion.div
                className="mt-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl p-3 px-5">
                  <div className="w-10 h-10 bg-rideroot-primary rounded-full flex items-center justify-center mr-3">
                    <Car size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{currentRide.driver?.licensePlate}</p>
                    <p className="text-white/70 text-sm">License plate</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Redesigned bottom card with ride info */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 px-6 pb-8 z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <CancelRideButton />
      </motion.div>
    </div>
  );
};

export default RideConfirmation;
