
import React from "react";
import { Navigation, Info, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface FareEstimateProps {
  distance: number;
  rideOption: string;
  capacityOption: string;
  fare: number;
  isSubscribed: boolean;
}

const FareEstimate: React.FC<FareEstimateProps> = ({
  distance,
  rideOption,
  capacityOption,
  fare,
  isSubscribed,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-4 mb-5 border border-rideroot-mediumGrey"
    >
      <h3 className="text-lg font-semibold mb-3 text-rideroot-text">Fare Estimate</h3>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-1.5">
            <Navigation size={16} className="text-rideroot-primary mr-2" />
            <p className="text-rideroot-darkGrey">Distance: {distance} miles</p>
          </div>
          <div className="flex items-center mb-1.5">
            <Info size={16} className="text-rideroot-accent mr-2" />
            <p className="text-rideroot-darkGrey">
              {rideOption === "standard" ? "Standard" : "Premium"} 
              {capacityOption === "xl" ? " Capacity XL" : ""}
            </p>
          </div>
          {isSubscribed && (
            <div className="flex items-center">
              <div className="w-4 h-4 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs text-rideroot-primary">%</span>
              </div>
              <p className="text-xs text-rideroot-primary">10% Subscriber Discount Applied</p>
            </div>
          )}
        </div>
        <div className="text-2xl font-bold text-rideroot-text">${fare}</div>
      </div>

      {/* Estimated arrival time */}
      <div className="mt-3 pt-3 border-t border-rideroot-mediumGrey flex justify-between items-center">
        <div className="flex items-center text-rideroot-darkGrey">
          <Clock size={16} className="mr-2" />
          <span>Estimated arrival:</span>
        </div>
        <div className="font-semibold">10:45 AM (5 min)</div>
      </div>
    </motion.div>
  );
};

export default FareEstimate;
