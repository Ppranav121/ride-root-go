import React, { useState } from "react";
import { Info, Phone, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import MessageDialog from "./MessageDialog";
import { useApp } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
interface RouteInfoCardProps {
  pickupLocation: string;
  dropoffLocation: string;
  rideOption: string;
  capacityOption: string;
  distance: string | number;
  fare: number;
  expanded: boolean;
  onExpandToggle: () => void;
}
const RouteInfoCard: React.FC<RouteInfoCardProps> = ({
  pickupLocation,
  dropoffLocation,
  rideOption,
  capacityOption,
  distance,
  fare,
  expanded,
  onExpandToggle
}) => {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const {
    currentRide
  } = useApp();
  const rideOptionLabel = (option: string, capacity: string) => {
    let label = option.charAt(0).toUpperCase() + option.slice(1);
    if (capacity === "xl") {
      label += " Capacity XL";
    }
    return label;
  };
  const handleCallDriver = () => {
    toast({
      title: "Calling driver",
      description: "This feature would initiate a call to your driver in a real app."
    });
  };
  return <Collapsible open={expanded} onOpenChange={onExpandToggle}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-sm text-gray-500">ROUTE DETAILS</h4>
          <CollapsibleTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </CollapsibleTrigger>
        </div>
        
        <div className="flex items-start mb-4">
          <div className="mr-4 flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-rideroot-primary"></div>
            <div className="w-0.5 h-12 bg-gradient-to-b from-rideroot-primary to-rideroot-accent my-1"></div>
            <div className="w-3 h-3 rounded-full bg-rideroot-accent"></div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm text-gray-500">Pickup</p>
              <p className="font-medium text-rideroot-text">{pickupLocation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dropoff</p>
              <p className="font-medium text-rideroot-text">{dropoffLocation}</p>
            </div>
          </div>
        </div>

        <CollapsibleContent>
          <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: "auto"
        }} exit={{
          opacity: 0,
          height: 0
        }} transition={{
          duration: 0.2
        }}>
            <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Info size={16} className="mr-2" />
                <span>{rideOptionLabel(rideOption, capacityOption)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>{distance} miles</span>
                <span className="font-medium text-rideroot-primary">${fare}</span>
              </div>
            </div>

            <div className="flex space-x-3 mt-4">
              
              
            </div>
          </motion.div>
        </CollapsibleContent>
      </div>

      {currentRide && currentRide.driver && <MessageDialog isOpen={isMessageOpen} onClose={() => setIsMessageOpen(false)} driverName={currentRide.driver.name} />}
    </Collapsible>;
};
export default RouteInfoCard;