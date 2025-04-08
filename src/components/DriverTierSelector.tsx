
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Zap, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface DriverTierSelectorProps {
  isPrimeDriver: boolean;
  onChange: (isPrime: boolean) => void;
}

const DriverTierSelector: React.FC<DriverTierSelectorProps> = ({ isPrimeDriver, onChange }) => {
  const [showBenefits, setShowBenefits] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-sm font-medium text-rideroot-darkGrey mb-3">Driver Tier</h3>
        
        <ToggleGroup type="single" value={isPrimeDriver ? "prime" : "standard"} onValueChange={(value) => {
          if (value) onChange(value === "prime");
        }}>
          <ToggleGroupItem value="standard" aria-label="Standard Tier" className={`w-1/2 px-5 py-3 rounded-lg ${!isPrimeDriver ? 'bg-blue-50 text-blue-700' : 'bg-transparent text-gray-600'}`}>
            <div className="flex items-center justify-center">
              <Zap size={18} className={`mr-2 ${!isPrimeDriver ? 'text-blue-500' : 'text-gray-400'}`} />
              <span>Pay-Per-Ride</span>
            </div>
          </ToggleGroupItem>
          
          <ToggleGroupItem value="prime" aria-label="Prime Tier" className={`w-1/2 px-5 py-3 rounded-lg ${isPrimeDriver ? 'bg-gradient-to-r from-rideroot-primary to-rideroot-secondary text-white' : 'bg-transparent text-gray-600'}`}>
            <div className="flex items-center justify-center">
              <Crown size={18} className="mr-2" />
              <span>Prime Driver</span>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
        
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-sm"
          >
            <div className={`p-3 rounded-lg ${isPrimeDriver ? 'bg-indigo-50' : 'bg-blue-50'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-medium ${isPrimeDriver ? 'text-indigo-700' : 'text-blue-700'}`}>
                    {isPrimeDriver 
                      ? "Prime: $19.99/week + $1/ride" 
                      : "Pay-Per-Ride: $2.50/ride"}
                  </p>
                  {isPrimeDriver && (
                    <p className="text-xs text-indigo-600 mt-1">Save more on high volume</p>
                  )}
                </div>
                
                {isPrimeDriver && (
                  <button 
                    onClick={() => setShowBenefits(!showBenefits)}
                    className="text-xs font-medium underline text-indigo-600 flex items-center"
                  >
                    {showBenefits ? "Hide Benefits" : "Show Benefits"}
                    <ArrowRight size={12} className={`ml-1 transition-transform ${showBenefits ? 'rotate-90' : ''}`} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
          {showBenefits && isPrimeDriver && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3"
            >
              <p className="text-xs font-medium text-indigo-700 mb-2">Prime Benefits</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Award size={14} className="text-indigo-500 mr-2" />
                  <p className="text-xs text-indigo-700">Priority ride assignments</p>
                </div>
                <div className="flex items-center">
                  <Zap size={14} className="text-indigo-500 mr-2" />
                  <p className="text-xs text-indigo-700">Peak-time bonuses (+$0.50/ride)</p>
                </div>
                <div className="flex items-center">
                  <ShieldCheck size={14} className="text-indigo-500 mr-2" />
                  <p className="text-xs text-indigo-700">5 free cancellations/day</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DriverTierSelector;
