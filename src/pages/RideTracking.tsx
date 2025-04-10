
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
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [isSimulating, setIsSimulating] = useState(true);

  // Check if we have a current ride
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

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setIsSimulating(false);
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

  // Handle ride completion
  useEffect(() => {
    // When countdown reaches zero, navigate to completion page
    if (secondsLeft === 0 && !isSimulating) {
      console.log("Ride completed, navigating to completion page");
      toast.success("You've arrived at your destination!");
      
      // Update ride status to completed
      if (currentRide) {
        try {
          // Create the updated ride object
          const updatedRide = {
            ...currentRide,
            status: "completed" as const
          };
          
          // Store in session storage BEFORE updating state
          console.log("Storing completed ride in sessionStorage:", updatedRide);
          sessionStorage.setItem('completedRide', JSON.stringify(updatedRide));
          
          // Update the state
          setCurrentRide(updatedRide);
          
          console.log("Updated ride after completion:", updatedRide);
          console.log("Navigating to ride-completion immediately");
          
          // Force immediate navigation
          window.location.href = "/ride-completion";
        } catch (error) {
          console.error("Error during ride completion process:", error);
          toast.error("Failed to complete ride. Please try again.");
        }
      }
    }
  }, [secondsLeft, isSimulating, navigate, currentRide, setCurrentRide]);

  // Manual navigation handler for testing
  const goToCompletion = () => {
    console.log("Manual navigation to completion page");
    setIsSimulating(false);
    
    // Update ride status to completed
    if (currentRide) {
      try {
        // Create updated ride object
        const updatedRide = {
          ...currentRide,
          status: "completed" as const
        };
        
        // Store in session storage BEFORE updating state
        console.log("Manually storing completed ride in sessionStorage:", updatedRide);
        sessionStorage.setItem('completedRide', JSON.stringify(updatedRide));
        
        // Update state
        setCurrentRide(updatedRide);
        
        console.log("Manual ride completion, updated ride:", updatedRide);
        console.log("Manually navigating to ride-completion immediately");
        
        // Force immediate navigation
        window.location.href = "/ride-completion";
      } catch (error) {
        console.error("Error during manual ride completion:", error);
        toast.error("Failed to complete ride. Please try again.");
      }
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

      <EmergencyButton />
    </div>
  );
};

export default RideTracking;
