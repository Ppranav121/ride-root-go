
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Zap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

// Custom Components
import DriverStatusToggle from "@/components/DriverStatusToggle";
import DriverTierSelector from "@/components/DriverTierSelector";
import DriverStatsPanel from "@/components/DriverStatsPanel";
import DriverSidebar from "@/components/DriverSidebar";
import MapBackground from "@/components/ride/MapBackground";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";

const DriverHome: React.FC = () => {
  const navigate = useNavigate();
  const { toast: shadcnToast } = useToast();
  const { user } = useApp();
  const [isOnline, setIsOnline] = useState(false);
  const [isPrimeDriver, setIsPrimeDriver] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(50);
  const [todayRides, setTodayRides] = useState(5);
  const [isPeakTime, setIsPeakTime] = useState(true);
  const [showEarningsBoost, setShowEarningsBoost] = useState(false);
  const [boostAmount, setBoostAmount] = useState(0);
  
  // Get first name for driver sidebar welcome message
  const firstName = user?.name ? user.name.split(' ')[0] : "Driver";
  
  useEffect(() => {
    if (showEarningsBoost) {
      const timer = setTimeout(() => {
        setShowEarningsBoost(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showEarningsBoost]);
  
  const toggleOnlineStatus = () => {
    if (!isOnline) {
      setIsOnline(true);
      shadcnToast({
        title: "You're now online",
        description: "Searching for ride requests..."
      });
    } else {
      setIsOnline(false);
      shadcnToast({
        title: "You've gone offline",
        description: "You won't receive ride requests.",
        variant: "destructive"
      });
    }
  };
  
  const toggleDriverTier = (newValue: boolean) => {
    if (!newValue) {
      setIsPrimeDriver(false);
      toast("Switched to Pay-Per-Ride: $2.50 per ride without weekly subscription.");
      return;
    }

    if (!isPrimeDriver) {
      navigate("/driver-subscription");
      return;
    }
    setIsPrimeDriver(newValue);
    if (newValue) {
      shadcnToast({
        title: "Prime Driver Activated",
        description: "You now have access to premium benefits and priority rides."
      });

      setTimeout(() => {
        setShowEarningsBoost(true);
        let count = 0;
        const interval = setInterval(() => {
          setBoostAmount(prev => prev + 0.5);
          count += 1;
          if (count >= 5) {
            clearInterval(interval);
          }
        }, 500);
      }, 1000);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.4 }} 
          transition={{ duration: 1 }} 
          className="absolute inset-0"
        >
          {isOnline && (
            <MapBackground>
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
                className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-blue-400/20" 
              />
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} 
                className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-indigo-400/20" 
              />
            </MapBackground>
          )}
        </motion.div>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-sm z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[320px] p-0">
            <DriverSidebar isPrimeDriver={isPrimeDriver} firstName={firstName} />
          </SheetContent>
        </Sheet>
        
        <h1 className="text-lg font-bold text-rideroot-text flex items-center">
          <Car size={20} className="mr-2 text-[#6c5ce7]" />
          RideRoot Driver
        </h1>
        
        <div className="w-10" />
      </div>
      
      <div className="flex-1 overflow-auto p-4 z-10 space-y-4 pb-12">
        <DriverStatusToggle isOnline={isOnline} onStatusChange={toggleOnlineStatus} />
        
        <DriverTierSelector isPrimeDriver={isPrimeDriver} onChange={toggleDriverTier} />
        
        <DriverStatsPanel todayEarnings={todayEarnings} todayRides={todayRides} isPrimeDriver={isPrimeDriver} />
        
        {isPrimeDriver && (
          <div className="mb-4">
            <div className="flex space-x-2">
              {isPeakTime && (
                <motion.span 
                  whileHover={{ scale: 1.05 }} 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center"
                >
                  <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                  Peak Bonus Active (+$0.50/ride)
                </motion.span>
              )}
              <motion.span 
                whileHover={{ scale: 1.05 }} 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-2.5 py-1 rounded-full"
              >
                Priority Rides
              </motion.span>
            </div>
          </div>
        )}
        
        <AnimatePresence>
          {showEarningsBoost && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }} 
              className="mt-4 p-3 bg-gradient-to-r from-green-100 to-green-50 border border-green-100 rounded-lg text-center"
            >
              <p className="text-sm text-green-600">Peak Bonus</p>
              <p className="text-lg font-bold text-green-600">+${boostAmount.toFixed(2)}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="mt-8 flex justify-center z-20" 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isOnline && (
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} 
              className="bg-gradient-to-b from-green-500 to-green-600 p-5 rounded-full shadow-lg"
            >
              <Car size={32} className="text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DriverHome;
