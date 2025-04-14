
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import MapView from "@/components/ride/MapView";
import RideDetailsBanner from "@/components/ride/RideDetailsBanner";
import RideDetailsPanel from "@/components/ride/RideDetailsPanel";
import EmergencyButton from "@/components/ride/EmergencyButton";
import RouteInfoCard from "@/components/ride/RouteInfoCard";
import CancelRideButton from "@/components/ride/CancelRideButton";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle } from "lucide-react";

const RideTracking: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  
  // State to track the driver's position for animation
  const [driverPosition, setDriverPosition] = useState({ top: "60%", left: "30%" });
  
  // Ride state management
  const [ridePhase, setRidePhase] = useState<"arriving" | "arrived" | "in_progress" | "approaching" | "almost_there" | "completed">("arriving");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [minutesToDestination, setMinutesToDestination] = useState(10);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showCompletionRedirect, setShowCompletionRedirect] = useState(false);
  
  // Handle ride completion and navigation
  const completeRide = () => {
    if (!currentRide) return;
    
    try {
      const updatedRide = {
        ...currentRide,
        status: "completed" as const
      };
      
      // Store in session storage
      console.log("Storing completed ride in sessionStorage:", updatedRide);
      sessionStorage.setItem('completedRide', JSON.stringify(updatedRide));
      
      // Update state
      setCurrentRide(updatedRide);
      setShowCompletionRedirect(true);
      
      // Navigate after a short delay to ensure state is updated
      setTimeout(() => {
        console.log("Navigating to ride-completion page");
        window.location.href = "/ride-completion";
      }, 500);
    } catch (error) {
      console.error("Error during ride completion:", error);
      toast.error("Failed to complete ride. Please try again.");
    }
  };

  // Countdown timer for driver arrival
  useEffect(() => {
    if (ridePhase === "arriving" && secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (ridePhase === "arriving" && secondsLeft <= 0) {
      setRidePhase("arrived");
      toast("Your driver has arrived!", {
        description: "Please meet them at the pickup location",
        icon: <CheckCircle2 className="text-green-500" />
      });
    }
  }, [ridePhase, secondsLeft]);

  // Lifecycle management for ride phases
  useEffect(() => {
    if (!currentRide || !currentRide.driver) {
      console.log("No ride in progress, redirecting to home");
      toast.error("No active ride found");
      navigate("/home");
      return;
    }

    console.log("Starting ride tracking simulation, phase:", ridePhase);
    
    // Update ride status to in-progress
    setCurrentRide({
      ...currentRide,
      status: "in-progress" as const
    });

    // Clear any existing timers
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
    }

    // Phase timing logic (simulation)
    const phaseTimings = {
      arriving: 5000,   // Driver arriving to pickup - 5 seconds
      arrived: 3000,    // Driver arrived, waiting for rider - 3 seconds
      in_progress: 10000, // Main ride duration - 10 seconds
      approaching: 5000,  // 5 min from destination - 5 seconds
      almost_there: 5000, // 2 min from destination - 5 seconds
    };

    // Handle each phase transition
    if (ridePhase === "arriving") {
      // Animate driver approaching pickup
      const positionInterval = setInterval(() => {
        setDriverPosition(prev => ({
          top: `${Math.max(40, parseFloat(prev.top) - 1)}%`,
          left: `${Math.min(45, parseFloat(prev.left) + 0.5)}%`
        }));
      }, 200);

      return () => {
        clearInterval(positionInterval);
        if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      };
    }

    else if (ridePhase === "arrived") {
      phaseTimerRef.current = setTimeout(() => {
        setRidePhase("in_progress");
        setMinutesToDestination(10);
        toast("Your ride has started!", {
          description: "You're on your way to your destination",
          icon: <CheckCircle2 className="text-green-500" />
        });
      }, phaseTimings.arrived);
    }

    else if (ridePhase === "in_progress") {
      // Animate driver moving to destination
      const positionInterval = setInterval(() => {
        setDriverPosition(prev => ({
          top: `${Math.max(20, parseFloat(prev.top) - 0.5)}%`,
          left: `${Math.min(70, parseFloat(prev.left) + 0.5)}%`
        }));

        // Update countdown to destination
        setMinutesToDestination(prev => Math.max(5, prev - 1));
      }, 1000);

      phaseTimerRef.current = setTimeout(() => {
        clearInterval(positionInterval);
        setRidePhase("approaching");
        toast("5 minutes to destination", {
          description: "You're getting close!",
          icon: <AlertCircle className="text-yellow-500" />
        });
      }, phaseTimings.in_progress);
      
      return () => {
        clearInterval(positionInterval);
        if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      };
    }

    else if (ridePhase === "approaching") {
      // Continue driver animation
      const positionInterval = setInterval(() => {
        setDriverPosition(prev => ({
          top: `${Math.max(15, parseFloat(prev.top) - 0.3)}%`,
          left: `${Math.min(85, parseFloat(prev.left) + 0.3)}%`
        }));

        // Update countdown to destination
        setMinutesToDestination(prev => Math.max(2, prev - 1));
      }, 1000);

      phaseTimerRef.current = setTimeout(() => {
        clearInterval(positionInterval);
        setRidePhase("almost_there");
        setMinutesToDestination(2);
        toast("2 minutes to destination", {
          description: "We're almost there!",
          icon: <AlertCircle className="text-yellow-500" />
        });
      }, phaseTimings.approaching);
      
      return () => {
        clearInterval(positionInterval);
        if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      };
    }

    else if (ridePhase === "almost_there") {
      // Final approach animation
      const positionInterval = setInterval(() => {
        setDriverPosition(prev => ({
          top: `${Math.max(10, parseFloat(prev.top) - 0.3)}%`,
          left: `${Math.min(90, parseFloat(prev.left) + 0.3)}%`
        }));
        
        // Update countdown to destination
        setMinutesToDestination(prev => Math.max(0, prev - 1));
      }, 1000);

      phaseTimerRef.current = setTimeout(() => {
        clearInterval(positionInterval);
        setRidePhase("completed");
        toast("You have arrived!", {
          description: "Thank you for riding with us",
          icon: <CheckCircle2 className="text-green-500" />
        });
        completeRide();
      }, phaseTimings.almost_there);
      
      return () => {
        clearInterval(positionInterval);
        if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
      };
    }

    // Just to avoid any warning about missing return in useEffect
    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [currentRide, navigate, setCurrentRide, ridePhase]);

  // Force completion button for testing
  const forceComplete = () => {
    setRidePhase("completed");
    completeRide();
  };

  if (!currentRide || !currentRide.driver || showCompletionRedirect) return null;

  return (
    <div className="flex flex-col h-screen bg-rideroot-lightGrey relative">
      <RootHeader title="Your Ride" />

      <div className="relative flex-1 overflow-hidden">
        <MapView 
          driverPosition={driverPosition} 
          secondsLeft={secondsLeft} 
          onComplete={forceComplete} 
          ridePhase={ridePhase}
        />

        {/* Enhanced ride details banner */}
        <RideDetailsBanner 
          secondsLeft={secondsLeft}
          ridePhase={ridePhase}
          minutesToDestination={minutesToDestination} 
        />
        
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 bg-white rounded-t-3xl shadow-lg z-10">
          <RideDetailsPanel currentRide={currentRide} />
          
          <RouteInfoCard
            pickupLocation={currentRide.pickupLocation}
            dropoffLocation={currentRide.dropoffLocation}
            rideOption={currentRide.rideOption}
            capacityOption={currentRide.capacityOption}
            distance={currentRide.distance}
            fare={currentRide.fare}
          />
          
          <div className="mt-4">
            <CancelRideButton />
          </div>
        </div>
      </div>

      {/* Debug button for developer testing only - consider removing in production */}
      <button 
        onClick={forceComplete}
        className="absolute bottom-4 left-4 bg-red-500 text-white p-2 rounded text-xs"
      >
        Debug: Complete Ride
      </button>

      <EmergencyButton />
    </div>
  );
};

export default RideTracking;
