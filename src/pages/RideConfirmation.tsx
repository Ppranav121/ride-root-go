
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Phone, MessageSquare, Car, Shield, Star, Clock } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const RideConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  const [matchAnimation, setMatchAnimation] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
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
        setDriverFound(true);
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
        }
      }, 1500);
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-rideroot-lightGrey to-white">
      <RootHeader title="Ride Confirmation" />

      <div className="flex-1 relative">
        {/* Map Placeholder - In a real app this would be an actual map */}
        <div className="absolute inset-0 bg-rideroot-lightGrey flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-73.9857,40.7484,12,0/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/70"></div>
        </div>

        {/* Match found animation */}
        <AnimatePresence>
          {matchAnimation && !driverFound && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white/95 p-8 rounded-3xl shadow-xl flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="w-20 h-20 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary rounded-full flex items-center justify-center mb-5"
                >
                  <Car size={38} className="text-white" />
                </motion.div>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rideroot-primary to-rideroot-secondary mb-2"
                >
                  Finding Your Driver
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="text-rideroot-darkGrey text-center"
                >
                  Connecting you with the best driver nearby
                </motion.p>
                <motion.div 
                  className="mt-4 flex space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2 h-2 bg-rideroot-primary rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Driver found animation */}
        <AnimatePresence>
          {driverFound && currentRide.driver && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl"
              initial={{ y: 500 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120, duration: 0.8 }}
            >
              <div className="relative px-5 pt-6 pb-5">
                {/* Pulsing Circle Background */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary rounded-full flex items-center justify-center">
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rideroot-primary opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle size={28} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Status Banner */}
                <motion.div 
                  className="bg-gradient-to-r from-rideroot-primary/10 to-rideroot-secondary/10 text-rideroot-primary font-medium text-center py-3 rounded-xl mb-6 mt-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-center">
                    <Clock size={18} className="mr-2" />
                    <span>Driver is on the way - Arriving in <span className="font-bold text-rideroot-secondary">{countdown}</span> seconds</span>
                  </div>
                </motion.div>

                {/* Driver Profile */}
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Avatar className="h-16 w-16 mr-4 ring-2 ring-rideroot-secondary ring-offset-2">
                    <AvatarFallback className="bg-gradient-to-br from-rideroot-primary to-rideroot-secondary text-lg text-white">
                      {currentRide.driver.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="text-xl font-semibold text-rideroot-text mr-2">
                        {currentRide.driver.name}
                      </h3>
                      <div className="flex items-center bg-green-500/10 text-green-600 text-xs px-2 py-1 rounded-full">
                        <Shield size={12} className="mr-1" />
                        Verified
                      </div>
                    </div>
                    <div className="flex items-center text-rideroot-darkGrey">
                      <span>{currentRide.driver.vehicleType}</span>
                      <span className="mx-2 text-xs">•</span>
                      <span className="bg-rideroot-primary/10 text-rideroot-primary px-2 py-0.5 rounded-md text-xs">
                        {currentRide.driver.licensePlate}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center text-yellow-500 mr-2">
                        <Star size={14} className="fill-current mr-1" />
                        <span className="font-medium">{currentRide.driver.rating}</span>
                      </div>
                      <div className="text-xs text-rideroot-mediumGrey">1,234 rides</div>
                    </div>
                  </div>
                </motion.div>

                {/* Vehicle Info */}
                <motion.div 
                  className="bg-rideroot-lightGrey p-4 rounded-xl mb-5 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                    <Car size={24} className="text-rideroot-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-rideroot-text">Toyota Camry</h4>
                    <p className="text-rideroot-darkGrey text-sm">White • Sedan</p>
                  </div>
                </motion.div>

                {/* Contact Buttons */}
                <motion.div 
                  className="flex space-x-3 mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button variant="outline" className="flex-1 py-5 border border-rideroot-mediumGrey rounded-xl flex items-center justify-center text-rideroot-text hover:bg-rideroot-primary/5 hover:border-rideroot-primary/30">
                    <Phone size={18} className="mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="flex-1 py-5 border border-rideroot-mediumGrey rounded-xl flex items-center justify-center text-rideroot-text hover:bg-rideroot-primary/5 hover:border-rideroot-primary/30">
                    <MessageSquare size={18} className="mr-2" />
                    Message
                  </Button>
                </motion.div>

                {/* Cancel Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Button 
                    onClick={() => navigate("/home")}
                    variant="ghost" 
                    className="w-full border border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 py-2.5 rounded-xl"
                  >
                    Cancel Ride
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RideConfirmation;
