
import React, { useState, useEffect } from "react";
import LocationSelector from "@/components/ride/LocationSelector";
import RecentLocations from "@/components/ride/RecentLocations";
import LocationSearchDialog from "@/components/ride/LocationSearchDialog";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, MapPin } from "lucide-react";

interface LocationSearchContainerProps {
  pickupLocation: string;
  dropoffLocation: string;
  onPickupChange: (location: string) => void;
  onDropoffChange: (location: string) => void;
}

const LocationSearchContainer: React.FC<LocationSearchContainerProps> = ({
  pickupLocation,
  dropoffLocation,
  onPickupChange,
  onDropoffChange,
}) => {
  const [showRecentLocations, setShowRecentLocations] = useState(true);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [locationSearchType, setLocationSearchType] = useState<"pickup" | "dropoff">("dropoff");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [selectedMapPin, setSelectedMapPin] = useState<{lat: number, lng: number} | null>(null);

  // Mock recent locations (kept from original code)
  const recentLocations = [
    { id: "1", name: "Home", address: "123 Main St" },
    { id: "2", name: "Work", address: "456 Office Ave" },
    { id: "3", name: "Gym", address: "789 Fitness Blvd" },
  ];

  // Mock search locations (kept from original code)
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

  // Auto-minimize panel when user hasn't interacted for a while
  useEffect(() => {
    let timer: number;
    if (!isPanelMinimized) {
      // Auto-minimize after 5 seconds of inactivity
      timer = window.setTimeout(() => {
        setIsPanelMinimized(true);
      }, 5000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPanelMinimized]);

  const handleSelectRecentLocation = (address: string) => {
    if (locationSearchType === "pickup") {
      onPickupChange(address);
    } else {
      onDropoffChange(address);
    }
    setShowRecentLocations(true);
    setLocationDialogOpen(false);
    
    toast.success(`${locationSearchType === "pickup" ? "Pickup" : "Dropoff"} location set`, {
      description: address,
      duration: 2000,
    });
  };

  const handleOpenLocationSearch = (type: "pickup" | "dropoff") => {
    setLocationSearchType(type);
    setSearchQuery("");
    setLocationDialogOpen(true);
    // When user interacts, make panel visible again
    setIsPanelMinimized(false);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    
    // Simulate getting current location
    setTimeout(() => {
      const location = "Current Location (Detected)";
      if (locationSearchType === "pickup") {
        onPickupChange(location);
      } else {
        onDropoffChange(location);
      }
      setLocationDialogOpen(false);
      setIsLoading(false);
      
      toast.success("Location detected", {
        description: "Using your current location",
        duration: 2000,
      });
    }, 1000);
  };

  const handleMapPinDrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isPanelMinimized) {
      // When map is clicked and panel is minimized, capture coordinates
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const lat = 40.7128 + (Math.random() * 0.01); // Simulate real coordinates
      const lng = -74.0060 + (Math.random() * 0.01);
      
      setSelectedMapPin({lat, lng});
      
      // Get reverse geocoded address (simulated)
      const address = `${Math.floor(Math.random() * 999)} Pinned Location St`;
      
      if (locationSearchType === "pickup") {
        onPickupChange(address);
      } else {
        onDropoffChange(address);
      }
      
      toast.success("Location pinned", {
        description: "You can adjust the pin or confirm this location",
        duration: 2000,
      });
    }
  };

  const togglePanel = () => {
    setIsPanelMinimized(prev => !prev);
  };

  return (
    <>
      <motion.div 
        initial={false}
        animate={isPanelMinimized ? { y: -10 } : { y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative"
      >
        {/* Panel Pull Tab - Always visible */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-b-xl shadow-md z-20 cursor-pointer"
          onClick={togglePanel}
          style={{ top: isPanelMinimized ? '4px' : '100%' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPanelMinimized ? (
            <ChevronDown size={24} className="text-rideroot-primary" />
          ) : (
            <ChevronUp size={24} className="text-rideroot-primary" />
          )}
        </motion.div>

        {/* Main Panel Content */}
        <motion.div 
          initial={false}
          animate={isPanelMinimized ? { opacity: 0, y: -200 } : { opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`overflow-hidden ${isPanelMinimized ? 'pointer-events-none' : 'pointer-events-auto'}`}
        >
          <LocationSelector 
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            onOpenPickupSearch={() => handleOpenLocationSearch("pickup")}
            onOpenDropoffSearch={() => handleOpenLocationSearch("dropoff")}
            onClearPickup={() => onPickupChange("")}
            onClearDropoff={() => onDropoffChange("")}
          />

          <AnimatePresence>
            <RecentLocations 
              recentLocations={recentLocations}
              onSelectLocation={handleSelectRecentLocation}
              showRecentLocations={showRecentLocations && !locationDialogOpen}
              className="mx-1"
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Map Interaction Layer */}
      {isPanelMinimized && (
        <div 
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleMapPinDrop}
        >
          {selectedMapPin && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute z-20"
              style={{ 
                top: `${Math.random() * 70 + 15}%`, 
                left: `${Math.random() * 70 + 15}%`
              }}
            >
              <div className="flex flex-col items-center">
                <MapPin size={32} className="text-rideroot-primary drop-shadow-lg" />
                <div className="w-2 h-2 -mt-1 rounded-full bg-rideroot-primary shadow" />
              </div>
            </motion.div>
          )}
        </div>
      )}

      <LocationSearchDialog 
        isOpen={locationDialogOpen}
        onOpenChange={setLocationDialogOpen}
        searchType={locationSearchType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchLocations={searchLocations}
        recentLocations={recentLocations}
        onSelectLocation={handleSelectRecentLocation}
        onUseCurrentLocation={getCurrentLocation}
        isLoading={isLoading}
      />
    </>
  );
};

export default LocationSearchContainer;
