
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define types for our context
type RideOption = "standard" | "premium";
type CapacityOption = "regular" | "xl";
type UserType = "rider" | "driver";
type DriverTier = 1 | 2;
type MoodType = "happy" | "neutral" | "sad" | null;

interface Message {
  id: string;
  text: string;
  senderId: string;
  recipientId: string;
  timestamp: Date;
  read: boolean;
}

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
  messages: Message[];
  setUser: (user: User | null) => void;
  setCurrentRide: (ride: Ride | null) => void;
  setRideOption: (option: RideOption) => void;
  setCapacityOption: (option: CapacityOption) => void;
  calculateFare: (distance: number, option: RideOption, capacity: CapacityOption, isSubscribed: boolean) => number;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  bookRide: (pickup: string, dropoff: string, paymentMethodId?: string) => Promise<Ride>;
  sendMessage: (text: string, recipientId: string) => void;
}

// Storage keys
const CURRENT_RIDE_STORAGE_KEY = "rideroot_current_ride";

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [rideHistory, setRideHistory] = useState<Ride[]>([]);
  const [rideOption, setRideOption] = useState<RideOption>("standard");
  const [capacityOption, setCapacityOption] = useState<CapacityOption>("regular");
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Initialize currentRide from session storage if available
  const [currentRide, setCurrentRideState] = useState<Ride | null>(() => {
    try {
      const storedRide = sessionStorage.getItem(CURRENT_RIDE_STORAGE_KEY);
      return storedRide ? JSON.parse(storedRide) : null;
    } catch (error) {
      console.error("Error reading stored ride:", error);
      return null;
    }
  });

  // Save ride to session storage when it changes
  useEffect(() => {
    if (currentRide) {
      try {
        sessionStorage.setItem(CURRENT_RIDE_STORAGE_KEY, JSON.stringify(currentRide));
      } catch (error) {
        console.error("Error saving ride to storage:", error);
      }
    }
  }, [currentRide]);

  // Wrapper for setCurrentRide that also updates storage
  const setCurrentRide = (ride: Ride | null) => {
    setCurrentRideState(ride);
    if (ride) {
      try {
        sessionStorage.setItem(CURRENT_RIDE_STORAGE_KEY, JSON.stringify(ride));
      } catch (error) {
        console.error("Error saving ride to storage:", error);
      }
    } else {
      // If ride is null, remove from storage
      sessionStorage.removeItem(CURRENT_RIDE_STORAGE_KEY);
    }
  };

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

  // Book ride function
  const bookRide = async (pickup: string, dropoff: string, paymentMethodId?: string): Promise<Ride> => {
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

  // Send message function
  const sendMessage = (text: string, recipientId: string) => {
    if (!user) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      senderId: user.id,
      recipientId,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
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
        messages,
        setUser,
        setCurrentRide,
        setRideOption,
        setCapacityOption,
        calculateFare,
        login,
        logout,
        bookRide,
        sendMessage
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
