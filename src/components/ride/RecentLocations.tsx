
import React from "react";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Location {
  id: string;
  name: string;
  address: string;
}

interface RecentLocationsProps {
  recentLocations: Location[];
  onSelectLocation: (address: string) => void;
  showRecentLocations: boolean;
}

const RecentLocations: React.FC<RecentLocationsProps> = ({
  recentLocations,
  onSelectLocation,
  showRecentLocations,
}) => {
  if (!showRecentLocations) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden mb-5"
    >
      <h3 className="text-sm font-medium text-rideroot-darkGrey mb-2 flex items-center">
        <Clock size={16} className="mr-1" />
        RECENT LOCATIONS
      </h3>
      <div className="bg-rideroot-lightGrey rounded-xl p-2">
        {recentLocations.map((location) => (
          <button
            key={location.id}
            onClick={() => onSelectLocation(location.address)}
            className="w-full flex items-start p-2 hover:bg-white rounded-lg transition-colors"
          >
            <MapPin size={20} className="text-rideroot-primary mt-1 mr-3 flex-shrink-0" />
            <div className="text-left">
              <p className="font-medium text-rideroot-text">{location.name}</p>
              <p className="text-sm text-rideroot-darkGrey">{location.address}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentLocations;
