
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Car, User, HelpCircle, MessageCircle, Crown, Zap, Settings, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import RootHeader from "@/components/RootHeader";

// Custom Components
import DriverBottomNav from "@/components/DriverBottomNav";
import DriverStatusToggle from "@/components/DriverStatusToggle";
import DriverTierSelector from "@/components/DriverTierSelector";
import DriverStatsPanel from "@/components/DriverStatsPanel";
import MapBackground from "@/components/ride/MapBackground";

const DriverHome: React.FC = () => {
  const navigate = useNavigate();
  const { toast: shadcnToast } = useToast();
  const [isOnline, setIsOnline] = useState(false);
  const [isPrimeDriver, setIsPrimeDriver] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(50);
  const [todayRides, setTodayRides] = useState(5);
  const [isPeakTime, setIsPeakTime] = useState(true);
  const [showEarningsBoost, setShowEarningsBoost] = useState(false);
  const [boostAmount, setBoostAmount] = useState(0);
  
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
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-rideroot-background to-gray-50">
      {/* Map Background with Subtle Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-70" />
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.4 }} 
          transition={{ duration: 1 }} 
          className="absolute inset-0"
        >
          {!isOnline && (
            <>
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
            </>
          )}
        </motion.div>
      </div>

      {/* Header */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="z-10">
            <RootHeader
              showBackButton={false}
              transparent={true}
              title={
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu size={24} />
                  </Button>
                  <span className="text-lg font-bold text-rideroot-text flex items-center">
                    <Car size={20} className="mr-2 text-rideroot-primary" />
                    RideRoot Driver
                  </span>
                </div>
              }
            />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] bg-white">
          <div className="flex flex-col h-full">
            <div className="py-6">
              <div className="w-20 h-20 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                <User size={40} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-center font-heading">
                Welcome, Driver
              </h2>
              <div className="flex items-center justify-center mt-2">
                {isPrimeDriver ? (
                  <Badge className="bg-amber-100 text-amber-600 hover:bg-amber-200 px-3 py-1.5 flex items-center">
                    <Crown size={14} className="mr-1" />
                    Prime Driver
                  </Badge>
                ) : (
                  <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1.5 flex items-center">
                    <Zap size={14} className="mr-1" />
                    Pay-Per-Ride Driver
                  </Badge>
                )}
              </div>
            </div>
            
            <nav className="flex-1 mt-6">
              <div className="space-y-1 px-2">
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
                  onClick={() => navigate("/driver-settings")}
                >
                  <Settings className="mr-2" size={20} />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start rounded-lg py-5 font-medium" 
                  onClick={() => navigate("/driver-messages")}
                >
                  <MessageCircle className="mr-2" size={20} />
                  Messages
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start rounded-lg py-5 font-medium" 
                  onClick={() => navigate("/driver-help")}
                >
                  <HelpCircle className="mr-2" size={20} />
                  Help Center
                </Button>
              </div>
            </nav>

            <div className="mt-auto p-4 border-t">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary p-4 rounded-lg text-white"
              >
                <h4 className="font-medium text-sm mb-1">Driver Rating</h4>
                <div className="flex items-center">
                  <div className="text-lg font-bold">4.9</div>
                  <div className="flex ml-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0.7, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        ★
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="text-xs mt-1">Based on 420 rides</div>
              </motion.div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <div className="flex-1 overflow-auto p-4 z-10 space-y-4 pb-24 mt-4">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/90 backdrop-blur-sm border-transparent shadow-lg overflow-hidden">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-bold font-heading text-center">Today's Performance</h2>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-rideroot-primary mb-1">${todayEarnings.toFixed(2)}</div>
                <div className="text-gray-500 text-sm">Earnings Today</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-rideroot-lightGrey rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-rideroot-text">{todayRides}</div>
                  <div className="text-gray-500 text-xs">Rides Completed</div>
                </div>
                <div className="bg-rideroot-lightGrey rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-green-600">80%</div>
                  <div className="text-gray-500 text-xs">Acceptance Rate</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-2">
              <Button 
                className="w-full bg-gradient-to-r from-rideroot-primary to-rideroot-secondary text-white" 
                onClick={() => navigate("/driver-ride")}
              >
                Start Driving <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <DriverStatusToggle isOnline={isOnline} onStatusChange={toggleOnlineStatus} />
        
        <DriverTierSelector isPrimeDriver={isPrimeDriver} onChange={toggleDriverTier} />
        
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
        
        {isPrimeDriver && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-4"
          >
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
          </motion.div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <DriverBottomNav />
    </div>
  );
};

export default DriverHome;
