
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import BottomNav from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import MapBackground from "@/components/ride/MapBackground";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useApp();
  
  const [recentLocations] = useState([{
    id: "1",
    name: "Home",
    address: "123 Main St"
  }, {
    id: "2",
    name: "Work",
    address: "456 Office Ave"
  }, {
    id: "3",
    name: "Gym",
    address: "789 Fitness Blvd"
  }]);
  
  const [isSearchBannerOpen, setIsSearchBannerOpen] = useState(true);
  
  const handleWhereToClick = () => {
    navigate("/book-ride");
  };

  const handleLocationSelect = (address: string) => {
    // Navigate to book-ride with the pre-selected dropoff location
    navigate("/book-ride", { state: { dropoffLocation: address } });
  };

  // Animation variants
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Map Background */}
      <div className="fixed inset-0 z-0">
        <MapBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Enhanced header with gradient text */}
        <RootHeader 
          title={<span className="text-gradient font-bold tracking-tight text-xl">RideRoot</span>}
          showBackButton={false} 
        />

        <div className="flex-1">
          {/* Collapsible search banner */}
          <Collapsible
            open={isSearchBannerOpen}
            onOpenChange={setIsSearchBannerOpen}
            className="bg-white/80 backdrop-blur-sm mx-4 mt-4 rounded-xl shadow-md"
          >
            <div className="p-4 flex justify-between items-center">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex-1"
              >
                <h2 className="text-lg font-heading font-semibold mb-1 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary bg-clip-text text-transparent">
                  {user ? `Hello, ${user.name?.split(" ")[0]}` : "Hello there"}
                </h2>
                <p className="text-rideroot-darkGrey text-sm">Where would you like to go today?</p>
              </motion.div>
              
              <CollapsibleTrigger asChild>
                <button className="p-2 hover:bg-gray-100/50 rounded-full transition-colors">
                  {isSearchBannerOpen ? (
                    <ChevronUp size={20} className="text-rideroot-darkGrey" />
                  ) : (
                    <ChevronDown size={20} className="text-rideroot-darkGrey" />
                  )}
                </button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <AnimatePresence>
                <div className="px-4 pb-4">
                  {/* Search box */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mb-6"
                  >
                    <button 
                      onClick={handleWhereToClick} 
                      className="flex items-center w-full bg-white p-4 rounded-xl shadow-card-soft hover:shadow-card-hover transition-all duration-300 border border-rideroot-mediumGrey"
                    >
                      <Search size={20} className="text-rideroot-primary mr-3" />
                      <span className="text-rideroot-darkGrey font-medium">Where to?</span>
                    </button>
                  </motion.div>

                  {/* Recent locations */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <h3 className="font-heading font-semibold text-rideroot-text mb-3">Recent Destinations</h3>
                    <div className="bg-white rounded-xl shadow-card-soft overflow-hidden">
                      {recentLocations.map((location, index) => (
                        <motion.div 
                          key={location.id} 
                          whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.5)" }}
                          onClick={() => handleLocationSelect(location.address)} 
                          className={`flex items-start p-4 cursor-pointer ${index !== recentLocations.length - 1 ? "border-b border-rideroot-mediumGrey" : ""}`}
                        >
                          <MapPin size={20} className="text-rideroot-primary mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-rideroot-text">{location.name}</p>
                            <p className="text-sm text-rideroot-darkGrey">{location.address}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </AnimatePresence>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Absolute positioned ride button at bottom */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-24 left-4 right-4"
          >
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/book-ride")} 
              className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary w-full h-[56px] py-4 rounded-xl text-white font-bold font-heading shadow-md flex items-center justify-center"
            >
              Book Your Ride Now
            </motion.button>
          </motion.div>
        </div>

        <div className="h-16"></div> {/* Spacer for bottom nav */}
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
