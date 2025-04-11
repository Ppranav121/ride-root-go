
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Car, MapPin, X, DollarSign, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

interface RideRequestNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  onView: () => void;
  rideDetails?: {
    rider: string;
    pickup: string;
    fare: number;
    requestTime: string;
  };
}

const RideRequestNotification: React.FC<RideRequestNotificationProps> = ({
  isVisible,
  onClose,
  onView,
  rideDetails = {
    rider: "Jessica M.",
    pickup: "1234 Market Street",
    fare: 17.50,
    requestTime: "Just now"
  }
}) => {
  const navigate = useNavigate();
  
  if (!isVisible) return null;
  
  const handleView = () => {
    onView();
    navigate('/driver-ride');
    toast("Navigating to ride request", {
      description: "Opening ride details",
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
          className="fixed top-20 inset-x-4 z-50"
        >
          <Card className="border-[#6c5ce7] border-l-4 shadow-lg">
            <CardContent className="pt-6 pb-2">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="bg-[#6c5ce7]/10 p-2 rounded-full mr-3">
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
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="mt-3 space-y-3 bg-gray-50 p-3 rounded-lg">
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
            
            <CardFooter className="pt-2 pb-4 flex justify-end gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={onClose}
                className="text-gray-600 border-gray-300"
              >
                Dismiss
              </Button>
              <Button 
                size="sm"
                onClick={handleView}
                className="bg-[#6c5ce7] hover:bg-[#5b4dc4]"
              >
                View Request
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RideRequestNotification;
