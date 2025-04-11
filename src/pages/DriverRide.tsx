import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, MessageCircle, Clock, Shield, User, Search, X, AlertTriangle, Car, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import RootHeader from "@/components/RootHeader";
import MessageDialog from "@/components/ride/MessageDialog";
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
  const {
    toast
  } = useToast();
  const [rideState, setRideState] = useState<RideState>('searching');
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
  const [animateBonus, setAnimateBonus] = useState(false);
  const [pulseSize, setPulseSize] = useState(100);
  const [pulseOpacity, setPulseOpacity] = useState(0.5);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [searchInterval, setSearchInterval] = useState<number>(0);
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
    setTimeout(() => {
      setRideState('arrived');
      toast({
        title: "You've arrived at pickup",
        description: "Please wait for the rider."
      });
    }, 5000);
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
    setTimeout(() => {
      setRideState('completed');
      toast({
        title: "Ride completed",
        description: "Great job! The fare has been added to your earnings."
      });
    }, 8000);
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
  const renderSearchingAnimation = () => {
    return <div className="flex items-center justify-center h-full">
        <div className="relative">
          <motion.div animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }} transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop"
        }} className="absolute inset-0 bg-blue-400 rounded-full" />
          
          
          <motion.div animate={{
          scale: pulseSize / 100,
          opacity: pulseOpacity
        }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-400/30 rounded-full -z-10" />
          
          <motion.div animate={{
          scale: (pulseSize + 20) / 100,
          opacity: pulseOpacity - 0.2
        }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-400/20 rounded-full -z-20" />
        </div>
      </div>;
  };
  const renderSearchingDots = () => {
    const dots = '.'.repeat(searchInterval);
    return dots;
  };
  return <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-sm z-20">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={navigateToDashboard}>
          <ArrowLeft size={24} />
        </Button>
        
        <h1 className="text-lg font-bold text-rideroot-text flex items-center">
          <Car size={20} className="mr-2 text-[#6c5ce7]" />
          {rideState === 'searching' ? 'Finding Rides' : 'Active Ride'}
        </h1>
        
        <div className="w-10" />
      </div>
      
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-blue-200 relative">
        {rideState === 'searching' && renderSearchingAnimation()}
        
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
        
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <motion.div initial={{
          y: -10,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} className="bg-white/90 backdrop-blur-sm px-5 py-2 rounded-xl shadow-md">
            <p className="text-rideroot-darkGrey text-sm font-medium flex items-center">
              {rideState === 'searching' && <>
                  <Search size={16} className="mr-2 text-blue-500" />
                  <span>Searching for ride requests{renderSearchingDots()}</span>
                </>}
              {rideState === 'request' && <>
                  <AlertTriangle size={16} className="mr-2 text-amber-500" />
                  <span>New ride request!</span>
                </>}
              {rideState === 'accepted' && <>
                  <MapPin size={16} className="mr-2 text-green-500" />
                  <span>Navigating to pickup location...</span>
                </>}
              {rideState === 'arrived' && <>
                  <Clock size={16} className="mr-2 text-blue-500" />
                  <span>Waiting for rider...</span>
                </>}
              {rideState === 'inProgress' && <>
                  <Car size={16} className="mr-2 text-green-500" />
                  <span>Navigating to destination...</span>
                </>}
              {rideState === 'completed' && <>
                  <CheckCircle size={16} className="mr-2 text-green-500" />
                  <span>Ride completed!</span>
                </>}
            </p>
          </motion.div>
        </div>
        
        {(rideState === 'accepted' || rideState === 'arrived' || rideState === 'inProgress') && <div className="absolute inset-0 flex items-center justify-center">
            <svg width="200" height="120" viewBox="0 0 200 120">
              <path d="M40,80 C80,20 120,100 160,40" stroke="rgba(79, 70, 229, 0.6)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 4" fill="none" />
              <circle cx="40" cy="80" r="8" fill="#4F46E5" />
              <circle cx="160" cy="40" r="8" fill="#06B6D4" />
            </svg>
          </div>}
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
                <span className="text-sm">{rideRequest.estimatedTime}</span>
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
          <div className="flex flex-col items-center mb-6">
            <motion.div animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }} className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full animate-ping opacity-75"></div>
              <Search size={28} className="text-blue-600 relative z-10" />
            </motion.div>
            
            <h2 className="text-xl font-semibold text-center">Looking for Rides</h2>
            <p className="text-rideroot-darkGrey text-center">
              You'll be notified when a ride request comes in
            </p>
          </div>
          
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.5
      }} className="mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    <Clock size={18} className="text-blue-600" />
                  </div>
                  <p className="font-medium text-blue-800">Average Wait Time</p>
                </div>
                <span className="text-blue-800 font-bold">~3 min</span>
              </div>
              
              <div className="flex items-end h-12 gap-1">
                {[3, 7, 5, 8, 4, 6, 9, 7, 5, 4, 6, 8].map((height, index) => <motion.div key={index} className="bg-blue-400 rounded-sm flex-1" initial={{
              height: 0
            }} animate={{
              height: `${height * 8}%`,
              opacity: Math.random() * 0.5 + 0.5
            }} transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.1
            }} />)}
              </div>
            </div>
          </motion.div>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="w-full">
                Driver Preferences
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
          </Drawer>
          
          <div className="mt-4">
            <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50" onClick={() => navigate("/driver-home")}>
              Stop Searching
            </Button>
          </div>
        </motion.div>}
      
      <MessageDialog isOpen={isMessageDialogOpen} onClose={() => setIsMessageDialogOpen(false)} driverName={rideRequest?.rider || "Rider"} />
    </div>;
};
export default DriverRide;