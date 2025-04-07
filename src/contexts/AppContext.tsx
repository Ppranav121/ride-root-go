import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for our context
type RideOption = "standard" | "premium";
type CapacityOption = "regular" | "xl";
type UserType = "rider" | "driver";
type DriverTier = 1 | 2;
type MoodType = "happy" | "neutral" | "sad" | null;

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  isSubscribed: boolean;
  paymentMethods: any[];
  savedAddresses: any[];
}

export interface Driver {
  id: string;
  name: string;
  vehicleType: string;
  licensePlate: string;
  rating: number;
  tier: DriverTier;
}

// Export the Ride interface so it can be imported elsewhere
export interface Ride {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: number;
  duration: number;
  fare: number;
  rideOption: RideOption;
  capacityOption: CapacityOption;
  driver?: Driver;
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled";
  rating?: number;
  tipAmount?: number;
  comment?: string;
  mood?: MoodType;
  paymentMethodId?: string;
}

interface AppContextType {
  user: User | null;
  currentRide: Ride | null;
  rideHistory: Ride[];
  isAuthenticated: boolean;
  rideOption: RideOption;
  capacityOption: CapacityOption;
  setUser: (user: User | null) => void;
  setCurrentRide: (ride: Ride | null) => void;
  setRideOption: (option: RideOption) => void;
  setCapacityOption: (option: CapacityOption) => void;
  calculateFare: (distance: number, option: RideOption, capacity: CapacityOption, isSubscribed: boolean) => number;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  bookRide: (pickup: string, dropoff: string, paymentMethodId?: string) => Promise<Ride>;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);
  const [rideOption, setRideOption] = useState<RideOption>("standard");
  const [capacityOption, setCapacityOption] = useState<CapacityOption>("regular");

  // Calculate fare based on distance, ride option, capacity, and subscription status
  const calculateFare = (
    distance: number, 
    option: RideOption, 
    capacity: CapacityOption, 
    isSubscribed: boolean
  ): number => {
    let baseFare = 0;
    let ratePerMile = 0;

    if (option === "standard") {
      baseFare = capacity === "regular" ? 5 : 8;
      ratePerMile = capacity === "regular" ? 1.5 : 2.25;
    } else {
      baseFare = capacity === "regular" ? 6 : 9;
      ratePerMile = capacity === "regular" ? 1.75 : 2.5;
    }

    let totalFare = baseFare + (ratePerMile * distance);
    
    // Apply 10% discount for subscribers
    if (isSubscribed) {
      totalFare *= 0.9;
    }
    
    return parseFloat(totalFare.toFixed(2));
  };

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    const mockUser: User = {
      id: "user-123",
      name: "John Doe",
      email,
      phone: "+1234567890",
      type: "rider",
      isSubscribed: false,
      paymentMethods: [],
      savedAddresses: []
    };
    
    setUser(mockUser);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setCurrentRide(null);
  };

  // Book ride function - Add paymentMethodId parameter
  const bookRide = async (pickup: string, dropoff: string, paymentMethodId?: string): Promise<Ride> => {
    // In a real app, this would call an API
    const mockDistance = 6; // 6 miles
    const mockDuration = 15; // 15 minutes
    
    const fare = calculateFare(
      mockDistance, 
      rideOption, 
      capacityOption, 
      user?.isSubscribed || false
    );
    
    const newRide: Ride = {
      id: `ride-${Date.now()}`,
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      distance: mockDistance,
      duration: mockDuration,
      fare,
      rideOption,
      capacityOption,
      paymentMethodId,
      status: "pending"
    };
    
    setCurrentRide(newRide);
    return newRide;
  };

  const isAuthenticated = !!user;

  return (
    <AppContext.Provider
      value={{
        user,
        currentRide,
        rideHistory,
        isAuthenticated,
        rideOption,
        capacityOption,
        setUser,
        setCurrentRide,
        setRideOption,
        setCapacityOption,
        calculateFare,
        login,
        logout,
        bookRide
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
