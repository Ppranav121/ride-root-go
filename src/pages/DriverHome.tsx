
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Car, BarChart2, User, HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Custom Components
import DriverBottomNav from "@/components/DriverBottomNav";
import DriverStatusToggle from "@/components/DriverStatusToggle";
import DriverTierSelector from "@/components/DriverTierSelector";
import DriverStatsPanel from "@/components/DriverStatsPanel";
import MapBackground from "@/components/ride/MapBackground";

const DriverHome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(false);
  const [isPrimeDriver, setIsPrimeDriver] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(50);
  const [todayRides, setTodayRides] = useState(5);
  const [isPeakTime, setIsPeakTime] = useState(true);
  const [showEarningsBoost, setShowEarningsBoost] = useState(false);
  const [boostAmount, setBoostAmount] = useState(0);
  const [pulseShadow, setPulseShadow] = useState(false);
  
  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        setPulseShadow(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isOnline]);
  
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    
    if (!isOnline) {
      toast({
        title: "You're now online",
        description: "You'll start receiving ride requests shortly.",
      });
      // Automatically navigate to searching for rides
      setTimeout(() => {
        navigate("/driver-ride");
      }, 500);
    } else {
      toast({
        title: "You've gone offline",
        description: "You won't receive any ride requests.",
        variant: "destructive",
      });
    }
  };

  const toggleDriverTier = (newValue: boolean) => {
    setIsPrimeDriver(newValue);
    
    if (newValue) {
      toast({
        title: "Prime Driver Activated",
        description: "You now have access to premium benefits and priority rides.",
      });

      // Simulate earnings boost after small delay
      setTimeout(() => {
        setShowEarningsBoost(true);
        let count = 0;
        const interval = setInterval(() => {
          setBoostAmount(prev => prev + 0.5);
          count += 1;
          if (count >= 5) {
            clearInterval(interval);
            setTimeout(() => setShowEarningsBoost(false), 2000);
          }
        }, 500);
      }, 1000);
    } else {
      toast({
        title: "Switched to Pay-Per-Ride",
        description: "$2.50 per ride without weekly subscription.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Animated Background */}
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
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut" 
                }}
                className="absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full bg-blue-400/20"
              />
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-indigo-400/20"
              />
            </MapBackground>
          )}
        </motion.div>
      </div>

      {/* Header with menu */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-sm z-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[270px] bg-white">
            <div className="flex flex-col h-full">
              <div className="py-6">
                <div className="w-16 h-16 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Car size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-center">
                  Driver Portal
                </h2>
                <p className="text-center text-rideroot-darkGrey">
                  {isPrimeDriver ? "Prime Driver" : "Pay-Per-Ride Driver"}
                </p>
              </div>
              
              <nav className="flex-1">
                <div className="space-y-1">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-lg py-5 font-medium"
                    onClick={() => navigate("/driver-home")}
                  >
                    <Car className="mr-2" size={20} />
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-lg py-5 font-medium"
                    onClick={() => navigate("/driver-earnings")}
                  >
                    <BarChart2 className="mr-2" size={20} />
                    Earnings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-lg py-5 font-medium"
                    onClick={() => navigate("/driver-profile")}
                  >
                    <User className="mr-2" size={20} />
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-lg py-5 font-medium"
                    onClick={() => navigate("/driver-help")}
                  >
                    <HelpCircle className="mr-2" size={20} />
                    Help Center
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-lg py-5 font-medium"
                    onClick={() => navigate("/driver-messages")}
                  >
                    <MessageCircle className="mr-2" size={20} />
                    Messages
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        <h1 className="text-lg font-bold text-rideroot-text flex items-center">
          <Car size={20} className="mr-2 text-rideroot-primary" />
          RideRoot Driver
        </h1>
        
        <div className="w-10" />
      </div>
      
      <div className="flex-1 overflow-auto p-4 z-10 space-y-4 pb-24">
        {/* Driver status toggle */}
        <DriverStatusToggle
          isOnline={isOnline}
          onStatusChange={toggleOnlineStatus}
        />
        
        {/* Driver tier selector */}
        <DriverTierSelector
          isPrimeDriver={isPrimeDriver}
          onChange={toggleDriverTier}
        />
        
        {/* Driver stats panel */}
        <DriverStatsPanel 
          todayEarnings={todayEarnings}
          todayRides={todayRides}
          isPrimeDriver={isPrimeDriver}
        />
        
        {/* Prime badges */}
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
        
        {/* Earnings boost animation */}
        {showEarningsBoost && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-gradient-to-r from-green-100 to-green-50 border border-green-100 rounded-lg text-center"
          >
            <p className="text-sm text-green-600">Peak Bonus</p>
            <p className="text-lg font-bold text-green-600">+${boostAmount.toFixed(2)}</p>
          </motion.div>
        )}
        
        {/* Main action button - Made larger and more prominent */}
        <motion.div 
          className="mt-8 sticky bottom-20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => {
              if (isOnline) {
                navigate("/driver-ride");
              } else {
                toggleOnlineStatus();
              }
            }}
            className={`w-full py-8 rounded-xl text-white font-bold text-lg hover:opacity-95 transition-all ${
              isOnline 
                ? "bg-gradient-to-r from-rideroot-primary to-rideroot-secondary shadow-lg" 
                : "bg-gradient-to-r from-green-500 to-green-600 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-center">
              {isOnline ? (
                <>
                  <motion.div 
                    animate={{ 
                      boxShadow: pulseShadow 
                        ? [
                            "0 0 0 0 rgba(0, 255, 0, 0)",
                            "0 0 0 10px rgba(0, 255, 0, 0.1)",
                            "0 0 0 20px rgba(0, 255, 0, 0)"
                          ] 
                        : "0 0 0 0 rgba(0, 255, 0, 0)"
                    }}
                    transition={{ duration: 1.5 }}
                    className="w-4 h-4 rounded-full bg-green-500 mr-3"
                  />
                  <span className="text-md">Find Ride Requests</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 rounded-full bg-white/80 mr-3" />
                  <span className="text-md">GO ONLINE</span>
                </>
              )}
            </div>
          </Button>
        </motion.div>
      </div>
      
      <DriverBottomNav />
    </div>
  );
};

export default DriverHome;
