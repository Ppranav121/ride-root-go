
import React from "react";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface LocationBannerProps {
  isExpanded: boolean;
  onToggle: () => void;
  pickupLocation: string;
  dropoffLocation: string;
}

const LocationBanner: React.FC<LocationBannerProps> = ({
  isExpanded,
  onToggle,
  pickupLocation,
  dropoffLocation,
}) => {
  return (
    <div className="absolute top-16 left-0 right-0 z-30 px-4">
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        animate={{ height: isExpanded ? "auto" : "48px" }}
        initial={false}
      >
        <button
          onClick={onToggle}
          className="w-full px-4 py-3 flex items-center justify-between bg-white"
        >
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-rideroot-primary" />
            <span className="font-medium">Location Details</span>
          </div>
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pb-4"
            >
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Pickup</label>
                  <p className="font-medium">{pickupLocation}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Dropoff</label>
                  <p className="font-medium">{dropoffLocation || "Not set"}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LocationBanner;
