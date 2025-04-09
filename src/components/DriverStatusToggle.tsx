
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
          <div className="absolute inset-0 bg-gradient-to-r from-rideroot-primary to-rideroot-accent" />
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
                <span className="text-gray-700">Start Driving</span>
              </>
            )}
          </h2>
          <p className="text-sm text-rideroot-darkGrey">
            {isOnline 
              ? "You're receiving ride requests" 
              : "Toggle to begin your journey"}
          </p>
        </div>
        
        {/* Custom Road Toggle Switch */}
        <div className="relative w-20 h-10 mr-2">
          {/* Custom Road Toggle Background */}
          <div className="w-20 h-10 rounded-full relative overflow-hidden shadow-inner border border-gray-200">
            {/* Road Background */}
            <div className="absolute inset-0">
              {/* Sky Background */}
              <div className={`absolute inset-0 transition-all duration-300 ${isOnline ? 'bg-gradient-to-b from-blue-300 to-blue-100' : 'bg-gradient-to-b from-gray-300 to-gray-200'}`}></div>
              
              {/* Road Surface */}
              <div className="absolute bottom-0 w-full h-5 bg-gray-800 flex items-center justify-center">
                {/* Road Markings */}
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-around">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-0.5 bg-yellow-400"></div>
                  ))}
                </div>
              </div>
              
              {/* Scenery */}
              <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-green-600"></div>
              <div className="absolute top-2 right-3 w-1.5 h-1.5 rounded-full bg-green-500"></div>
              
              {/* Sun/Moon */}
              <motion.div 
                animate={{ y: isOnline ? -5 : 5 }}
                transition={{ duration: 0.5 }}
                className={`absolute ${isOnline ? 'right-2 top-1.5 w-2.5 h-2.5 bg-yellow-300 rounded-full' : 'left-2 top-1 w-2 h-2 bg-gray-100 rounded-full'}`}
              />
            </div>
          </div>
          
          {/* Moving Car - Significantly larger size */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ 
              x: isOnline ? 10 : 0,
              rotate: 0 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              left: isOnline ? '55%' : '20%',
              transition: 'left 0.3s ease'
            }}
          >
            <div 
              className={`flex items-center justify-center ${
                isOnline ? 'bg-rideroot-primary shadow-lg' : 'bg-gray-500'
              } rounded-full`}
              style={{ width: '28px', height: '28px' }} // Significantly increased car container size
            >
              <Car 
                size={22} // Significantly increased car icon size
                className="text-white"
              />
            </div>
          </motion.div>
          
          {/* Actual Toggle Switch (hidden but functional) */}
          <Switch 
            checked={isOnline} 
            onCheckedChange={onStatusChange} 
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
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
