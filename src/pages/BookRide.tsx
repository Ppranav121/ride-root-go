import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Target } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import RideOptionSelector from "@/components/RideOptionSelector";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import LocationSelector from "@/components/ride/LocationSelector";
import RecentLocations from "@/components/ride/RecentLocations";
import FareEstimate from "@/components/ride/FareEstimate";
import LocationSearchDialog from "@/components/ride/LocationSearchDialog";
import PaymentMethodSelector, { PaymentMethod } from "@/components/ride/PaymentMethodSelector";
import LocationBanner from "@/components/ride/LocationBanner";

interface LocationState {
  dropoffLocation?: string;
}

const BookRide: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookRide, rideOption, capacityOption, user } = useApp();
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRecentLocations, setShowRecentLocations] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [locationSearchType, setLocationSearchType] = useState<"pickup" | "dropoff">("dropoff");
  const [searchQuery, setSearchQuery] = useState("");
  const [pinPosition, setPinPosition] = useState<{ top: string; left: string } | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>({
    id: "card-1",
    type: "card",
    name: "Personal Visa",
    last4: "4242",
    expiryDate: "12/25",
    isDefault: true
  });
  const [isBannerExpanded, setIsBannerExpanded] = useState(false);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.dropoffLocation) {
      setDropoffLocation(state.dropoffLocation);
      
      toast.success("Destination selected", {
        description: state.dropoffLocation,
        duration: 2000,
      });
      
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const recentLocations = [
    { id: "1", name: "Home", address: "123 Main St" },
    { id: "2", name: "Work", address: "456 Office Ave" },
    { id: "3", name: "Gym", address: "789 Fitness Blvd" },
  ];

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

  const distance = 6;
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

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const top = `${((e.clientY - rect.top) / rect.height) * 100}%`;
    const left = `${((e.clientX - rect.left) / rect.width) * 100}%`;
    setPinPosition({ top, left });
    
    const pinLocationAddress = "Pinned Location";
    setDropoffLocation(pinLocationAddress);
    
    toast.success("Location pinned", {
      description: "Tap anywhere else to move the pin"
    });
  };

  const handlePinLocation = () => {
    toast("Tap anywhere on the map to pin your destination", {
      description: "This helps us locate your exact dropoff point",
      action: {
        label: "Got it",
        onClick: () => {}
      }
    });
  };

  const handleBookRide = async () => {
    if (!dropoffLocation) {
      toast.error("Missing destination", {
        description: "Please enter a destination",
      });
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Missing payment method", {
        description: "Please select a payment method",
      });
      return;
    }

    setIsLoading(true);
    try {
      await bookRide(pickupLocation, dropoffLocation, selectedPaymentMethod.id);
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
    <div className="flex flex-col h-screen bg-rideroot-lightGrey">
      <RootHeader title="Book a Ride" />

      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
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
          <div 
            className="absolute inset-0 cursor-crosshair z-0" 
            onClick={handleMapClick}
          />
        </div>

        <LocationBanner
          isExpanded={isBannerExpanded}
          onToggle={() => setIsBannerExpanded(!isBannerExpanded)}
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
        />

        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl"
          style={{ maxHeight: "70vh" }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ScrollArea className="h-[70vh] w-full">
            <div className="px-6 pb-8 pt-6">
              <LocationSelector 
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
                onOpenPickupSearch={() => handleOpenLocationSearch("pickup")}
                onOpenDropoffSearch={() => handleOpenLocationSearch("dropoff")}
                onClearPickup={() => setPickupLocation("")}
                onClearDropoff={() => setDropoffLocation("")}
              />

              <div className="mb-5 flex justify-end">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white shadow-md hover:bg-gray-100 flex items-center gap-2"
                  onClick={handlePinLocation}
                >
                  <Target size={16} />
                  <span className="text-xs">Pin Location</span>
                </Button>
              </div>

              {pinPosition && (
                <motion.div
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  className="absolute z-20"
                  style={{ top: pinPosition.top, left: pinPosition.left, transform: 'translate(-50%, -100%)' }}
                >
                  <div className="flex flex-col items-center">
                    <MapPin size={24} className="text-red-500" />
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1 animate-ping" />
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                <RecentLocations 
                  recentLocations={recentLocations}
                  onSelectLocation={handleSelectRecentLocation}
                  showRecentLocations={showRecentLocations && !locationDialogOpen}
                />
              </AnimatePresence>

              <div className="mb-5">
                <RideOptionSelector />
              </div>

              <div className="mb-5">
                <PaymentMethodSelector 
                  selectedPaymentMethod={selectedPaymentMethod}
                  onSelectPaymentMethod={setSelectedPaymentMethod}
                />
              </div>

              <FareEstimate 
                distance={distance}
                rideOption={rideOption}
                capacityOption={capacityOption}
                fare={fare}
                isSubscribed={user?.isSubscribed || false}
              />

              <motion.button
                onClick={handleBookRide}
                className={`bg-gradient-to-r from-rideroot-primary to-rideroot-secondary w-full h-[56px] flex items-center justify-center rounded-xl text-white font-bold font-heading shadow-md ${isLoading ? "opacity-70" : ""}`}
                disabled={isLoading || !dropoffLocation || !selectedPaymentMethod}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {isLoading ? "Finding your ride..." : "Book Ride"}
              </motion.button>

              {!user?.isSubscribed && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 text-center mb-6"
                >
                  <p className="text-xs text-rideroot-darkGrey">
                    Save 10% on rides with <span className="text-rideroot-primary font-medium">RideRoot Premium</span>
                  </p>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </motion.div>
      </div>

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
    </div>
  );
};

export default BookRide;
