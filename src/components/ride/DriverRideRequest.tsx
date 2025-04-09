
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, User, Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DriverRideRequestProps {
  onAccept: () => void;
  onDecline: () => void;
}

interface RideRequest {
  id: string;
  rider: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number;
  estimatedTime: string;
  fare: number;
  isPremium: boolean;
}

const DriverRideRequest: React.FC<DriverRideRequestProps> = ({ onAccept, onDecline }) => {
  const { toast } = useToast();
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
  
  // Simulate a ride request
  useEffect(() => {
    setRideRequest({
      id: "ride-123",
      rider: "Jessica M.",
      pickupLocation: "1234 Market Street",
      dropoffLocation: "Golden Gate Park",
      distance: 4.2,
      estimatedTime: "15 mins",
      fare: 17.50,
      isPremium: true
    });
    
    // Countdown timer for ride request
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleDecline();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleAccept = () => {
    toast({
      title: "Ride accepted!",
      description: "Navigate to pickup location.",
    });
    onAccept();
  };
  
  const handleDecline = () => {
    toast({
      title: "Ride declined",
      description: "You've declined this ride request.",
      variant: "destructive",
    });
    onDecline();
  };
  
  if (!rideRequest) return null;

  return (
    <motion.div
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-white rounded-t-3xl shadow-lg p-5 absolute bottom-0 left-0 right-0 z-20"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">New Ride Request</h2>
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <span className="font-semibold text-rideroot-primary">{secondsLeft}</span>
        </motion.div>
      </div>
      
      <div className="mb-5">
        <div className="flex items-center mb-2">
          <div className="bg-rideroot-primary/10 p-2 rounded-full mr-3">
            <User size={20} className="text-rideroot-primary" />
          </div>
          <div>
            <h3 className="font-medium">{rideRequest.rider}</h3>
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-3 h-3 text-yellow-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-rideroot-darkGrey ml-1">4.9</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-3">
          <div className="flex mb-2">
            <MapPin size={18} className="text-rideroot-primary mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-rideroot-darkGrey">Pickup</p>
              <p className="font-medium">{rideRequest.pickupLocation}</p>
            </div>
          </div>
          <div className="flex">
            <MapPin size={18} className="text-rideroot-secondary mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-rideroot-darkGrey">Dropoff</p>
              <p className="font-medium">{rideRequest.dropoffLocation}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <Clock size={16} className="text-rideroot-darkGrey mr-1" />
            <span className="text-sm">{rideRequest.estimatedTime}</span>
          </div>
          <span className="text-sm">{rideRequest.distance} miles</span>
        </div>
        
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="text-sm text-rideroot-darkGrey">Fare</p>
            <p className="text-xl font-bold text-rideroot-primary">${rideRequest.fare.toFixed(2)}</p>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium">Standard</span>
            {rideRequest.isPremium && (
              <span className="bg-rideroot-secondary/10 text-rideroot-secondary text-xs px-2 py-0.5 rounded-full mt-1">
                Premium
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button
          variant="outline"
          className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
          onClick={handleDecline}
        >
          <X size={16} className="mr-1" /> Decline
        </Button>
        <Button
          className="flex-1 bg-rideroot-primary hover:bg-rideroot-primary/90"
          onClick={handleAccept}
        >
          <Check size={16} className="mr-1" /> Accept
        </Button>
      </div>
    </motion.div>
  );
};

export default DriverRideRequest;
