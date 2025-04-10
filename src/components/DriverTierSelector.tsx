
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Zap, ArrowRight, ShieldCheck, Award } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface DriverTierSelectorProps {
  isPrimeDriver: boolean;
  onChange: (isPrime: boolean) => void;
}

const DriverTierSelector: React.FC<DriverTierSelectorProps> = ({ isPrimeDriver, onChange }) => {
  const [showBenefits, setShowBenefits] = useState(false);
  const navigate = useNavigate();

  const handleTierChange = (value: string) => {
    if (value) {
      const isPrime = value === "prime";
      
      // If selecting prime and not already a prime driver, redirect to subscription
      if (isPrime && !isPrimeDriver) {
        navigate("/driver-subscription");
        return;
      }
      
      onChange(isPrime);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <h3 className="text-sm font-heading font-medium text-rideroot-darkGrey mb-3 flex items-center">
          {isPrimeDriver ? 
            <Crown size={16} className="text-amber-500 mr-1" /> :
            <Zap size={16} className="text-blue-500 mr-1" />
          }
          DRIVER TIER
        </h3>
        
        <ToggleGroup 
          type="single" 
          value={isPrimeDriver ? "prime" : "standard"} 
          onValueChange={handleTierChange} 
          className="flex w-full"
        >
          <ToggleGroupItem 
            value="standard" 
            aria-label="Standard Tier" 
            className={`w-1/2 px-5 py-3 rounded-lg flex items-center justify-center ${
              !isPrimeDriver ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-transparent text-gray-600'
            }`}
          >
            <Zap 
              size={18} 
              className="mr-2 text-white" 
              style={{ display: "inline" }}
            />
            <span className="font-heading font-medium">Pay-Per-Ride</span>
          </ToggleGroupItem>
          
          <ToggleGroupItem 
            value="prime" 
            aria-label="Prime Tier" 
            className={`w-1/2 px-5 py-3 rounded-lg flex items-center justify-center ${
              isPrimeDriver ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' : 'bg-transparent text-gray-600'
            }`}
          >
            <Crown 
              size={18} 
              className="mr-2 text-white" 
              style={{ display: "inline" }}
            />
            <span className="font-heading font-medium">Prime Driver</span>
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
            <div className={`p-3 rounded-lg ${isPrimeDriver ? 'bg-amber-50 border border-amber-100' : 'bg-blue-50 border border-blue-100'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-heading font-medium ${isPrimeDriver ? 'text-amber-700' : 'text-blue-700'}`}>
                    {isPrimeDriver 
                      ? "Prime: $19.99/week + $1/ride" 
                      : "Pay-Per-Ride: $2.50/ride"}
                  </p>
                  {isPrimeDriver && (
                    <p className="text-xs text-amber-600 mt-1 font-sans">Save more on high volume</p>
                  )}
                </div>
                
                {isPrimeDriver && (
                  <button 
                    onClick={() => setShowBenefits(!showBenefits)}
                    className="text-xs font-medium underline text-amber-600 flex items-center"
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
              className="mt-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-3 border border-amber-200"
            >
              <p className="text-xs font-heading font-medium text-amber-700 mb-2">Prime Benefits</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Award size={14} className="text-amber-500 mr-2" />
                  <p className="text-xs text-amber-700 font-sans">Priority ride assignments</p>
                </div>
                <div className="flex items-center">
                  <Zap size={14} className="text-amber-500 mr-2" />
                  <p className="text-xs text-amber-700 font-sans">Peak-time bonuses (+$0.50/ride)</p>
                </div>
                <div className="flex items-center">
                  <ShieldCheck size={14} className="text-amber-500 mr-2" />
                  <p className="text-xs text-amber-700 font-sans">5 free cancellations/day</p>
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
