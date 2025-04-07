
import React from "react";
import { MapPin, X, Target } from "lucide-react";
import { toast } from "sonner";

interface LocationInputProps {
  label: string;
  location: string;
  placeholder: string;
  onClear: () => void;
  onOpenSearch: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  location,
  placeholder,
  onClear,
  onOpenSearch,
}) => {
  return (
    <div 
      className="relative cursor-pointer"
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
            className="text-rideroot-darkGrey hover:text-rideroot-text"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
              toast.success(`${label} location cleared`, {
                duration: 2000,
              });
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
  );
};

export default LocationInput;
