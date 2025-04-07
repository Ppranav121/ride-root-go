
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, ChevronRight, Menu, Shield, Car, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import RootHeader from "@/components/RootHeader";
import BottomNav from "@/components/BottomNav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

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
  
  // Simulated earnings data
  const recentRides = [
    { id: "1", pickupLocation: "Washington St", dropoffLocation: "Market Ave", earnings: 14.50, time: "10:24 AM", isPremium: false },
    { id: "2", pickupLocation: "Union Square", dropoffLocation: "Golden Gate Park", earnings: 21.50, time: "12:05 PM", isPremium: true },
    { id: "3", pickupLocation: "Financial District", dropoffLocation: "Marina District", earnings: 16.50, time: "2:30 PM", isPremium: false },
  ];

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    
    if (!isOnline) {
      toast({
        title: "You're now online",
        description: "You'll start receiving ride requests shortly.",
      });
    } else {
      toast({
        title: "You've gone offline",
        description: "You won't receive any ride requests.",
        variant: "destructive",
      });
    }
  };

  const toggleDriverTier = () => {
    setIsPrimeDriver(!isPrimeDriver);
    
    if (!isPrimeDriver) {
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-rideroot-lightGrey">
      {/* Header with menu */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[270px] bg-white">
            <div className="flex flex-col h-full">
              <div className="py-6">
                <div className="w-16 h-16 bg-rideroot-primary rounded-full flex items-center justify-center mb-4 mx-auto">
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
                    <Star className="mr-2" size={20} />
                    Earnings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-lg py-5 font-medium"
                    onClick={() => navigate("/driver-profile")}
                  >
                    <Shield className="mr-2" size={20} />
                    Profile & Safety
                  </Button>
                </div>
              </nav>
              
              <div className="border-t border-gray-200 pt-4 pb-6">
                <Button 
                  variant="outline" 
                  className="w-full border-rideroot-primary text-rideroot-primary"
                  onClick={() => navigate("/")}
                >
                  Switch to Rider
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <h1 className="text-lg font-bold text-rideroot-text flex items-center">
          <Car size={20} className="mr-2 text-rideroot-primary" />
          RideRoot Driver
        </h1>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => navigate("/notifications")}
        >
          <div className="relative">
            <Clock size={24} />
            {isPeakTime && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rideroot-danger rounded-full"></span>
            )}
          </div>
        </Button>
      </div>
      
      {/* Driver status panel */}
      <div className="p-4 bg-white shadow-md rounded-b-xl mx-4 mb-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                {isOnline ? "You're Online" : "Go Online to Drive"}
              </h2>
              <p className="text-sm text-rideroot-darkGrey">
                {isOnline 
                  ? "You're receiving ride requests" 
                  : "Toggle to start receiving requests"}
              </p>
            </div>
            <Switch 
              checked={isOnline} 
              onCheckedChange={toggleOnlineStatus} 
              className={isOnline ? "bg-green-500" : ""} 
            />
          </div>
          
          <div className="py-3 px-4 bg-gray-50 rounded-xl mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-rideroot-darkGrey">Driver Tier</p>
                <h3 className="font-medium">
                  {isPrimeDriver 
                    ? "Prime: $19.99/week + $1/ride" 
                    : "Pay-Per-Ride: $2.50/ride"}
                </h3>
              </div>
              <Switch 
                checked={isPrimeDriver} 
                onCheckedChange={toggleDriverTier} 
                className={isPrimeDriver ? "bg-rideroot-primary" : ""} 
              />
            </div>
          </div>
          
          {isPrimeDriver && (
            <div className="mb-4">
              <div className="flex space-x-2">
                {isPeakTime && (
                  <span className="bg-rideroot-primary/10 text-rideroot-primary text-xs font-medium px-2.5 py-1 rounded-full">
                    Peak Bonus Active (+$0.50/ride)
                  </span>
                )}
                <span className="bg-rideroot-accent/10 text-rideroot-accent text-xs font-medium px-2.5 py-1 rounded-full">
                  Priority Rides
                </span>
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <div className="text-center p-3 bg-gray-50 rounded-lg flex-1 mr-2">
              <p className="text-sm text-rideroot-darkGrey">Today's Earnings</p>
              <h3 className="text-xl font-bold text-rideroot-primary">${todayEarnings.toFixed(2)}</h3>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg flex-1 ml-2">
              <p className="text-sm text-rideroot-darkGrey">Today's Rides</p>
              <h3 className="text-xl font-bold text-rideroot-accent">{todayRides}</h3>
            </div>
          </div>
          
          {/* Earnings boost animation */}
          {showEarningsBoost && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg text-center"
            >
              <p className="text-sm text-green-600">Peak Bonus</p>
              <p className="text-lg font-bold text-green-600">+${boostAmount.toFixed(2)}</p>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Map placeholder */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-blue-200 relative min-h-[180px] mx-4 mb-4 rounded-xl shadow-inner">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isOnline ? (
            <div className="bg-white/90 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md">
              <p className="text-rideroot-darkGrey font-medium">Searching for ride requests...</p>
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md">
              <p className="text-rideroot-darkGrey font-medium">Go online to see nearby requests</p>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Recent activity */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-t-3xl shadow-lg p-4 mx-4 -mb-4 relative z-10"
      >
        <h3 className="text-sm font-medium text-rideroot-darkGrey mb-3 flex items-center">
          <Clock size={16} className="mr-1" />
          RECENT RIDES
        </h3>
        
        <div className="space-y-3 mb-4">
          {recentRides.map((ride) => (
            <motion.div
              key={ride.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-start p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="bg-rideroot-primary/10 p-2 rounded-full mr-3">
                <MapPin size={18} className={ride.isPremium ? "text-rideroot-secondary" : "text-rideroot-primary"} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-rideroot-text">{ride.pickupLocation} → {ride.dropoffLocation}</p>
                  <p className="font-bold text-rideroot-primary">${ride.earnings.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-rideroot-darkGrey">{ride.time}</p>
                  {ride.isPremium && (
                    <span className="text-xs font-medium text-rideroot-secondary">
                      Premium Ride
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {isOnline ? (
          <Button 
            disabled={!isOnline}
            onClick={() => navigate("/driver-ride")}
            className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary w-full flex items-center justify-center py-5 rounded-xl text-white font-medium shadow-md hover:opacity-95 transition-all"
          >
            <Car size={18} className="mr-2" />
            Find New Rides
          </Button>
        ) : (
          <Button 
            onClick={toggleOnlineStatus}
            className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary w-full flex items-center justify-center py-5 rounded-xl text-white font-medium shadow-md hover:opacity-95 transition-all"
          >
            <Car size={18} className="mr-2" />
            Go Online Now
          </Button>
        )}
      </motion.div>
      
      <div className="h-16"></div> {/* Spacer for bottom nav */}
      <BottomNav />
    </div>
  );
};

export default DriverHome;
