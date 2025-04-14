
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, ChevronRight, Calendar } from "lucide-react";
import RootHeader from "@/components/RootHeader";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Rides: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for ride history
  const rides = [
    {
      id: 1,
      date: "Today",
      time: "14:30",
      pickup: "Home",
      dropoff: "Work Office",
      price: "$12.50",
      status: "completed"
    },
    {
      id: 2,
      date: "Yesterday",
      time: "19:15",
      pickup: "Shopping Mall",
      dropoff: "Home",
      price: "$15.75",
      status: "completed"
    },
    {
      id: 3,
      date: "Apr 5, 2025",
      time: "08:45",
      pickup: "Home",
      dropoff: "Airport",
      price: "$32.00",
      status: "completed"
    },
    {
      id: 4,
      date: "Mar 30, 2025",
      time: "20:30",
      pickup: "Restaurant",
      dropoff: "Home",
      price: "$18.25",
      status: "completed"
    }
  ];

  const handleRideDetails = useCallback((rideId: number) => {
    console.log("View details for ride:", rideId);
    toast.info("Loading ride details");
    navigate(`/ride/${rideId}`);
  }, [navigate]);

  const handleBookRide = useCallback(() => {
    navigate("/book-ride");
  }, [navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="Your Rides" showBackButton={false} />

      <div className="flex-1 p-4 pb-20">
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <h2 className="text-lg font-medium mb-4">Upcoming Rides</h2>
          
          <div className="flex items-center justify-center py-8 text-rideroot-darkGrey">
            <Calendar className="mr-3" />
            <span>No upcoming rides scheduled</span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={handleBookRide}
            className="w-full py-3 bg-rideroot-primary text-white rounded-full font-medium touch-action-manipulation"
          >
            Book a Ride
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4"
        >
          <h2 className="text-lg font-medium mb-4">Ride History</h2>
          
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {rides.map((ride) => (
              <motion.div
                key={ride.id}
                variants={itemVariants}
                className="flex items-center cursor-pointer hover:bg-rideroot-lightGrey/50 p-3 rounded-lg transition-all"
                onClick={() => handleRideDetails(ride.id)}
              >
                <div className="w-10 h-10 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-3">
                  <Clock size={18} className="text-rideroot-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-rideroot-darkGrey">{ride.date} · {ride.time}</span>
                    <span className="font-medium">{ride.price}</span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    <MapPin size={14} className="text-rideroot-darkGrey mr-1" />
                    <span className="truncate">{ride.pickup} → {ride.dropoff}</span>
                  </div>
                </div>

                <ChevronRight size={18} className="text-rideroot-darkGrey ml-2 flex-shrink-0" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="h-16"></div> {/* Spacer for bottom nav */}
      <BottomNav />
    </div>
  );
};

export default Rides;
