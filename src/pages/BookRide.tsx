
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowDown, X, Navigation, Clock, Info, Compass, Target } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import RideOptionSelector from "@/components/RideOptionSelector";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { toast } from "sonner";

const BookRide: React.FC = () => {
  const navigate = useNavigate();
  const { bookRide, rideOption, capacityOption, user } = useApp();
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRecentLocations, setShowRecentLocations] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [locationSearchType, setLocationSearchType] = useState<"pickup" | "dropoff">("dropoff");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock recent locations
  const recentLocations = [
    { id: "1", name: "Home", address: "123 Main St" },
    { id: "2", name: "Work", address: "456 Office Ave" },
    { id: "3", name: "Gym", address: "789 Fitness Blvd" },
  ];

  // Mock search locations based on query
  const searchLocations = [
    { id: "4", name: "Airport", address: "1234 Airport Way" },
    { id: "5", name: "Mall", address: "5678 Shopping Center" },
    { id: "6", name: "Downtown", address: "910 Main Square" },
    { id: "7", name: "Park", address: "1112 Green Park" },
    { id: "8", name: "Hospital", address: "1314 Health Ave" },
  ].filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock distance for demo purposes
  const distance = 6; // 6 miles
  
  // Calculate fare based on the current ride options
  const fare = useApp().calculateFare(
    distance, 
    rideOption, 
    capacityOption, 
    user?.isSubscribed || false
  );

  const handleSelectRecentLocation = (address: string) => {
    if (locationSearchType === "pickup") {
      setPickupLocation(address);
    } else {
      setDropoffLocation(address);
    }
    setShowRecentLocations(false);
    setLocationDialogOpen(false);
    
    // Show confirmation toast
    toast.success(`${locationSearchType === "pickup" ? "Pickup" : "Dropoff"} location set`, {
      description: address,
      duration: 2000,
    });
  };

  const handleOpenLocationSearch = (type: "pickup" | "dropoff") => {
    setLocationSearchType(type);
    setSearchQuery("");
    setLocationDialogOpen(true);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    
    // Simulate getting current location
    setTimeout(() => {
      const location = "Current Location (Detected)";
      if (locationSearchType === "pickup") {
        setPickupLocation(location);
      } else {
        setDropoffLocation(location);
      }
      setLocationDialogOpen(false);
      setIsLoading(false);
      
      toast.success("Location detected", {
        description: "Using your current location",
        duration: 2000,
      });
    }, 1000);
  };

  const handleBookRide = async () => {
    if (!dropoffLocation) {
      toast.error("Missing destination", {
        description: "Please enter a destination",
      });
      return;
    }

    setIsLoading(true);
    try {
      await bookRide(pickupLocation, dropoffLocation);
      navigate("/ride-confirmation");
    } catch (error) {
      console.error("Error booking ride:", error);
      toast.error("Failed to book ride", {
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="Book a Ride" />

      <div className="flex-1 relative">
        {/* Map Placeholder - In a real app this would be an actual map */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <p className="text-rideroot-darkGrey">Map view would appear here</p>
          
          {/* Map Pins Animation */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute w-6 h-6 bg-rideroot-primary rounded-full top-1/3 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
          >
            <div className="absolute w-6 h-6 bg-rideroot-primary rounded-full animate-ping opacity-75"></div>
            <MapPin size={16} className="text-white" />
          </motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute w-6 h-6 bg-rideroot-accent rounded-full bottom-1/3 left-1/2 transform -translate-x-1/2 flex items-center justify-center"
          >
            <MapPin size={16} className="text-white" />
          </motion.div>
        </div>

        {/* Ride Booking Interface */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Location inputs */}
          <div className="mb-5">
            <div className="flex items-center">
              <div className="mr-3 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-rideroot-primary"></div>
                <div className="w-0.5 h-12 bg-rideroot-mediumGrey my-1"></div>
                <div className="w-3 h-3 rounded-full bg-rideroot-accent"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div 
                  className="relative cursor-pointer"
                  onClick={() => handleOpenLocationSearch("pickup")}
                >
                  <div className="input-field w-full pr-8 flex items-center bg-gray-100 rounded-md p-3">
                    <span className="text-rideroot-text truncate">
                      {pickupLocation || "Select pickup location"}
                    </span>
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    {pickupLocation && (
                      <button 
                        className="text-rideroot-darkGrey hover:text-rideroot-text"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPickupLocation("");
                        }}
                      >
                        <X size={16} />
                      </button>
                    )}
                    <button className="text-rideroot-primary hover:text-rideroot-accent">
                      <Target size={16} />
                    </button>
                  </div>
                </div>
                <div 
                  className="relative cursor-pointer"
                  onClick={() => handleOpenLocationSearch("dropoff")}
                >
                  <div className="input-field w-full pr-8 flex items-center bg-gray-100 rounded-md p-3">
                    <span className="text-rideroot-text truncate">
                      {dropoffLocation || "Where to?"}
                    </span>
                  </div>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                    {dropoffLocation && (
                      <button 
                        className="text-rideroot-darkGrey hover:text-rideroot-text"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropoffLocation("");
                        }}
                      >
                        <X size={16} />
                      </button>
                    )}
                    <button className="text-rideroot-primary hover:text-rideroot-accent">
                      <Target size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent locations (only shown when no dialog is open) */}
          <AnimatePresence>
            {showRecentLocations && !locationDialogOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-5"
              >
                <h3 className="text-sm font-medium text-rideroot-darkGrey mb-2 flex items-center">
                  <Clock size={16} className="mr-1" />
                  RECENT LOCATIONS
                </h3>
                <div className="bg-rideroot-lightGrey rounded-xl p-2">
                  {recentLocations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleSelectRecentLocation(location.address)}
                      className="w-full flex items-start p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <MapPin size={20} className="text-rideroot-primary mt-1 mr-3 flex-shrink-0" />
                      <div className="text-left">
                        <p className="font-medium text-rideroot-text">{location.name}</p>
                        <p className="text-sm text-rideroot-darkGrey">{location.address}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ride Options */}
          <div className="mb-5">
            <RideOptionSelector />
          </div>

          {/* Fare Estimate */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-4 mb-5 border border-rideroot-mediumGrey"
          >
            <h3 className="text-lg font-semibold mb-3 text-rideroot-text">Fare Estimate</h3>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-1.5">
                  <Navigation size={16} className="text-rideroot-primary mr-2" />
                  <p className="text-rideroot-darkGrey">Distance: {distance} miles</p>
                </div>
                <div className="flex items-center mb-1.5">
                  <Info size={16} className="text-rideroot-accent mr-2" />
                  <p className="text-rideroot-darkGrey">
                    {rideOption === "standard" ? "Standard" : "Premium"} 
                    {capacityOption === "xl" ? " Capacity XL" : ""}
                  </p>
                </div>
                {user?.isSubscribed && (
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs text-rideroot-primary">%</span>
                    </div>
                    <p className="text-xs text-rideroot-primary">10% Subscriber Discount Applied</p>
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-rideroot-text">${fare}</div>
            </div>

            {/* Estimated arrival time */}
            <div className="mt-3 pt-3 border-t border-rideroot-mediumGrey flex justify-between items-center">
              <div className="flex items-center text-rideroot-darkGrey">
                <Clock size={16} className="mr-2" />
                <span>Estimated arrival:</span>
              </div>
              <div className="font-semibold">10:45 AM (5 min)</div>
            </div>
          </motion.div>

          {/* Book Button */}
          <motion.button
            onClick={handleBookRide}
            className={`btn-primary w-full ${isLoading ? "opacity-70" : ""}`}
            disabled={isLoading || !dropoffLocation}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isLoading ? "Finding your ride..." : "Book Ride"}
          </motion.button>

          {/* Subscription call-to-action for non-subscribers */}
          {!user?.isSubscribed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-center"
            >
              <p className="text-xs text-rideroot-darkGrey">
                Save 10% on rides with <span className="text-rideroot-primary font-medium">RideRoot Premium</span>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Location Search Dialog */}
      <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {locationSearchType === "pickup" ? "Set pickup location" : "Where would you like to go?"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-4">
            <Button 
              variant="outline" 
              className="flex items-center justify-start gap-2"
              onClick={getCurrentLocation}
              disabled={isLoading}
            >
              <Compass className="h-4 w-4 text-rideroot-primary" />
              Use current location
              {isLoading && locationSearchType === "pickup" && <span className="ml-2 loading">...</span>}
            </Button>
            
            <div className="relative">
              <Command className="rounded-lg border shadow-md">
                <CommandInput 
                  placeholder={`Search for a ${locationSearchType === "pickup" ? "pickup" : "destination"} location`}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>No locations found.</CommandEmpty>
                  
                  {searchQuery && (
                    <CommandGroup heading="Search Results">
                      {searchLocations.map((location) => (
                        <CommandItem
                          key={location.id}
                          onSelect={() => handleSelectRecentLocation(location.address)}
                          className="flex items-start p-2"
                        >
                          <MapPin size={16} className="text-rideroot-primary mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{location.name}</p>
                            <p className="text-sm text-rideroot-darkGrey">{location.address}</p>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  
                  <CommandGroup heading="Recent Locations">
                    {recentLocations.map((location) => (
                      <CommandItem
                        key={location.id}
                        onSelect={() => handleSelectRecentLocation(location.address)}
                        className="flex items-start p-2"
                      >
                        <Clock size={16} className="text-rideroot-accent mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-rideroot-darkGrey">{location.address}</p>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookRide;
