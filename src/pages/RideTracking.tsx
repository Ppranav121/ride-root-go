
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import MapView from "@/components/ride/MapView";
import RideDetailsBanner from "@/components/ride/RideDetailsBanner";
import RideDetailsPanel from "@/components/ride/RideDetailsPanel";
import EmergencyButton from "@/components/ride/EmergencyButton";

const RideTracking: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  // State to track the driver's position for animation
  const [driverPosition, setDriverPosition] = useState({ top: "60%", left: "30%" });
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (!currentRide || !currentRide.driver) {
      navigate("/home");
      return;
    }

    // Update ride status to in-progress
    setCurrentRide({
      ...currentRide,
      status: "in-progress"
    });

    // Animate driver moving toward pickup location
    const positionInterval = setInterval(() => {
      setDriverPosition(prev => ({
        top: parseInt(prev.top) - 0.5 + "%",
        left: parseInt(prev.left) + 0.3 + "%"
      }));
    }, 200);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Automatically navigate to completion after countdown reaches zero
    const timer = setTimeout(() => {
      console.log("Navigating to ride completion page");
      navigate("/ride-completion");
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(positionInterval);
      clearInterval(countdownInterval);
    };
  }, [currentRide, navigate, setCurrentRide]);

  useEffect(() => {
    // When countdown reaches zero, navigate to completion page
    if (secondsLeft === 0) {
      console.log("Countdown reached zero, navigating to ride completion");
      navigate("/ride-completion");
    }
  }, [secondsLeft, navigate]);

  // Manual navigation handler
  const goToCompletion = () => {
    console.log("Manual navigation to ride completion");
    navigate("/ride-completion");
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
        
        <RideDetailsPanel currentRide={currentRide} />
      </div>

      <EmergencyButton />
    </div>
  );
};

export default RideTracking;
