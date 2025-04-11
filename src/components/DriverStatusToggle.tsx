
import React from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DriverStatusToggleProps {
  isOnline: boolean;
  onStatusChange: (online: boolean) => void;
}

const DriverStatusToggle: React.FC<DriverStatusToggleProps> = ({ 
  isOnline, 
  onStatusChange 
}) => {
  const navigate = useNavigate();
  
  const handleStatusChange = (online: boolean) => {
    onStatusChange(online);
    
    // If turning online, navigate directly to the driver-ride page
    if (online) {
      navigate("/driver-ride", { replace: false });
      // Set a flag in sessionStorage to indicate we're coming from driver-home
      sessionStorage.setItem('fromHome', 'true');
    }
  };
  
  // Added function to navigate to driver ride if already online
  const goToRideView = () => {
    navigate("/driver-ride");
  };
  
  return (
    <div className="relative rounded-xl bg-white shadow-lg p-5 border border-gray-100 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {isOnline ? (
          <div className="absolute inset-0 bg-gradient-to-r from-rideroot-primary/80 to-rideroot-accent/80" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/80 to-blue-300/80" />
        )}
      </div>
      
      <div className="relative z-10 flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-heading font-semibold mb-1 flex items-center">
            {isOnline ? (
              <>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 rounded-full bg-green-500/90 mr-2"
                />
                <span className="text-gray-900">You're Online</span>
              </>
            ) : (
              <>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 rounded-full bg-rideroot-primary/90 mr-2"
                />
                <span className="text-gray-700 font-heading font-bold">Start Driving</span>
              </>
            )}
          </h2>
          <p className="text-sm text-gray-500 font-sans">
            {isOnline 
              ? "You're receiving ride requests" 
              : "Toggle to begin your journey"}
          </p>
        </div>
        
        {/* Enhanced Professional Toggle */}
        <div className="relative flex items-center">
          <Switch 
            checked={isOnline} 
            onCheckedChange={handleStatusChange}
            className={`${isOnline ? 'bg-green-500/90' : 'bg-gradient-to-r from-rideroot-primary/90 to-rideroot-secondary/90'} relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
          />
          <span className={`ml-3 text-sm font-medium ${isOnline ? 'text-green-600/90' : 'text-gray-600'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      
      {isOnline && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 pt-3 border-t border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 bg-green-500/90 rounded-full mr-2"
              />
              <span className="text-sm font-medium text-green-600/90">Active & Ready for Requests</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs border-green-500/70 text-green-600 hover:bg-green-50"
              onClick={goToRideView}
            >
              View Ride Screen
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DriverStatusToggle;
