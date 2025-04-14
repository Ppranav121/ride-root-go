
import React from "react";
import LocationInput from "./LocationInput";

interface LocationSelectorProps {
  pickupLocation: string;
  dropoffLocation: string;
  onOpenPickupSearch: () => void;
  onOpenDropoffSearch: () => void;
  onClearPickup: () => void;
  onClearDropoff: () => void;
  onUseCurrentPickupLocation?: () => void;
  onUseCurrentDropoffLocation?: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  pickupLocation,
  dropoffLocation,
  onOpenPickupSearch,
  onOpenDropoffSearch,
  onClearPickup,
  onClearDropoff,
  onUseCurrentPickupLocation,
  onUseCurrentDropoffLocation,
}) => {
  return (
    <div className="mb-5">
      <div className="flex items-center">
        <div className="mr-3 flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-rideroot-primary"></div>
          <div className="w-0.5 h-12 bg-rideroot-mediumGrey my-1"></div>
          <div className="w-3 h-3 rounded-full bg-rideroot-accent"></div>
        </div>
        <div className="flex-1 space-y-3">
          <LocationInput 
            label="Pickup"
            location={pickupLocation}
            placeholder="Select pickup location"
            onClear={onClearPickup}
            onOpenSearch={onOpenPickupSearch}
            onUseCurrentLocation={onUseCurrentPickupLocation}
          />
          <LocationInput 
            label="Dropoff"
            location={dropoffLocation}
            placeholder="Where to?"
            onClear={onClearDropoff}
            onOpenSearch={onOpenDropoffSearch}
            onUseCurrentLocation={onUseCurrentDropoffLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
