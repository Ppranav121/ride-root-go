
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Zap, Menu, MapPin, MapPinned, TrendingUp } from "lucide-react";
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
import HotspotOverlay from "@/components/ride/HotspotOverlay";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";

// Use sessionStorage to persist driver online status
const getStoredOnlineStatus = () => {
  const stored = sessionStorage.getItem('driverOnlineStatus');
  return stored === 'true';
};
const DriverHome: React.FC = () => {
  const navigate = useNavigate();
  const {
    toast: shadcnToast
  } = useToast();
  const {
    user
  } = useApp();

  // Initialize isOnline from sessionStorage or default to false
  const [isOnline, setIsOnline] = useState(getStoredOnlineStatus());
  const [isPrimeDriver, setIsPrimeDriver] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(50);
  const [todayRides, setTodayRides] = useState(5);
  const [isPeakTime, setIsPeakTime] = useState(true);
  const [showEarningsBoost, setShowEarningsBoost] = useState(false);
  const [boostAmount, setBoostAmount] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);

  // Mock hotspot data - in a real app, this would come from an API
  // Fixed the type of demandLevel to be one of the allowed values: "high", "medium", or "low"
  const hotspots = [
    { id: 1, location: { top: "30%", left: "40%" }, demandLevel: "high" as const },
    { id: 2, location: { top: "50%", left: "60%" }, demandLevel: "medium" as const },
    { id: 3, location: { top: "70%", left: "30%" }, demandLevel: "low" as const }
  ];

  // Get first name for driver sidebar welcome message
  const firstName = user?.name ? user.name.split(' ')[0] : "Driver";

  // Check the URL to see if we're coming from the ride screen
  useEffect(() => {
    // If coming back from the ride screen, ensure driver stays online
    const fromRide = sessionStorage.getItem('fromRide') === 'true';
    if (fromRide) {
      setIsOnline(true);
      sessionStorage.removeItem('fromRide'); // Clear the flag
    }
  }, []);
  
  useEffect(() => {
    if (showEarningsBoost) {
      const timer = setTimeout(() => {
        setShowEarningsBoost(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showEarningsBoost]);
  
  const toggleOnlineStatus = (newStatus: boolean) => {
    setIsOnline(newStatus);
    // Store online status in sessionStorage
    sessionStorage.setItem('driverOnlineStatus', String(newStatus));
    if (newStatus) {
      shadcnToast({
        title: "You're now online",
        description: "Searching for ride requests..."
      });
      
      // Navigate to driver-ride when going online
      navigate('/driver-ride');
    } else {
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
  
  const toggleHotspots = () => {
    setShowHotspots(prev => !prev);
    if (!showHotspots) {
      toast("Hotspots enabled. High demand areas are now visible.");
    } else {
      toast("Hotspots disabled.");
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
              {showHotspots && (
                <HotspotOverlay hotspots={hotspots} />
              )}
              
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
        
        {/* Hotspot toggle button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp size={18} className="text-rideroot-primary mr-2" />
              <div>
                <h3 className="text-sm font-medium">High Demand Areas</h3>
                <p className="text-xs text-gray-500">Show hotspots on map</p>
              </div>
            </div>
            <Switch 
              checked={showHotspots} 
              onCheckedChange={toggleHotspots}
              className={`${showHotspots ? 'bg-rideroot-primary' : 'bg-gray-300'} relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200`}
            />
          </div>
        </motion.div>
        
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
          {/* Placeholder for any additional content */}
          {isOnline && (
            <Button
              className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary text-white px-8 py-5 rounded-lg shadow-lg font-medium text-base"
              onClick={() => navigate('/driver-ride')}
            >
              <MapPin className="mr-2" />
              View Active Ride Screen
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default DriverHome;
