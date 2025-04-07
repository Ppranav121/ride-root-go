
import React from "react";
import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Calendar, ChevronRight } from "lucide-react";
import RootHeader from "@/components/RootHeader";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";

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

  const handleRideDetails = (rideId: number) => {
    console.log("View details for ride:", rideId);
    // In a real app, navigate to a ride details page
  };

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="Your Rides" showBackButton={false} />

      <div className="flex-1 p-4 pb-20">
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <h2 className="text-lg font-medium mb-4">Upcoming Rides</h2>
          
          <div className="flex items-center justify-center py-8 text-rideroot-darkGrey">
            <Calendar className="mr-3" />
            <span>No upcoming rides scheduled</span>
          </div>
          
          <button 
            onClick={() => navigate("/book-ride")}
            className="w-full py-3 bg-rideroot-primary text-white rounded-full font-medium"
          >
            Book a Ride
          </button>
        </motion.div>

        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4"
        >
          <h2 className="text-lg font-medium mb-4">Ride History</h2>
          
          <div className="space-y-4">
            {rides.map((ride, index) => (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center cursor-pointer hover:bg-rideroot-lightGrey/50 p-3 rounded-lg transition-all"
                onClick={() => handleRideDetails(ride.id)}
              >
                <div className="w-10 h-10 bg-rideroot-lightGrey rounded-full flex items-center justify-center mr-3">
                  <Clock size={18} className="text-rideroot-darkGrey" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-rideroot-darkGrey">{ride.date} · {ride.time}</span>
                    <span className="font-medium">{ride.price}</span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    <MapPin size={14} className="text-rideroot-darkGrey mr-1" />
                    <span>{ride.pickup} → {ride.dropoff}</span>
                  </div>
                </div>

                <ChevronRight size={18} className="text-rideroot-darkGrey ml-2" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="h-16"></div> {/* Spacer for bottom nav */}
      <BottomNav />
    </div>
  );
};

export default Rides;
