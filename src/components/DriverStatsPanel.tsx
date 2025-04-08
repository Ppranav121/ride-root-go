
import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Clock, Award, TrendingUp } from "lucide-react";

interface DriverStatsPanelProps {
  todayEarnings: number;
  todayRides: number;
  isPrimeDriver: boolean;
}

const DriverStatsPanel: React.FC<DriverStatsPanelProps> = ({ 
  todayEarnings,
  todayRides,
  isPrimeDriver
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="px-4 pt-4 pb-2 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-500">TODAY'S STATS</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-200 rounded-full opacity-20" />
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-blue-300 rounded-full opacity-20" />
            
            <div className="flex items-center mb-2 z-10 relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <DollarSign size={18} className="text-blue-600" />
              </div>
              <p className="text-sm text-blue-800 font-medium">Earnings</p>
            </div>
            <h3 className="text-2xl font-bold text-blue-800 z-10 relative">${todayEarnings.toFixed(2)}</h3>
            {isPrimeDriver && (
              <div className="flex items-center mt-1 text-xs text-blue-700">
                <TrendingUp size={14} className="mr-1" />
                <span>Prime benefits applied</span>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-200 rounded-full opacity-20" />
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-purple-300 rounded-full opacity-20" />
            
            <div className="flex items-center mb-2 z-10 relative">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Clock size={18} className="text-purple-600" />
              </div>
              <p className="text-sm text-purple-800 font-medium">Rides</p>
            </div>
            <h3 className="text-2xl font-bold text-purple-800 z-10 relative">{todayRides}</h3>
            {isPrimeDriver && todayRides > 0 && (
              <div className="flex items-center mt-1 text-xs text-purple-700">
                <Award size={14} className="mr-1" />
                <span>Priority matches</span>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <Award size={16} className={isPrimeDriver ? "text-amber-500" : "text-gray-400"} />
              </div>
              <div>
                <p className="text-sm font-medium">{isPrimeDriver ? "Prime Driver" : "Standard Driver"}</p>
                <p className="text-xs text-gray-500">
                  {isPrimeDriver 
                    ? "$19.99/week + $1/ride" 
                    : "$2.50/ride"}
                </p>
              </div>
            </div>
            
            {isPrimeDriver && (
              <div className="px-2 py-1 bg-amber-100 rounded-full">
                <p className="text-xs text-amber-700 font-medium">Prime Active</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverStatsPanel;
