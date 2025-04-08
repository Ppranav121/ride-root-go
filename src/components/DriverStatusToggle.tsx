
import React from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface DriverStatusToggleProps {
  isOnline: boolean;
  onStatusChange: (online: boolean) => void;
}

const DriverStatusToggle: React.FC<DriverStatusToggleProps> = ({ 
  isOnline, 
  onStatusChange 
}) => {
  return (
    <div className="relative rounded-xl bg-white shadow-lg p-5 border border-gray-100 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {isOnline ? (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400" />
        )}
      </div>
      
      <div className="relative z-10 flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold mb-1 flex items-center">
            {isOnline ? (
              <>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 rounded-full bg-green-500 mr-2"
                />
                <span className="text-gray-900">You're Online</span>
              </>
            ) : (
              <>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 rounded-full bg-gray-400 mr-2"
                />
                <span className="text-gray-700">Go Online to Drive</span>
              </>
            )}
          </h2>
          <p className="text-sm text-rideroot-darkGrey">
            {isOnline 
              ? "You're receiving ride requests" 
              : "Toggle to start receiving requests"}
          </p>
        </div>
        <Switch 
          checked={isOnline} 
          onCheckedChange={onStatusChange} 
          className={isOnline ? "bg-green-500" : ""} 
        />
      </div>
      
      {isOnline && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 pt-3 border-t border-gray-100"
        >
          <div className="flex items-center">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-green-500 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-green-600">Active & Ready for Requests</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DriverStatusToggle;
