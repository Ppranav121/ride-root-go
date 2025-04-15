
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Car, MapPin, X, DollarSign, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export interface RideRequestDetails {
  rider: string;
  pickup: string;
  fare: number;
  requestTime: string;
  id: string;
  dropoffLocation: string;
  distance: number;
  estimatedTime: string;
  rideType: 'Standard' | 'Standard XL' | 'Premium' | 'Premium XL';
  isPremium: boolean;
  isPeakBonus: boolean;
}

interface RideRequestNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  onView: () => void;
  rideDetails?: RideRequestDetails;
}

const RideRequestNotification: React.FC<RideRequestNotificationProps> = ({
  isVisible,
  onClose,
  onView,
  rideDetails = {
    id: "ride-123",
    rider: "Jessica M.",
    pickup: "1234 Market Street",
    dropoffLocation: "Golden Gate Park",
    distance: 4.2,
    estimatedTime: "15 mins",
    fare: 17.50,
    rideType: "Premium",
    isPremium: true,
    isPeakBonus: true,
    requestTime: "Just now"
  }
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (!isVisible) return null;
  
  const handleView = () => {
    // Save the ride details in sessionStorage before navigating
    try {
      sessionStorage.setItem('pendingRideRequest', JSON.stringify(rideDetails));
    } catch (error) {
      console.error("Error storing ride request:", error);
    }
    
    onView();
    navigate('/driver-ride');
    toast("Opening ride request", {
      description: "Navigating to ride details",
      icon: <Car className="h-4 w-4" />,
    });
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 inset-x-3 z-50 max-w-md mx-auto"
        >
          <Card className="border-[#6c5ce7] border-l-4 shadow-lg rounded-xl overflow-hidden">
            <CardContent className={`pt-5 pb-2 ${isMobile ? 'px-4' : 'px-6'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="bg-[#6c5ce7]/10 p-2 rounded-full mr-2.5">
                    <Bell size={16} className="text-[#6c5ce7]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">New Ride Request</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {rideDetails.requestTime}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-100 -mt-1 -mr-1"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="mt-3 space-y-2.5 bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center text-sm">
                  <Car size={15} className="mr-2.5 text-[#6c5ce7]" />
                  <span className="font-medium w-16">Rider:</span>
                  <span className="text-gray-700">{rideDetails.rider}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <MapPin size={15} className="mr-2.5 text-[#6c5ce7]" />
                  <span className="font-medium w-16">Pickup:</span>
                  <span className="text-gray-700">{rideDetails.pickup}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <DollarSign size={15} className="mr-2.5 text-[#6c5ce7]" />
                  <span className="font-medium w-16">Fare:</span>
                  <span className="text-[#6c5ce7] font-semibold">${rideDetails.fare.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className={`pt-2 pb-4 flex justify-between gap-2 ${isMobile ? 'px-4' : 'px-6'}`}>
              <Button 
                variant="outline"
                size="sm"
                onClick={onClose}
                className="text-gray-600 border-gray-300 rounded-full px-4"
              >
                Dismiss
              </Button>
              <Button 
                size="sm"
                onClick={handleView}
                className="bg-[#6c5ce7] hover:bg-[#5b4dc4] rounded-full px-4 flex items-center"
              >
                View Request
                <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RideRequestNotification;
