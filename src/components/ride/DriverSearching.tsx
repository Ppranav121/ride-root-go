
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Car, MapPin, Clock, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DriverSearchingProps {
  onCancel: () => void;
  onRideFound?: () => void;
}

const DriverSearching: React.FC<DriverSearchingProps> = ({ onCancel, onRideFound }) => {
  const navigate = useNavigate();
  const [searchPulse, setSearchPulse] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [showTips, setShowTips] = useState(false);
  
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setSearchPulse(prev => (prev + 1) % 3);
    }, 800);
    
    const timeInterval = setInterval(() => {
      setSearchTime(prev => prev + 1);
    }, 1000);
    
    // Simulate finding a ride after some time if onRideFound callback is provided
    let rideTimer: ReturnType<typeof setTimeout>;
    if (onRideFound) {
      rideTimer = setTimeout(() => {
        onRideFound();
      }, 8000); // Find a ride after 8 seconds
    }
    
    return () => {
      clearInterval(pulseInterval);
      clearInterval(timeInterval);
      if (rideTimer) clearTimeout(rideTimer);
    };
  }, [onRideFound]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col z-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold flex items-center">
          <Car className="mr-2 text-rideroot-primary" size={20} />
          Searching for Rides
        </h1>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X size={20} />
        </Button>
      </div>
      
      {/* Search animation */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background elements */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full bg-blue-200/30 left-10 top-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute w-24 h-24 rounded-full bg-indigo-200/30 right-10 bottom-40"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        
        <motion.div 
          className="absolute w-32 h-32 rounded-full bg-purple-200/20 left-20 bottom-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        
        {/* Main search animation */}
        <div className="relative mb-8 flex flex-col items-center">
          <motion.div 
            className="w-32 h-32 rounded-full bg-blue-500/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <motion.div 
            className="w-32 h-32 rounded-full bg-blue-500/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center relative z-20 shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Search size={36} className="text-white" />
          </motion.div>
        </div>
        
        {/* Search status */}
        <div className="text-center mb-8">
          <motion.h2 
            className="text-xl font-bold mb-2 text-blue-800"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Looking for ride requests{'.'.repeat(searchPulse + 1)}
          </motion.h2>
          <div className="flex items-center justify-center text-blue-600 font-medium">
            <Clock size={16} className="mr-1" />
            <span>Searching time: {formatTime(searchTime)}</span>
          </div>
        </div>
        
        {/* Search pulse animation - Centered properly */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-10 bg-blue-400 rounded-full"
              animate={{
                height: [8, 24, 8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </div>
        
        {/* Map indicator */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm flex items-center mb-4">
          <MapPin size={18} className="text-indigo-500 mr-2" />
          <span className="text-indigo-900 font-medium">San Francisco area</span>
        </div>
        
        {/* Tips accordion */}
        <div className="w-full max-w-md">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center justify-between w-full bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm"
          >
            <span className="font-medium text-gray-700">Tips while you wait</span>
            <motion.div
              animate={{ rotate: showTips ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </button>
          
          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-b-lg px-4 py-3 space-y-3 text-sm">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                      <Clock size={14} className="text-blue-600" />
                    </div>
                    <p className="text-gray-700">Wait times are typically 2-5 minutes during regular hours.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                      <MapPin size={14} className="text-blue-600" />
                    </div>
                    <p className="text-gray-700">Moving to high-demand areas can reduce wait times.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                      <Settings size={14} className="text-blue-600" />
                    </div>
                    <p className="text-gray-700">Prime Drivers receive priority ride assignments.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Cancel button - Moved from bottom bar to floating button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <Button
          variant="destructive"
          className="px-6 py-2 rounded-full shadow-lg"
          onClick={onCancel}
        >
          Cancel Search
        </Button>
      </div>
    </div>
  );
};

export default DriverSearching;
