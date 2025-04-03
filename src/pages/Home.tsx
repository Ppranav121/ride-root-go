
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Star, Clock } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import BottomNav from "@/components/BottomNav";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [recentLocations] = useState([
    { id: "1", name: "Home", address: "123 Main St" },
    { id: "2", name: "Work", address: "456 Office Ave" },
    { id: "3", name: "Gym", address: "789 Fitness Blvd" },
  ]);

  const handleWhereToClick = () => {
    navigate("/book-ride");
  };

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="RideRoot" showBackButton={false} />

      <div className="p-4 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-2">
          {user ? `Hello, ${user.name.split(" ")[0]}` : "Hello there"}
        </h2>
        <p className="text-rideroot-darkGrey">Where would you like to go today?</p>
      </div>

      {/* Map Placeholder - In a real app this would be an actual map */}
      <div className="flex-1 bg-gray-300 relative min-h-[200px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-rideroot-darkGrey">Map view would appear here</p>
        </div>
      </div>

      {/* Ride booking card */}
      <div className="bg-white rounded-t-3xl shadow-lg p-4 -mt-4 relative z-10">
        <button
          onClick={handleWhereToClick}
          className="flex items-center w-full bg-rideroot-lightGrey p-3 rounded-xl shadow-sm mb-4"
        >
          <Search size={20} className="text-rideroot-darkGrey mr-3" />
          <span className="text-rideroot-darkGrey">Where to?</span>
        </button>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-rideroot-darkGrey mb-2 flex items-center">
            <Clock size={16} className="mr-1" />
            RECENT LOCATIONS
          </h3>
          <div className="space-y-3">
            {recentLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => navigate("/book-ride")}
                className="flex items-start w-full p-2 hover:bg-rideroot-lightGrey rounded-lg transition-colors"
              >
                <MapPin size={20} className="text-rideroot-primary mt-1 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-rideroot-text">{location.name}</p>
                  <p className="text-sm text-rideroot-darkGrey">{location.address}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/book-ride")}
          className="btn-primary w-full flex items-center justify-center"
        >
          <Star size={16} className="mr-2" />
          Book a Ride
        </button>
      </div>

      <div className="h-16"></div> {/* Spacer for bottom nav */}
      <BottomNav />
    </div>
  );
};

export default Home;
