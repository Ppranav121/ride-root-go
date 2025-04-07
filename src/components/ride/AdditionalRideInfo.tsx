
import React from "react";
import { motion } from "framer-motion";

interface AdditionalRideInfoProps {
  isSubscribed?: boolean;
}

const AdditionalRideInfo: React.FC<AdditionalRideInfoProps> = ({ isSubscribed = false }) => {
  return (
    <>
      {/* Eco-Ride Impact Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center mb-4"
      >
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-green-600 text-xl">🍃</span>
        </div>
        <div>
          <p className="font-medium text-green-700">Eco-Ride Impact</p>
          <p className="text-sm text-green-600">CO2 Saved: 0.5 kg</p>
        </div>
      </motion.div>

      {/* Additional content for scrolling */}
      <div className="bg-rideroot-lightGrey rounded-lg p-4 mb-4">
        <h4 className="font-medium mb-2">Trip Details</h4>
        <p className="text-sm text-rideroot-darkGrey mb-2">Estimated trip time: 15 minutes</p>
        <p className="text-sm text-rideroot-darkGrey">Fare calculated based on distance and time</p>
      </div>
    </>
  );
};

export default AdditionalRideInfo;
