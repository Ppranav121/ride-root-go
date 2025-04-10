
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Star, Clock, ChevronRight, Navigation, Bell, Calendar, Shield } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [recentLocations] = useState([
    { id: "1", name: "Home", address: "123 Main St" },
    { id: "2", name: "Work", address: "456 Office Ave" },
    { id: "3", name: "Gym", address: "789 Fitness Blvd" },
  ]);

  const handleWhereToClick = () => {
    navigate("/book-ride");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-rideroot-lightGrey">
      <RootHeader title="RideRoot" showBackButton={false} />

      {/* Greeting with notification bell */}
      <div className="p-5 bg-white shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-heading font-bold text-rideroot-primary mb-1">
            {user ? `Hello, ${user.name?.split(" ")[0]}` : "Hello there"}
          </h2>
          <p className="text-rideroot-darkGrey text-sm">Where would you like to go today?</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-rideroot-lightGrey">
          <Bell size={20} className="text-rideroot-primary" />
        </Button>
      </div>

      {/* Quick action buttons */}
      <motion.div 
        className="grid grid-cols-4 gap-2 p-4 bg-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <Button 
            onClick={() => navigate("/book-ride")}
            variant="ghost" 
            size="icon" 
            className="h-14 w-14 rounded-full bg-rideroot-primary/10 mb-1 hover:bg-rideroot-primary/20"
          >
            <Navigation size={20} className="text-rideroot-primary" />
          </Button>
          <span className="text-xs text-center">Ride</span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <Button 
            onClick={() => navigate("/rides")}
            variant="ghost" 
            size="icon" 
            className="h-14 w-14 rounded-full bg-rideroot-secondary/10 mb-1 hover:bg-rideroot-secondary/20"
          >
            <Calendar size={20} className="text-rideroot-secondary" />
          </Button>
          <span className="text-xs text-center">History</span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <Button 
            onClick={() => navigate("/profile")}
            variant="ghost" 
            size="icon" 
            className="h-14 w-14 rounded-full bg-rideroot-accent/10 mb-1 hover:bg-rideroot-accent/20"
          >
            <Shield size={20} className="text-rideroot-accent" />
          </Button>
          <span className="text-xs text-center">Safety</span>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-14 w-14 rounded-full bg-rideroot-success/10 mb-1 hover:bg-rideroot-success/20"
          >
            <Star size={20} className="text-rideroot-success" />
          </Button>
          <span className="text-xs text-center">Rewards</span>
        </motion.div>
      </motion.div>

      {/* Map View */}
      <div className="relative flex-1 min-h-[200px]">
        {/* Map background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-200 z-0" />
        
        {/* Map content overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl shadow-md">
              <p className="text-rideroot-darkGrey font-medium flex items-center">
                <MapPin className="text-rideroot-primary mr-1" size={16} />
                Interactive map would appear here
              </p>
            </div>
            
            {/* Current location pulse animation */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-6 h-6 bg-rideroot-primary rounded-full mt-8 relative"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 2],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-rideroot-primary rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Ride booking card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-t-3xl shadow-xl p-5 -mt-6 relative z-20"
      >
        <div className="mb-5">
          <button
            onClick={handleWhereToClick}
            className="flex items-center w-full bg-rideroot-lightGrey p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <Search size={20} className="text-rideroot-primary mr-3" />
            <span className="text-rideroot-darkGrey font-medium">Where to?</span>
          </button>
        </div>

        <div className="mb-5">
          <h3 className="text-sm font-medium text-rideroot-darkGrey mb-3 flex items-center">
            <Clock size={16} className="mr-2" />
            RECENT LOCATIONS
          </h3>
          <div className="space-y-3">
            {recentLocations.map((location) => (
              <motion.button
                key={location.id}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(241, 245, 249, 0.5)" }}
                onClick={() => navigate("/book-ride")}
                className="flex items-start w-full p-3 rounded-lg transition-colors border border-transparent hover:border-rideroot-mediumGrey"
              >
                <MapPin size={20} className="text-rideroot-primary mt-1 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-rideroot-text">{location.name}</p>
                  <p className="text-sm text-rideroot-darkGrey">{location.address}</p>
                </div>
                <ChevronRight size={18} className="text-rideroot-darkGrey ml-auto self-center" />
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/book-ride")}
          className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary w-full flex items-center justify-center py-4 rounded-xl text-white font-bold shadow-md transition-all"
        >
          <Star size={18} className="mr-2" />
          Book a Ride Now
        </motion.button>
      </motion.div>

      <div className="h-16"></div> {/* Spacer for bottom nav */}
      <BottomNav />
    </div>
  );
};

export default Home;
