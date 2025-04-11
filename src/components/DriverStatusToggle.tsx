
import React from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle, MapPin, Power } from "lucide-react";
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
    if (online) {
      navigate("/driver-ride");
    }
  };

  return (
    <motion.div 
      className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-white/50 p-5 overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          {isOnline ? (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/80 to-emerald-500/80" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/80 to-indigo-500/80" />
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">Driver Status</h3>
            <p className="text-sm text-gray-600">
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
                  className="w-2 h-2 bg-green-500 rounded-full mr-2"
                />
                <span className="text-sm font-medium text-green-600">Active & Ready for Requests</span>
              </div>
              
              <Button 
                variant="ghost"
                size="sm" 
                className="flex items-center gap-1 border border-gray-200 hover:bg-gray-50" 
                onClick={() => navigate("/driver-home")}
              >
                <MapPin size={16} className="text-gray-500" />
                <span className="text-xs text-gray-700">Map View</span>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DriverStatusToggle;
