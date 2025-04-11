import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Zap, Menu, MapPin, MapPinned, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import DriverStatusToggle from "@/components/DriverStatusToggle";
import DriverTierSelector from "@/components/DriverTierSelector";
import DriverStatsPanel from "@/components/DriverStatsPanel";
import DriverSidebar from "@/components/DriverSidebar";
import EnhancedMapView from "@/components/ride/EnhancedMapView";
import RideRequestNotification from "@/components/ride/RideRequestNotification";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";

const getStoredOnlineStatus = () => {
  const stored = sessionStorage.getItem('driverOnlineStatus');
  return stored === 'true';
};

const DriverHome: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast: shadcnToast
  } = useToast();
  const {
    user
  } = useApp();

  const [isOnline, setIsOnline] = useState(getStoredOnlineStatus());
  const [isPrimeDriver, setIsPrimeDriver] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(135.48);
  const [todayRides, setTodayRides] = useState(12);
  const [isPeakTime, setIsPeakTime] = useState(true);
  const [showEarningsBoost, setShowEarningsBoost] = useState(false);
  const [boostAmount, setBoostAmount] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showRideRequest, setShowRideRequest] = useState(false);

  useEffect(() => {
    if (isOnline) {
      const delay = Math.floor(Math.random() * 20000) + 20000;
      const requestTimer = setTimeout(() => {
        setShowRideRequest(true);
      }, delay);
      
      return () => clearTimeout(requestTimer);
    }
  }, [isOnline]);

  const hotspots = [
    {
      id: 1,
      location: {
        top: "30%",
        left: "40%"
      },
      demandLevel: "high" as const
    },
    {
      id: 2,
      location: {
        top: "50%",
        left: "60%"
      },
      demandLevel: "medium" as const
    },
    {
      id: 3,
      location: {
        top: "70%",
        left: "30%"
      },
      demandLevel: "low" as const
    },
    {
      id: 4,
      location: {
        top: "20%",
        left: "65%"
      },
      demandLevel: "high" as const
    },
    {
      id: 5,
      location: {
        top: "60%",
        left: "20%"
      },
      demandLevel: "medium" as const
    }
  ];

  const driverPosition = {
    top: "45%",
    left: "45%"
  };

  const firstName = user?.name ? user.name.split(' ')[0] : "Driver";

  useEffect(() => {
    const fromRide = sessionStorage.getItem('fromRide') === 'true';
    if (fromRide) {
      setIsOnline(true);
      sessionStorage.removeItem('fromRide');
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
    sessionStorage.setItem('driverOnlineStatus', String(newStatus));
    if (newStatus) {
      shadcnToast({
        title: "You're now online",
        description: "Searching for ride requests..."
      });
    } else {
      shadcnToast({
        title: "You've gone offline",
        description: "You won't receive ride requests.",
        variant: "destructive"
      });
      setShowRideRequest(false);
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

  const handleViewRideRequest = () => {
    setShowRideRequest(false);
    navigate('/driver-ride');
  };

  const handleDismissRideRequest = () => {
    setShowRideRequest(false);
    toast.error("Ride request dismissed", {
      description: "You can still find other rides"
    });
  };

  const currentPath = location.pathname;

  return (
    <div className="flex flex-col min-h-screen relative">
      <EnhancedMapView showHotspots={showHotspots} hotspots={hotspots} driverPosition={driverPosition} allowScroll={true} />
      
      <div className="fixed top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0">
              <DriverSidebar 
                isPrimeDriver={isPrimeDriver} 
                firstName={firstName} 
                currentPath={currentPath}
              />
            </SheetContent>
          </Sheet>
          
          <h1 className="text-lg font-bold text-rideroot-text flex items-center">
            <Car size={20} className="mr-2 text-[#6c5ce7]" />
            RideRoot Driver
          </h1>
          
          <div className="w-10" />
        </div>
      </div>
      
      <RideRequestNotification 
        isVisible={showRideRequest}
        onClose={handleDismissRideRequest}
        onView={handleViewRideRequest}
      />
      
      <ScrollArea className="fixed inset-x-0 top-16 bottom-0 z-10">
        <div className="p-4 flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="space-y-4 mb-6">
            <DriverStatusToggle isOnline={isOnline} onStatusChange={toggleOnlineStatus} />
            
            <DriverTierSelector isPrimeDriver={isPrimeDriver} onChange={toggleDriverTier} />
            
            <DriverStatsPanel todayEarnings={todayEarnings} todayRides={todayRides} isPrimeDriver={isPrimeDriver} />
          </div>
          
          <div className="flex-1" />  {/* Spacer */}
          
          <div className="space-y-4 mb-20">
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
      </ScrollArea>
    </div>
  );
};

export default DriverHome;
