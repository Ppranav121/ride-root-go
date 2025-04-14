
import React, { memo } from "react";
import { X, Target } from "lucide-react";
import { toast } from "sonner";

interface LocationInputProps {
  label: string;
  location: string;
  placeholder: string;
  onClear: () => void;
  onOpenSearch: () => void;
  onUseCurrentLocation?: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  location,
  placeholder,
  onClear,
  onOpenSearch,
  onUseCurrentLocation,
}) => {
  // Prevent event bubbling when clicking clear button
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onClear();
    toast.success(`${label} location cleared`, {
      duration: 2000,
    });
  };

  // Handle current location button click
  const handleCurrentLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onUseCurrentLocation) {
      onUseCurrentLocation();
    } else {
      toast.info("Getting your current location...");
    }
  };

  return (
    <div 
      className="relative cursor-pointer touch-action-manipulation"
      onClick={onOpenSearch}
    >
      <div className="input-field w-full pr-8 flex items-center bg-gray-100 rounded-md p-3">
        <span className="text-rideroot-text truncate">
          {location || placeholder}
        </span>
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
        {location && (
          <button 
            className="text-rideroot-darkGrey hover:text-rideroot-text p-1.5 -m-1.5"
            onClick={handleClear}
            aria-label="Clear location"
            type="button"
          >
            <X size={16} />
          </button>
        )}
        <button 
          className="text-rideroot-primary hover:text-rideroot-accent p-1.5 -m-1.5"
          aria-label="Use current location"
          onClick={handleCurrentLocation}
          type="button"
        >
          <Target size={16} />
        </button>
      </div>
    </div>
  );
};

export default memo(LocationInput);
