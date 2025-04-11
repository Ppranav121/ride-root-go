import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, MessageCircle, Clock, Shield, User, Search, X, AlertTriangle, Car, CheckCircle, ArrowLeft, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import RootHeader from "@/components/RootHeader";
import MessageDialog from "@/components/ride/MessageDialog";
import EnhancedMapView from "@/components/ride/EnhancedMapView";

type RideState = 'searching' | 'request' | 'accepted' | 'arrived' | 'inProgress' | 'completed';
interface RideRequest {
  id: string;
  rider: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number;
  estimatedTime: string;
  fare: number;
  rideType: 'Standard' | 'Standard XL' | 'Premium' | 'Premium XL';
  isPremium: boolean;
  isPeakBonus: boolean;
}

const DriverRide: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rideState, setRideState] = useState<RideState>('searching');
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
  const [animateBonus, setAnimateBonus] = useState(false);
  const [pulseSize, setPulseSize] = useState(100);
  const [pulseOpacity, setPulseOpacity] = useState(0.5);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [searchInterval, setSearchInterval] = useState<number>(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [driverPosition, setDriverPosition] = useState({
    top: "45%",
    left: "45%"
  });
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

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseSize(prev => prev === 100 ? 120 : 100);
      setPulseOpacity(prev => prev === 0.5 ? 0.7 : 0.5);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (rideState === 'searching') {
      const timer = setTimeout(() => {
        setRideRequest({
          id: "ride-123",
          rider: "Jessica M.",
          pickupLocation: "1234 Market Street",
          dropoffLocation: "Golden Gate Park",
          distance: 4.2,
          estimatedTime: "15 mins",
          fare: 17.50,
          rideType: "Premium",
          isPremium: true,
          isPeakBonus: true
        });
        setRideState('request');
      }, 8000);
      let count = 0;
      const interval = setInterval(() => {
        count += 1;
        setSearchInterval(count % 3 + 1);
      }, 800);
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [rideState]);

  useEffect(() => {
    if (rideState === 'request' && secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (rideState === 'request' && secondsLeft === 0) {
      setRideState('searching');
      setSecondsLeft(15);
      toast({
        title: "Request timed out",
        description: "The ride request was automatically declined.",
        variant: "destructive"
      });
    }
  }, [rideState, secondsLeft, toast]);

  const handleAcceptRide = () => {
    setRideState('accepted');
    toast({
      title: "Ride accepted!",
      description: "Navigate to pickup location."
    });
    if (rideRequest?.isPeakBonus) {
      setAnimateBonus(true);
      setTimeout(() => setAnimateBonus(false), 3000);
    }
    let moveCount = 0;
    const moveInterval = setInterval(() => {
      moveCount += 1;
      setDriverPosition(prev => ({
        top: `${Math.max(30, parseFloat(prev.top) - 0.5)}%`,
        left: `${Math.min(55, parseFloat(prev.left) + 0.3)}%`
      }));
      if (moveCount > 20) {
        clearInterval(moveInterval);
        setRideState('arrived');
        toast({
          title: "You've arrived at pickup",
          description: "Please wait for the rider."
        });
      }
    }, 150);
  };

  const handleDeclineRide = () => {
    setRideState('searching');
    setSecondsLeft(15);
    toast({
      title: "Ride declined",
      description: "You've declined this ride request.",
      variant: "destructive"
    });
  };

  const handleStartRide = () => {
    setRideState('inProgress');
    toast({
      title: "Ride started",
      description: "Navigate to the destination."
    });
    let driveCount = 0;
    const driveInterval = setInterval(() => {
      driveCount += 1;
      setDriverPosition(prev => ({
        top: `${Math.min(70, parseFloat(prev.top) + 0.5)}%`,
        left: `${Math.max(20, parseFloat(prev.left) - 0.3)}%`
      }));
      if (driveCount > 25) {
        clearInterval(driveInterval);
        setRideState('completed');
        toast({
          title: "Ride completed",
          description: "Great job! The fare has been added to your earnings."
        });
      }
    }, 200);
  };

  const handleCompleteRide = () => {
    sessionStorage.setItem('driverOnlineStatus', 'true');
    navigate("/driver-home");
  };

  const openMessageDialog = () => {
    setIsMessageDialogOpen(true);
  };

  const navigateToDashboard = () => {
    toast({
      title: "Returning to Dashboard",
      description: "You're still online and can receive ride requests."
    });
    sessionStorage.setItem('fromRide', 'true');
    sessionStorage.setItem('driverOnlineStatus', 'true');
    navigate("/driver-home");
  };

  const renderSearchingDots = () => {
    const dots = '.'.repeat(searchInterval);
    return dots;
  };

  return <div className="flex flex-col min-h-screen relative">
      <EnhancedMapView showHotspots={showHotspots} hotspots={hotspots} driverPosition={driverPosition}>
        {rideState !== 'searching' && <motion.div animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }} className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-rideroot-primary/20 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-rideroot-primary/40 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-rideroot-primary rounded-full"></div>
              </div>
            </div>
          </motion.div>}
      </EnhancedMapView>

      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-sm z-20">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={navigateToDashboard}>
          <ArrowLeft size={24} />
        </Button>
        
        <h1 className="text-lg font-bold text-rideroot-text flex items-center">
          <Car size={20} className="mr-2 text-[#6c5ce7]" />
          {rideState === 'searching' ? 'Finding Rides' : 'Active Ride'}
        </h1>
        
        {rideState === 'searching' && <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings size={22} className="text-rideroot-text" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Driver Preferences</DrawerTitle>
                  <DrawerDescription>Customize your ride preferences</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Accept Premium Rides</h4>
                        <p className="text-sm text-muted-foreground">Higher fares but may be longer distances</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Maximum Distance</h4>
                        <p className="text-sm text-muted-foreground">How far you'll travel for pickups</p>
                      </div>
                      <Button variant="outline" size="sm">
                        5 miles
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Ride Duration</h4>
                        <p className="text-sm text-muted-foreground">Maximum ride length preference</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Any
                      </Button>
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Save Preferences</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>}
        {rideState !== 'searching' && <div className="w-10" />}
      </div>
      
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        
      </div>
      
      {rideState === 'request' && rideRequest && <motion.div initial={{
      y: 300
    }} animate={{
      y: 0
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 30
    }} className="bg-white rounded-t-3xl shadow-lg p-5 absolute bottom-0 left-0 right-0 z-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">New Ride Request</h2>
            <motion.div initial={{
          scale: 1
        }} animate={{
          scale: [1, 1.1, 1]
        }} transition={{
          repeat: Infinity,
          duration: 2
        }} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="font-semibold text-rideroot-primary">{secondsLeft}</span>
            </motion.div>
          </div>
          
          <div className="mb-5">
            <div className="flex items-center mb-2">
              <div className="bg-rideroot-primary/10 p-2 rounded-full mr-3">
                <User size={20} className="text-rideroot-primary" />
              </div>
              <div>
                <h3 className="font-medium">{rideRequest.rider}</h3>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>)}
                  </div>
                  <span className="text-xs text-rideroot-darkGrey ml-1">4.9</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-3">
              <div className="flex mb-2">
                <MapPin size={18} className="text-rideroot-primary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-rideroot-darkGrey">Pickup</p>
                  <p className="font-medium">{rideRequest.pickupLocation}</p>
                </div>
              </div>
              <div className="flex">
                <MapPin size={18} className="text-rideroot-secondary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-rideroot-darkGrey">Dropoff</p>
                  <p className="font-medium">{rideRequest.dropoffLocation}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mb-2">
              <div className="flex items-center">
                <Clock size={16} className="text-rideroot-darkGrey mr-1" />
                
              </div>
              <span className="text-sm">{rideRequest.distance} miles</span>
            </div>
            
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <div>
                <p className="text-sm text-rideroot-darkGrey">Fare</p>
                <p className="text-xl font-bold text-rideroot-primary">${rideRequest.fare.toFixed(2)}</p>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{rideRequest.rideType}</span>
                <div className="flex space-x-2 mt-1">
                  {rideRequest.isPremium && <span className="bg-rideroot-secondary/10 text-rideroot-secondary text-xs px-2 py-0.5 rounded-full">
                      Premium
                    </span>}
                  {rideRequest.isPeakBonus && <span className="bg-rideroot-primary/10 text-rideroot-primary text-xs px-2 py-0.5 rounded-full">
                      +$0.50 Peak
                    </span>}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-50" onClick={handleDeclineRide}>
              Decline
            </Button>
            <Button className="flex-1 bg-rideroot-primary hover:bg-rideroot-primary/90" onClick={handleAcceptRide}>
              Accept
            </Button>
          </div>
        </motion.div>}
      
      {rideState === 'arrived' && rideRequest && <motion.div initial={{
      y: 300
    }} animate={{
      y: 0
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 30
    }} className="bg-white rounded-t-3xl shadow-lg p-5 absolute bottom-0 left-0 right-0 z-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">You've Arrived</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Phone size={18} className="text-rideroot-primary" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={openMessageDialog}>
                <MessageCircle size={18} className="text-rideroot-primary" />
              </Button>
            </div>
          </div>
          
          <div className="mb-5">
            <div className="flex items-center mb-4">
              <div className="bg-rideroot-primary/10 p-2 rounded-full mr-3">
                <User size={20} className="text-rideroot-primary" />
              </div>
              <div>
                <h3 className="font-medium">{rideRequest.rider}</h3>
                <p className="text-sm text-rideroot-darkGrey">Waiting for rider</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="flex mb-2">
                <MapPin size={18} className="text-rideroot-primary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-rideroot-darkGrey">Pickup</p>
                  <p className="font-medium">{rideRequest.pickupLocation}</p>
                </div>
              </div>
              <div className="flex">
                <MapPin size={18} className="text-rideroot-secondary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-rideroot-darkGrey">Dropoff</p>
                  <p className="font-medium">{rideRequest.dropoffLocation}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-rideroot-primary hover:bg-rideroot-primary/90" onClick={handleStartRide}>
            Start Ride
          </Button>
        </motion.div>}
      
      {rideState === 'inProgress' && rideRequest && <motion.div initial={{
      y: 300
    }} animate={{
      y: 0
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 30
    }} className="bg-white rounded-t-3xl shadow-lg p-5 absolute bottom-0 left-0 right-0 z-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Ride in Progress</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="rounded-full" onClick={openMessageDialog}>
                <MessageCircle size={18} className="text-rideroot-primary" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Shield size={18} className="text-red-500" />
              </Button>
            </div>
          </div>
          
          <div className="mb-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-rideroot-primary/10 p-2 rounded-full mr-3">
                  <User size={20} className="text-rideroot-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{rideRequest.rider}</h3>
                  <p className="text-sm text-rideroot-darkGrey">In vehicle</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-rideroot-darkGrey">Est. arrival</p>
                <p className="font-medium">12:45 PM</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex mb-2">
                <MapPin size={18} className="text-rideroot-primary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-rideroot-darkGrey">Pickup</p>
                  <p className="font-medium">{rideRequest.pickupLocation}</p>
                </div>
              </div>
              <div className="flex">
                <MapPin size={18} className="text-rideroot-secondary mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-rideroot-darkGrey">Dropoff</p>
                  <p className="font-medium">{rideRequest.dropoffLocation}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>}
      
      {rideState === 'completed' && rideRequest && <motion.div initial={{
      y: 300
    }} animate={{
      y: 0
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 30
    }} className="bg-white rounded-t-3xl shadow-lg p-5 absolute bottom-0 left-0 right-0 z-20">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-center">Ride Completed</h2>
            <p className="text-rideroot-darkGrey text-center">Great job! Your earnings have been updated.</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-5">
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
              <p className="text-rideroot-darkGrey">Base fare</p>
              <p className="font-medium">${(rideRequest.fare - 1.50).toFixed(2)}</p>
            </div>
            
            {rideRequest.isPeakBonus && <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                <p className="text-green-600">Peak time bonus</p>
                <p className="font-medium text-green-600">+$0.50</p>
              </div>}
            
            <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
              <p className="text-rideroot-darkGrey">Platform fee</p>
              <p className="font-medium text-red-500">-$1.00</p>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="font-bold">Total earnings</p>
              <p className="text-xl font-bold text-rideroot-primary">
                ${(rideRequest.fare - 1.00 + (rideRequest.isPeakBonus ? 0.50 : 0)).toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/driver-earnings")}>
              View Earnings
            </Button>
            <Button className="flex-1 bg-rideroot-primary hover:bg-rideroot-primary/90" onClick={handleCompleteRide}>
              Done
            </Button>
          </div>
        </motion.div>}
      
      {animateBonus && <motion.div initial={{
      opacity: 0,
      scale: 0.5,
      y: 20
    }} animate={{
      opacity: 1,
      scale: 1,
      y: 0
    }} exit={{
      opacity: 0,
      scale: 0.5,
      y: 20
    }} className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <span className="text-green-500 font-bold text-lg mb-1">+$0.50</span>
              <span className="text-sm text-gray-600">Peak Time Bonus</span>
            </div>
          </div>
        </motion.div>}
      
      {rideState === 'searching' && <motion.div initial={{
      y: 300
    }} animate={{
      y: 0
    }} transition={{
      type: "spring",
      stiffness: 300,
      damping: 30
    }} className="bg-white rounded-t-3xl shadow-lg p-5 absolute bottom-0 left-0 right-0 z-20">
          
          <div className="mt-4">
            <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50" onClick={() => navigate("/driver-home")}>
              Stop Searching
            </Button>
          </div>
        </motion.div>}
      
      {rideState === 'searching' && (
        <motion.div 
          initial={{y: 300}}
          animate={{y: 0}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }} 
          className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8"
        >
          <div className="flex items-center justify-center mb-3">
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="h-1 w-16 rounded-full bg-purple-400/70"
            />
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ 
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="text-white/80 text-sm font-medium"
            >
              Searching for rides{renderSearchingDots()}
            </motion.div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full bg-black/30 border border-white/10 text-white backdrop-blur-md hover:bg-black/40 hover:text-white transition-all shadow-lg" 
            onClick={() => navigate("/driver-home")}
          >
            Stop Searching
          </Button>
        </motion.div>
      )}
      
      <MessageDialog isOpen={isMessageDialogOpen} onClose={() => setIsMessageDialogOpen(false)} driverName={rideRequest?.rider || "Rider"} />
    </div>;
};

export default DriverRide;
