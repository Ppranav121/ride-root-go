
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowDown, X } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import RideOptionSelector from "@/components/RideOptionSelector";

const BookRide: React.FC = () => {
  const navigate = useNavigate();
  const { bookRide, rideOption, capacityOption, user } = useApp();
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock distance for demo purposes
  const distance = 6; // 6 miles
  
  // Calculate fare based on the current ride options
  const fare = useApp().calculateFare(
    distance, 
    rideOption, 
    capacityOption, 
    user?.isSubscribed || false
  );

  const handleBookRide = async () => {
    if (!dropoffLocation) {
      // In a real app, we would show a validation error
      alert("Please enter a destination");
      return;
    }

    setIsLoading(true);
    try {
      await bookRide(pickupLocation, dropoffLocation);
      navigate("/ride-confirmation");
    } catch (error) {
      console.error("Error booking ride:", error);
      // In a real app, we would show an error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="Book a Ride" />

      <div className="p-4 bg-white shadow-sm">
        {/* Location inputs */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex items-center mb-4">
            <div className="mr-3 flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-rideroot-primary"></div>
              <div className="w-0.5 h-12 bg-rideroot-mediumGrey my-1"></div>
              <div className="w-3 h-3 rounded-full bg-rideroot-accent"></div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Pickup location"
                  className="input-field w-full pr-8"
                />
                {pickupLocation && (
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-rideroot-darkGrey"
                    onClick={() => setPickupLocation("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="Where to?"
                  className="input-field w-full pr-8"
                />
                {dropoffLocation && (
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-rideroot-darkGrey"
                    onClick={() => setDropoffLocation("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder - In a real app this would be an actual map */}
        <div className="bg-gray-300 h-32 rounded-xl mb-4 flex items-center justify-center">
          <p className="text-rideroot-darkGrey">Map view would appear here</p>
        </div>

        {/* Ride Options */}
        <RideOptionSelector />

        {/* Fare Estimate */}
        <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2 text-rideroot-text">Fare Estimate</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-rideroot-darkGrey">Distance: {distance} miles</p>
              <p className="text-rideroot-darkGrey">
                {rideOption === "standard" ? "Standard" : "Premium"} 
                {capacityOption === "xl" ? " Capacity XL" : ""}
              </p>
              {user?.isSubscribed && (
                <p className="text-xs text-rideroot-primary">10% Subscriber Discount Applied</p>
              )}
            </div>
            <div className="text-2xl font-bold text-rideroot-text">${fare}</div>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={handleBookRide}
          className={`btn-primary w-full mt-4 ${isLoading ? "opacity-70" : ""}`}
          disabled={isLoading || !dropoffLocation}
        >
          {isLoading ? "Finding your ride..." : "Book Ride"}
        </button>
      </div>
    </div>
  );
};

export default BookRide;
