
import React from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle, Home, Power } from "lucide-react";
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
      className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-gray-100 p-5 overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          {isOnline ? (
            <div className="absolute inset-0 bg-gradient-to-r from-rideroot-primary/80 to-rideroot-accent/80" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/80 to-blue-300/80" />
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">Driver Status</h3>
            <p className="text-sm text-gray-500">
              {isOnline ? 'You are online and available for rides' : 'Go online to start receiving ride requests'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <Switch 
              checked={isOnline} 
              onCheckedChange={handleStatusChange}
              className={`${isOnline ? 'bg-green-500' : ''}`}
            />
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
