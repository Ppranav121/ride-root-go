
import React from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle, Home } from "lucide-react";
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
    // Always notify the parent component about the status change
    onStatusChange(online);
    
    // If turning online, navigate to the driver-ride page
    if (online) {
      navigate("/driver-ride");
    }
  };

  const handleReturnToDashboard = () => {
    // Go back to the dashboard and set status to offline
    onStatusChange(false);
    navigate("/driver-home");
  };
  
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`rounded-xl bg-white shadow-lg border border-gray-100 p-5 overflow-hidden`}>
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
                className="flex items-center gap-1" 
                onClick={handleReturnToDashboard}
              >
                <Home size={16} /> Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DriverStatusToggle;
