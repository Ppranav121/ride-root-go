
import React from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle, Car } from "lucide-react";
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
        
        {/* Custom Road Toggle Switch */}
        <div className="relative">
          {/* Custom Road Toggle Background */}
          <div className="w-16 h-8 rounded-full relative overflow-hidden">
            {/* Road Background */}
            <div className="absolute inset-0 flex">
              <div className={`h-full transition-all duration-300 ${isOnline ? 'w-full bg-green-100' : 'w-full bg-gray-200'}`}>
                {/* Road Pavement */}
                <div className="absolute bottom-0 w-full h-4 bg-gray-600 rounded-b-lg">
                  {/* Road Markings */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white flex justify-between px-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 h-0.5 bg-white"></div>
                    ))}
                  </div>
                </div>
                {/* Trees and scenery */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-green-300 flex justify-around items-end">
                  <div className="w-1.5 h-2 rounded-full bg-green-600"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                  <div className="w-1.5 h-2.5 rounded-full bg-green-600"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Moving Car Position */}
          <motion.div
            initial={{ x: isOnline ? 10 : 0 }}
            animate={{ x: isOnline ? 10 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute -top-2 left-1"
            style={{ 
              transform: `translateX(${isOnline ? 'calc(100% - 8px)' : '0px'})`,
              transition: 'transform 0.3s ease'
            }}
          >
            <div className={`flex items-center justify-center w-7 h-7 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
              <Car 
                size={16} 
                className="text-white" 
                style={{ 
                  transform: isOnline ? 'rotate(0deg)' : 'rotate(0deg)'
                }}
              />
            </div>
          </motion.div>
          
          {/* Actual Toggle Switch (hidden but functional) */}
          <Switch 
            checked={isOnline} 
            onCheckedChange={onStatusChange} 
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
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
