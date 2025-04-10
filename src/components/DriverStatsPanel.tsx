
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
      <div className="px-4 pt-4 pb-2 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50/70">
        <h3 className="text-sm font-heading font-semibold text-gray-700">TODAY'S STATS</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="p-4 rounded-xl bg-gradient-to-br from-green-50/90 to-emerald-50/80 border border-green-100/70 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-200/30 rounded-full opacity-20" />
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-green-300/30 rounded-full opacity-20" />
            
            <div className="flex items-center mb-2 z-10 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400/80 to-emerald-500/80 flex items-center justify-center mr-2 shadow-md">
                <DollarSign size={18} className="text-white" />
              </div>
              <p className="text-sm text-green-700 font-heading font-medium">Earnings</p>
            </div>
            <h3 className="text-2xl font-heading font-bold text-green-700 z-10 relative">${todayEarnings.toFixed(2)}</h3>
            {isPrimeDriver && (
              <div className="flex items-center mt-1 text-xs text-green-700/90 font-sans">
                <TrendingUp size={14} className="mr-1" />
                <span>Prime benefits applied</span>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-50/90 to-indigo-50/80 border border-purple-100/70 relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-200/30 rounded-full opacity-20" />
            <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-purple-300/30 rounded-full opacity-20" />
            
            <div className="flex items-center mb-2 z-10 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400/80 to-indigo-500/80 flex items-center justify-center mr-2 shadow-md">
                <Clock size={18} className="text-white" />
              </div>
              <p className="text-sm text-purple-700 font-heading font-medium">Rides</p>
            </div>
            <h3 className="text-2xl font-heading font-bold text-purple-700 z-10 relative">{todayRides}</h3>
            {isPrimeDriver && todayRides > 0 && (
              <div className="flex items-center mt-1 text-xs text-purple-700/90 font-sans">
                <Award size={14} className="mr-1" />
                <span>Priority matches</span>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300/80 to-amber-400/80 flex items-center justify-center mr-2 shadow-sm">
                <Award size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-heading font-medium">{isPrimeDriver ? "Prime Driver" : "Standard Driver"}</p>
                <p className="text-xs text-gray-500 font-sans">
                  {isPrimeDriver 
                    ? "$19.99/week + $1/ride" 
                    : "$2.50/ride"}
                </p>
              </div>
            </div>
            
            {isPrimeDriver && (
              <div className="px-2 py-1 bg-gradient-to-r from-amber-300/90 to-amber-400/90 rounded-full shadow-sm">
                <p className="text-xs text-white font-medium">Prime Active</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverStatsPanel;
