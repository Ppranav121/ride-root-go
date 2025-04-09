
import React from "react";
import { Star, Car, Shield, Clock, Info, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DriverDetails {
  name: string;
  vehicleType: string;
  licensePlate: string;
  rating: number;
}

interface DriverInfoCardProps {
  driver: DriverDetails;
}

const DriverInfoCard: React.FC<DriverInfoCardProps> = ({ driver }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="w-14 h-14 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-4">
          <span className="text-xl font-bold text-rideroot-primary">
            {driver.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-rideroot-text">
            {driver.name}
          </h3>
          <p className="text-rideroot-darkGrey">{driver.vehicleType}</p>
        </div>
      </div>
      
      {/* Driver details dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center px-3 py-2 rounded-lg bg-rideroot-primary/10 hover:bg-rideroot-primary/20 transition-colors text-rideroot-primary">
            <span className="text-sm mr-1">Details</span>
            <ChevronDown size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72">
          <DropdownMenuGroup>
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg font-bold text-rideroot-primary">
                    {driver.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">{driver.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
                    <span className="text-sm">{driver.rating} • Professional Driver</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center mb-2">
                <Car size={16} className="text-rideroot-darkGrey mr-2" />
                <span className="text-sm font-medium">Vehicle</span>
              </div>
              <p className="text-sm pl-6">{driver.vehicleType}</p>
              <p className="text-sm pl-6 text-rideroot-darkGrey">License: {driver.licensePlate}</p>
            </div>

            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center mb-2">
                <Shield size={16} className="text-rideroot-darkGrey mr-2" />
                <span className="text-sm font-medium">Safety Features</span>
              </div>
              <p className="text-sm pl-6">License Verified</p>
              <p className="text-sm pl-6">Background Checked</p>
            </div>

            <div className="p-3">
              <div className="flex items-center mb-2">
                <Clock size={16} className="text-rideroot-darkGrey mr-2" />
                <span className="text-sm font-medium">Driver History</span>
              </div>
              <p className="text-sm pl-6">{1000 + Math.floor(Math.random() * 5000)} rides</p>
              <p className="text-sm pl-6">Member since 2021</p>
            </div>
          </DropdownMenuGroup>
          
          <DropdownMenuItem className="cursor-pointer hover:bg-rideroot-lightGrey">
            <div className="flex justify-center w-full py-1">
              <span className="text-rideroot-primary font-medium">Report an Issue</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DriverInfoCard;
