
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, Calendar, ChevronRight, Receipt, Star, MessageSquare, User, Shield } from "lucide-react";
import RootHeader from "@/components/RootHeader";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const RideDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data for ride details
  // In a real app, you would fetch this data based on the ID from a database or API
  const rideDetails = {
    id: parseInt(id || "1"),
    date: id === "1" ? "Today" : id === "2" ? "Yesterday" : id === "3" ? "Apr 5, 2025" : "Mar 30, 2025",
    time: id === "1" ? "14:30" : id === "2" ? "19:15" : id === "3" ? "08:45" : "20:30",
    pickup: id === "1" ? "Home" : id === "2" ? "Shopping Mall" : id === "3" ? "Home" : "Restaurant",
    dropoff: id === "1" ? "Work Office" : id === "2" ? "Home" : id === "3" ? "Airport" : "Home",
    price: id === "1" ? "$12.50" : id === "2" ? "$15.75" : id === "3" ? "$32.00" : "$18.25",
    status: "completed",
    driver: {
      name: "Michael Johnson",
      rating: 4.9,
      vehicleType: "Toyota Camry (Silver)",
      licensePlate: "ABC 123"
    },
    rideInfo: {
      distance: "6.2 miles",
      duration: "25 min",
      paymentMethod: "Visa •••• 1234"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="Ride Details" showBackButton={true} />
      
      <ScrollArea className="flex-1 px-4 pb-20">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 my-4"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-medium">{rideDetails.date}</h2>
              <p className="text-rideroot-darkGrey">{rideDetails.time}</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              {rideDetails.status}
            </div>
          </div>
          
          <div className="bg-rideroot-lightGrey p-4 rounded-xl mb-4">
            <div className="flex items-start">
              <div className="mr-3 flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-rideroot-primary"></div>
                <div className="w-0.5 h-12 bg-rideroot-mediumGrey my-1"></div>
                <div className="w-3 h-3 rounded-full bg-rideroot-accent"></div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-rideroot-text">{rideDetails.pickup}</p>
                <p className="text-sm text-rideroot-darkGrey mb-4">Pickup location</p>
                
                <p className="font-medium text-rideroot-text">{rideDetails.dropoff}</p>
                <p className="text-sm text-rideroot-darkGrey">Dropoff location</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-4"
        >
          <h3 className="text-lg font-medium mb-4">Driver</h3>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-4">
              <User size={20} className="text-rideroot-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="font-medium">{rideDetails.driver.name}</h4>
                <div className="flex items-center ml-2 text-yellow-500">
                  <Star size={14} className="fill-yellow-500" />
                  <span className="text-sm ml-1">{rideDetails.driver.rating}</span>
                </div>
              </div>
              <p className="text-sm text-rideroot-darkGrey">{rideDetails.driver.vehicleType}</p>
              <p className="text-sm text-rideroot-darkGrey">License Plate: {rideDetails.driver.licensePlate}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-4"
        >
          <h3 className="text-lg font-medium mb-3">Ride Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-rideroot-lightGrey rounded-full flex items-center justify-center mr-3">
                <Clock size={16} className="text-rideroot-darkGrey" />
              </div>
              <div>
                <p className="text-sm text-rideroot-darkGrey">Duration</p>
                <p>{rideDetails.rideInfo.duration}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-rideroot-lightGrey rounded-full flex items-center justify-center mr-3">
                <MapPin size={16} className="text-rideroot-darkGrey" />
              </div>
              <div>
                <p className="text-sm text-rideroot-darkGrey">Distance</p>
                <p>{rideDetails.rideInfo.distance}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 bg-rideroot-lightGrey rounded-full flex items-center justify-center mr-3">
                <Receipt size={16} className="text-rideroot-darkGrey" />
              </div>
              <div>
                <p className="text-sm text-rideroot-darkGrey">Payment Method</p>
                <p>{rideDetails.rideInfo.paymentMethod}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-4"
        >
          <h3 className="text-lg font-medium mb-3">Payment Summary</h3>
          
          <div className="space-y-2 mb-3">
            <div className="flex justify-between">
              <span className="text-rideroot-darkGrey">Fare</span>
              <span>{rideDetails.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rideroot-darkGrey">Booking Fee</span>
              <span>$1.50</span>
            </div>
            <div className="h-px bg-rideroot-lightGrey my-2"></div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{parseFloat(rideDetails.price.replace('$', '')) + 1.5}</span>
            </div>
          </div>
        </motion.div>

        <div className="flex space-x-3 mb-16">
          <Button 
            variant="outline" 
            className="flex-1 border-rideroot-mediumGrey" 
            onClick={() => navigate("/help")}
          >
            <MessageSquare size={16} className="mr-2" />
            Get Help
          </Button>
          <Button 
            className="flex-1 bg-rideroot-primary hover:bg-rideroot-primary/90" 
            onClick={() => navigate("/book-ride")}
          >
            Book Again
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RideDetails;
