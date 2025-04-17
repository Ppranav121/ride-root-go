
import React from "react";
import { MapPin, Clock, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Location {
  id: string;
  name: string;
  address: string;
}

interface RecentLocationsProps {
  recentLocations: Location[];
  onSelectLocation: (address: string) => void;
  showRecentLocations: boolean;
  className?: string;
}

const RecentLocations: React.FC<RecentLocationsProps> = ({
  recentLocations,
  onSelectLocation,
  showRecentLocations,
  className = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  if (!showRecentLocations) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={`mb-5 bg-white/80 backdrop-blur-sm rounded-lg shadow-md ${className}`}
      >
        <div className="p-3 flex justify-between items-center">
          <h3 className="text-sm font-medium text-rideroot-darkGrey flex items-center">
            <Clock size={16} className="text-rideroot-primary mr-1" />
            RECENT LOCATIONS
          </h3>
          <CollapsibleTrigger asChild>
            <button className="rounded-full p-1 hover:bg-gray-100 transition-colors">
              {isOpen ? (
                <ChevronUp size={18} className="text-rideroot-darkGrey" />
              ) : (
                <ChevronDown size={18} className="text-rideroot-darkGrey" />
              )}
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 pt-0"
            >
              <div className="bg-rideroot-primary/5 rounded-xl p-2">
                {recentLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => onSelectLocation(location.address)}
                    className="w-full flex items-start p-2 hover:bg-rideroot-primary/10 rounded-lg transition-colors"
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
          </AnimatePresence>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default RecentLocations;
