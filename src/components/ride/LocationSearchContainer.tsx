
import React, { useState, useMemo, memo, useCallback } from "react";
import LocationSelector from "@/components/ride/LocationSelector";
import RecentLocations from "@/components/ride/RecentLocations";
import LocationSearchDialog from "@/components/ride/LocationSearchDialog";
import { toast } from "sonner";
import { AnimatePresence } from "framer-motion";

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
  console.log("LocationSearchContainer rendering");
  
  const [showRecentLocations, setShowRecentLocations] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [locationSearchType, setLocationSearchType] = useState<"pickup" | "dropoff">("dropoff");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock recent locations (kept from original code)
  const recentLocations = useMemo(() => [
    { id: "1", name: "Home", address: "123 Main St" },
    { id: "2", name: "Work", address: "456 Office Ave" },
    { id: "3", name: "Gym", address: "789 Fitness Blvd" },
  ], []);

  // Memoize filtered search locations to prevent recalculation on every render
  const searchLocations = useMemo(() => {
    const locations = [
      { id: "4", name: "Airport", address: "1234 Airport Way" },
      { id: "5", name: "Mall", address: "5678 Shopping Center" },
      { id: "6", name: "Downtown", address: "910 Main Square" },
      { id: "7", name: "Park", address: "1112 Green Park" },
      { id: "8", name: "Hospital", address: "1314 Health Ave" },
    ];
    
    if (!searchQuery) return locations;
    
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectRecentLocation = useCallback((address: string) => {
    console.log(`Selecting ${locationSearchType} location: ${address}`);
    
    if (locationSearchType === "pickup") {
      onPickupChange(address);
    } else {
      onDropoffChange(address);
    }
    
    setShowRecentLocations(false);
    setLocationDialogOpen(false);
    
    toast.success(`${locationSearchType === "pickup" ? "Pickup" : "Dropoff"} location set`, {
      description: address,
      duration: 2000,
    });
  }, [locationSearchType, onPickupChange, onDropoffChange]);

  const handleOpenLocationSearch = useCallback((type: "pickup" | "dropoff") => {
    console.log(`Opening location search for ${type}`);
    setLocationSearchType(type);
    setSearchQuery("");
    setLocationDialogOpen(true);
  }, []);

  const getCurrentLocation = useCallback(() => {
    console.log("Getting current location");
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
  }, [locationSearchType, onPickupChange, onDropoffChange]);

  return (
    <>
      <LocationSelector 
        pickupLocation={pickupLocation}
        dropoffLocation={dropoffLocation}
        onOpenPickupSearch={() => handleOpenLocationSearch("pickup")}
        onOpenDropoffSearch={() => handleOpenLocationSearch("dropoff")}
        onClearPickup={() => onPickupChange("")}
        onClearDropoff={() => onDropoffChange("")}
        onUseCurrentPickupLocation={getCurrentLocation}
        onUseCurrentDropoffLocation={getCurrentLocation}
      />

      <AnimatePresence>
        <RecentLocations 
          recentLocations={recentLocations}
          onSelectLocation={handleSelectRecentLocation}
          showRecentLocations={showRecentLocations && !locationDialogOpen}
        />
      </AnimatePresence>

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

export default memo(LocationSearchContainer);
