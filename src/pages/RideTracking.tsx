import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, MessageSquare, MapPin, Navigation, Info, ChevronDown, Star, Clock, Car, Shield, AlertTriangle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const RideTracking: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  // State to track the driver's position for animation
  const [driverPosition, setDriverPosition] = useState({ top: "60%", left: "30%" });
  const { toast } = useToast();
  const [secondsLeft, setSecondsLeft] = useState(10);

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

    // Animate driver moving toward pickup location
    const positionInterval = setInterval(() => {
      setDriverPosition(prev => ({
        top: parseInt(prev.top) - 0.5 + "%",
        left: parseInt(prev.left) + 0.3 + "%"
      }));
    }, 200);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Automatically navigate to completion after countdown reaches zero
    const timer = setTimeout(() => {
      console.log("Navigating to ride completion page");
      navigate("/ride-completion");
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(positionInterval);
      clearInterval(countdownInterval);
    };
  }, [currentRide, navigate, setCurrentRide]);

  useEffect(() => {
    // When countdown reaches zero, navigate to completion page
    if (secondsLeft === 0) {
      console.log("Countdown reached zero, navigating to ride completion");
      navigate("/ride-completion");
    }
  }, [secondsLeft, navigate]);

  const handleSosClick = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Help is on the way. Stay calm and remain in the vehicle if safe to do so.",
      variant: "destructive",
    });
    console.log("SOS Button clicked");
  };

  // Manually navigate to completion page function
  const goToCompletion = () => {
    console.log("Manual navigation to ride completion");
    navigate("/ride-completion");
  };

  if (!currentRide || !currentRide.driver) return null;

  return (
    <div className="flex flex-col h-screen bg-rideroot-lightGrey relative">
      <RootHeader title="Your Ride" />

      <div className="relative flex-1 overflow-hidden">
        {/* Map Placeholder - In a real app this would be an actual map */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <p className="text-rideroot-darkGrey">Map view with route would appear here</p>
          
          {/* Driver's car icon on map */}
          <motion.div 
            className="absolute w-10 h-10 bg-rideroot-primary rounded-full flex items-center justify-center shadow-lg"
            style={{ 
              top: driverPosition.top, 
              left: driverPosition.left,
            }}
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Car size={20} className="text-white" />
          </motion.div>
          
          {/* Destination pin */}
          <div className="absolute top-[20%] right-[40%]">
            <div className="w-6 h-6 bg-rideroot-accent rounded-full flex items-center justify-center shadow-lg">
              <MapPin size={16} className="text-white" />
            </div>
          </div>

          {/* Debug controls - only visible in development */}
          <Button
            variant="default"
            className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600"
            onClick={goToCompletion}
          >
            Complete Ride ({secondsLeft}s)
          </Button>
        </div>

        {/* ETA Banner */}
        <div className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-md p-3 flex items-center">
          <div className="w-10 h-10 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-3">
            <Navigation size={20} className="text-rideroot-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-rideroot-darkGrey">Estimated arrival</p>
            <p className="font-semibold text-rideroot-text">10:45 AM ({secondsLeft} seconds)</p>
          </div>
        </div>

        {/* Scrollable Ride details */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg pb-24">
          <ScrollArea className="h-72">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
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
                
                {/* Driver details dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center px-3 py-2 rounded-lg bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey transition-colors">
                      <span className="text-sm mr-1">Details</span>
                      <ChevronDown size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72">
                    <DropdownMenuGroup>
                      <div className="p-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-rideroot-lightGrey rounded-full flex items-center justify-center mr-3">
                            <span className="text-lg font-bold text-rideroot-darkGrey">
                              {currentRide.driver.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{currentRide.driver.name}</h4>
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                              <span className="text-sm">{currentRide.driver.rating} • Professional Driver</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border-b border-gray-100">
                        <div className="flex items-center mb-2">
                          <Car size={16} className="text-rideroot-darkGrey mr-2" />
                          <span className="text-sm font-medium">Vehicle</span>
                        </div>
                        <p className="text-sm pl-6">{currentRide.driver.vehicleType}</p>
                        <p className="text-sm pl-6 text-rideroot-darkGrey">License: {currentRide.driver.licensePlate}</p>
                      </div>

                      <div className="p-3 border-b border-gray-100">
                        <div className="flex items-center mb-2">
                          <Shield size={16} className="text-rideroot-darkGrey mr-2" />
                          <span className="text-sm font-medium">Safety Features</span>
                        </div>
                        <p className="text-sm pl-6">License Verified</p>
                        <p className="text-sm pl-6">Background Checked</p>
                      </div>

                      <div className="p-3">
                        <div className="flex items-center mb-2">
                          <Clock size={16} className="text-rideroot-darkGrey mr-2" />
                          <span className="text-sm font-medium">Driver History</span>
                        </div>
                        <p className="text-sm pl-6">{1000 + Math.floor(Math.random() * 5000)} rides</p>
                        <p className="text-sm pl-6">Member since 2021</p>
                      </div>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuItem className="cursor-pointer hover:bg-rideroot-lightGrey">
                      <div className="flex justify-center w-full py-1">
                        <span className="text-rideroot-primary font-medium">Report an Issue</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

              {/* Eco-Ride Impact Animation */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center mb-4 animate-fade-in">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-xl">🍃</span>
                </div>
                <div>
                  <p className="font-medium text-green-700">Eco-Ride Impact</p>
                  <p className="text-sm text-green-600">CO2 Saved: 0.5 kg</p>
                </div>
              </div>

              {/* Additional content for scrolling */}
              <div className="bg-rideroot-lightGrey rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-2">Trip Details</h4>
                <p className="text-sm text-rideroot-darkGrey mb-2">Estimated trip time: 15 minutes</p>
                <p className="text-sm text-rideroot-darkGrey">Fare calculated based on distance and time</p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* SOS Button - Integrated with the background */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <motion.button 
          className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-4 flex items-center justify-center gap-3 shadow-inner border-t border-red-700"
          onClick={handleSosClick}
          whileTap={{ scale: 0.98 }}
          animate={{ 
            backgroundColor: ['rgba(220, 38, 38, 0.9)', 'rgba(239, 68, 68, 0.95)', 'rgba(220, 38, 38, 0.9)'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="bg-white p-1.5 rounded-full">
            <AlertTriangle size={20} strokeWidth={2.5} className="text-red-600" />
          </div>
          <span className="text-lg font-semibold tracking-wider">EMERGENCY ASSISTANCE</span>
        </motion.button>
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
