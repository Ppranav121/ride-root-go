
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Car, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  const [isExpanded, setIsExpanded] = useState(false);
  
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
          {isExpanded ? (
            <Card className="border-[#6c5ce7] border-l-4 shadow-lg bg-white">
              <CardContent className="pt-6 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="bg-[#6c5ce7]/10 p-2 rounded-full mr-3">
                      <Bell size={16} className="text-[#6c5ce7]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">New Ride Request!</h3>
                      <p className="text-xs text-gray-500">{rideDetails.requestTime}</p>
                    </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm">
                    <Car size={15} className="mr-2 text-[#6c5ce7]" />
                    <span className="font-medium">Rider:</span>
                    <span className="ml-1">{rideDetails.rider}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin size={15} className="mr-2 text-[#6c5ce7]" />
                    <span className="font-medium">Pickup:</span>
                    <span className="ml-1">{rideDetails.pickup}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Fare:</span>
                    <span className="ml-1 text-[#6c5ce7] font-semibold">${rideDetails.fare.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-2 pb-4 flex justify-end gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-600"
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
          ) : (
            <Alert 
              className="bg-white border-[#6c5ce7] border-l-4 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setIsExpanded(true)}
            >
              <Bell className="h-4 w-4 text-[#6c5ce7]" />
              <AlertTitle>New Ride Request</AlertTitle>
              <AlertDescription className="flex justify-between items-center">
                <span>Tap to view details</span>
                <span className="text-[#6c5ce7] font-semibold">${rideDetails.fare.toFixed(2)}</span>
              </AlertDescription>
            </Alert>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RideRequestNotification;
