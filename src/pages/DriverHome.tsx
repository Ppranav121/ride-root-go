import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import EnhancedMapView from "@/components/ride/EnhancedMapView";
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
  const [todayEarnings, setTodayEarnings] = useState(135.48);
  const [todayRides, setTodayRides] = useState(12);
  const [isPeakTime, setIsPeakTime] = useState(true);
  const [showEarningsBoost, setShowEarningsBoost] = useState(false);
  const [boostAmount, setBoostAmount] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);

  // Mock hotspot data - in a real app, this would come from an API
  // Fixed the type of demandLevel to be one of the allowed values: "high", "medium", or "low"
  const hotspots = [{
    id: 1,
    location: {
      top: "30%",
      left: "40%"
    },
    demandLevel: "high" as const
  }, {
    id: 2,
    location: {
      top: "50%",
      left: "60%"
    },
    demandLevel: "medium" as const
  }, {
    id: 3,
    location: {
      top: "70%",
      left: "30%"
    },
    demandLevel: "low" as const
  }, {
    id: 4,
    location: {
      top: "20%",
      left: "65%"
    },
    demandLevel: "high" as const
  }, {
    id: 5,
    location: {
      top: "60%",
      left: "20%"
    },
    demandLevel: "medium" as const
  }];

  // Driver position for the map
  const driverPosition = {
    top: "45%",
    left: "45%"
  };

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
  return <div className="flex flex-col min-h-screen relative">
      {/* Full-screen map view */}
      <EnhancedMapView showHotspots={showHotspots} hotspots={hotspots} driverPosition={driverPosition} />
      
      {/* Header with transparency */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between p-4">
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
      </div>
      
      {/* Main content - Using absolute positioning for overlay on map */}
      <div className="fixed inset-x-0 top-16 bottom-0 z-10 pointer-events-none">
        <div className="h-full p-4 flex flex-col">
          {/* Status and earning components - These need pointer events */}
          <div className="space-y-4 pointer-events-auto">
            <DriverStatusToggle isOnline={isOnline} onStatusChange={toggleOnlineStatus} />
            
            <DriverTierSelector isPrimeDriver={isPrimeDriver} onChange={toggleDriverTier} />
            
            <DriverStatsPanel todayEarnings={todayEarnings} todayRides={todayRides} isPrimeDriver={isPrimeDriver} />
          </div>
          
          <div className="flex-1" />  {/* Spacer */}
          
          {/* Bottom controls - These need pointer events */}
          <div className="space-y-4 mb-20 pointer-events-auto">
            {/* Prime Driver Tags */}
            {isPrimeDriver && <div className="mb-4 flex flex-wrap gap-2">
                {isPeakTime && <motion.span whileHover={{
              scale: 1.05
            }} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                    Peak Bonus Active (+$0.50/ride)
                  </motion.span>}
                <motion.span whileHover={{
              scale: 1.05
            }} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  Priority Rides
                </motion.span>
              </div>}
          
            {/* Hotspot toggle button */}
            
            
            <AnimatePresence>
              {showEarningsBoost && <motion.div initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.9
            }} className="p-3 bg-gradient-to-r from-green-100 to-green-50 border border-green-100 rounded-lg text-center">
                  <p className="text-sm text-green-600">Peak Bonus</p>
                  <p className="text-lg font-bold text-green-600">+${boostAmount.toFixed(2)}</p>
                </motion.div>}
            </AnimatePresence>
            
            {isOnline && <motion.div className="flex justify-center" initial={{
            scale: 1
          }} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
                <Button className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary text-white px-8 py-5 rounded-lg shadow-lg font-medium text-base" onClick={() => navigate('/driver-ride')}>
                  <MapPin className="mr-2" />
                  View Active Ride Screen
                </Button>
              </motion.div>}
          </div>
        </div>
      </div>
    </div>;
};
export default DriverHome;