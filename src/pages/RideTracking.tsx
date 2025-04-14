import React, { useEffect, useState } from "react";
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

const RideTracking: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  // State to track the driver's position for animation
  const [driverPosition, setDriverPosition] = useState({ top: "60%", left: "30%" });
  const [secondsLeft, setSecondsLeft] = useState(10);  // Reduced to ensure quicker navigation
  const [isSimulating, setIsSimulating] = useState(true);

  // Always force ride to complete after mounting
  useEffect(() => {
    const forceRideCompletion = () => {
      if (currentRide && currentRide.status !== "completed") {
        try {
          const updatedRide = {
            ...currentRide,
            status: "completed" as const
          };
          
          // Store in session storage BEFORE updating state
          console.log("Forcibly storing completed ride in sessionStorage:", updatedRide);
          sessionStorage.setItem('completedRide', JSON.stringify(updatedRide));
          
          // Update the state
          setCurrentRide(updatedRide);
          
          console.log("Force navigating to ride-completion");
          setTimeout(() => {
            window.location.href = "/ride-completion";
          }, 300);
        } catch (error) {
          console.error("Error during forced ride completion:", error);
          toast.error("Failed to complete ride. Please try again.");
        }
      }
    };

    // Run immediately and after a short delay
    forceRideCompletion();
    const timeoutId = setTimeout(forceRideCompletion, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentRide, setCurrentRide]);

  // Keep existing driver position and countdown logic
  useEffect(() => {
    if (!currentRide || !currentRide.driver) {
      console.log("No ride in progress, redirecting to home");
      toast.error("No active ride found");
      navigate("/home");
      return;
    }

    console.log("Current ride detected:", currentRide);

    // Update ride status to in-progress
    setCurrentRide({
      ...currentRide,
      status: "in-progress" as const
    });

    // Animate driver moving toward pickup location
    const positionInterval = setInterval(() => {
      setDriverPosition(prev => ({
        top: `${Math.max(20, parseFloat(prev.top) - 0.5)}%`,
        left: `${Math.min(70, parseFloat(prev.left) + 0.3)}%`
      }));
    }, 200);

    // Countdown timer - run only once during component mount
    const countdownInterval = setInterval(() => {
      setSecondsLeft(prev => {
        console.log(`Countdown: ${prev} seconds left`);
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsSimulating(false);
          console.log("Countdown finished, isSimulating set to false");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(positionInterval);
      clearInterval(countdownInterval);
    };
  }, [currentRide, navigate, setCurrentRide]);

  // Manual override for testing
  const goToCompletion = () => {
    if (currentRide) {
      sessionStorage.setItem('completedRide', JSON.stringify({
        ...currentRide,
        status: "completed"
      }));
      window.location.href = "/ride-completion";
    }
  };

  if (!currentRide || !currentRide.driver) return null;

  return (
    <div className="flex flex-col h-screen bg-rideroot-lightGrey relative">
      <RootHeader title="Your Ride" />

      <div className="relative flex-1 overflow-hidden">
        <MapView 
          driverPosition={driverPosition} 
          secondsLeft={secondsLeft} 
          onComplete={goToCompletion} 
        />

        <RideDetailsBanner secondsLeft={secondsLeft} />
        
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

      {/* Debug button for manual navigation */}
      <button 
        onClick={goToCompletion} 
        className="absolute bottom-4 left-4 bg-red-500 text-white p-2 rounded"
      >
        Force Ride Completion
      </button>

      <EmergencyButton />
    </div>
  );
};

export default RideTracking;
