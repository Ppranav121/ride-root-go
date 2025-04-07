
import React from "react";
import { MapPin, Compass, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface Location {
  id: string;
  name: string;
  address: string;
}

interface LocationSearchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchType: "pickup" | "dropoff";
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchLocations: Location[];
  recentLocations: Location[];
  onSelectLocation: (address: string) => void;
  onUseCurrentLocation: () => void;
  isLoading: boolean;
}

const LocationSearchDialog: React.FC<LocationSearchDialogProps> = ({
  isOpen,
  onOpenChange,
  searchType,
  searchQuery,
  onSearchChange,
  searchLocations,
  recentLocations,
  onSelectLocation,
  onUseCurrentLocation,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {searchType === "pickup" ? "Set pickup location" : "Where would you like to go?"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-start gap-2"
            onClick={onUseCurrentLocation}
            disabled={isLoading}
          >
            <Compass className="h-4 w-4 text-rideroot-primary" />
            Use current location
            {isLoading && searchType === "pickup" && <span className="ml-2 loading">...</span>}
          </Button>
          
          <div className="relative">
            <Command className="rounded-lg border shadow-md">
              <CommandInput 
                placeholder={`Search for a ${searchType === "pickup" ? "pickup" : "destination"} location`}
                value={searchQuery}
                onValueChange={onSearchChange}
              />
              <CommandList>
                <CommandEmpty>No locations found.</CommandEmpty>
                
                {searchQuery && (
                  <CommandGroup heading="Search Results">
                    {searchLocations.map((location) => (
                      <CommandItem
                        key={location.id}
                        onSelect={() => onSelectLocation(location.address)}
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
                      onSelect={() => onSelectLocation(location.address)}
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
  );
};

export default LocationSearchDialog;
