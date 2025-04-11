
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, User, HelpCircle, MessageCircle, Crown, Zap, Settings, Bell, MapPin, ChevronRight, DollarSign, Car, Star, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Custom Components
import DriverBottomNav from "@/components/DriverBottomNav";
import DriverStatusToggle from "@/components/DriverStatusToggle";
import DriverTierSelector from "@/components/DriverTierSelector";
import DriverStatsPanel from "@/components/DriverStatsPanel";

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
  const [showNotifications, setShowNotifications] = useState(false);
  
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
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };
  
  return (
    <div className="flex flex-col min-h-screen relative bg-gradient-to-br from-rideroot-background to-gray-50">
      {/* Beautiful background with subtle animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-indigo-50/90 opacity-90" />
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.5 }} 
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

      {/* Floating Header Elements */}
      <div className="z-20 fixed top-0 left-0 right-0 p-4 flex justify-between items-center">
        {/* Left side - Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <motion.button 
              className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-gray-100 hover:bg-white/100 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={24} className="text-rideroot-primary" />
            </motion.button>
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
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-lg py-5 font-medium" 
                  >
                    <Gift className="mr-2" size={20} />
                    Referrals
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

        {/* Right side - Notifications */}
        <div className="relative">
          <motion.button 
            className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-gray-100 hover:bg-white/100 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleNotifications}
          >
            <Bell size={24} className="text-rideroot-primary" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </motion.button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
              >
                <div className="p-3 border-b bg-gradient-to-r from-rideroot-primary/5 to-rideroot-secondary/5">
                  <h3 className="font-semibold text-gray-800">Recent Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                    <div className="flex">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <DollarSign size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">You received a $5.00 tip!</p>
                        <p className="text-xs text-gray-500">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                    <div className="flex">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Star size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New 5-star rating received!</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b hover:bg-gray-50 cursor-pointer">
                    <div className="flex">
                      <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Zap size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Surge pricing active in your area</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center bg-gray-50">
                  <button className="text-sm text-rideroot-primary font-medium">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Earnings Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-xl overflow-hidden border border-white/50">
          <div className="px-8 py-4">
            <p className="text-center text-sm font-medium text-gray-500 mb-1">Today's Earnings</p>
            <p className="text-center text-3xl font-bold text-rideroot-primary">${todayEarnings.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-r from-rideroot-primary/5 to-rideroot-secondary/10 px-6 py-2 flex justify-between items-center">
            <div className="text-center">
              <p className="text-xs text-gray-500">RIDES</p>
              <p className="font-semibold">{todayRides}</p>
            </div>
            <div className="h-8 border-r border-gray-200"></div>
            <div className="text-center">
              <p className="text-xs text-gray-500">HOURS</p>
              <p className="font-semibold">3.5</p>
            </div>
            <div className="h-8 border-r border-gray-200"></div>
            <div className="text-center">
              <p className="text-xs text-gray-500">AVG/RIDE</p>
              <p className="font-semibold">${(todayEarnings / todayRides).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 z-10 pt-40 pb-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Driver Tier Card */}
          <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-white/50 shadow-lg overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-rideroot-primary/5 to-rideroot-secondary/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Driver Tier</h3>
                <Badge className="bg-amber-100 text-amber-600 flex items-center gap-1">
                  <Crown size={12} /> 
                  Premium
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress to Platinum</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-rideroot-primary to-rideroot-secondary rounded-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-xs text-gray-500">PRIORITY RIDES</h4>
                    <p className="text-xl font-semibold">7</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-xs text-gray-500">PREMIUM BENEFITS</h4>
                    <p className="text-xl font-semibold">Active</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t border-gray-100 py-3">
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-between text-rideroot-primary"
                onClick={() => {}}
              >
                <span>View Tier Benefits</span>
                <ChevronRight size={16} />
              </Button>
            </CardFooter>
          </Card>

          {/* Driver Stats Panel */}
          <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-white/50 shadow-lg overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-rideroot-primary/5 to-rideroot-secondary/10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Performance Stats</h3>
                <Badge className="bg-green-100 text-green-600 flex items-center gap-1">
                  <Star size={12} /> 
                  4.9 Rating
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Car size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ACCEPTANCE RATE</p>
                    <p className="font-semibold">92%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">COMPLIMENTS</p>
                    <p className="font-semibold">24</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <MapPin size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">TOTAL RIDES</p>
                    <p className="font-semibold">420</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">AVG WEEKLY</p>
                    <p className="font-semibold">$670.25</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Driver Status Toggle (Online/Offline) */}
          <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-white/50 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Go Online</h3>
                  <p className="text-sm text-gray-500">Start receiving ride requests</p>
                </div>
                <Button 
                  className={`rounded-full px-6 ${isOnline ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`} 
                  onClick={() => toggleOnlineStatus(!isOnline)}
                >
                  {isOnline ? 'Go Offline' : 'Go Online'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Earnings boost animation */}
          <AnimatePresence>
            {showEarningsBoost && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed top-1/4 left-1/2 -translate-x-1/2 z-40"
              >
                <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-lg border border-green-100 px-8 py-6">
                  <div className="text-center">
                    <DollarSign className="mx-auto h-12 w-12 text-green-500 mb-2" />
                    <p className="text-sm text-green-600 font-medium">Peak Time Bonus</p>
                    <p className="text-3xl font-bold text-green-600">+${boostAmount.toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Bottom Navigation */}
      <DriverBottomNav />
    </div>
  );
};

export default DriverHome;
