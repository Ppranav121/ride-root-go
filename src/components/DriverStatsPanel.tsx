
import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Clock } from "lucide-react";

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
    <div className="grid grid-cols-2 gap-3">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="p-4 rounded-xl shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
      >
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
            <DollarSign size={16} className="text-blue-500" />
          </div>
          <p className="text-xs text-blue-700">Today's Earnings</p>
        </div>
        <h3 className="text-xl font-bold text-blue-700">${todayEarnings.toFixed(2)}</h3>
        {isPrimeDriver && (
          <p className="text-xs text-blue-600 mt-1">Including Prime benefits</p>
        )}
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="p-4 rounded-xl shadow-sm bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100"
      >
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
            <Clock size={16} className="text-purple-500" />
          </div>
          <p className="text-xs text-purple-700">Today's Rides</p>
        </div>
        <h3 className="text-xl font-bold text-purple-700">{todayRides}</h3>
        {isPrimeDriver && todayRides > 0 && (
          <p className="text-xs text-purple-600 mt-1">Prime discounts applied</p>
        )}
      </motion.div>
    </div>
  );
};

export default DriverStatsPanel;
