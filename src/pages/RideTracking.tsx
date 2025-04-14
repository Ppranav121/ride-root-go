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

const RIDE_PHASE_STORAGE_KEY = "ride_phase";
const SECONDS_LEFT_STORAGE_KEY = "ride_seconds_left";
const MINUTES_TO_DEST_STORAGE_KEY = "ride_minutes_to_dest";
const DRIVER_POS_STORAGE_KEY = "ride_driver_position";

const RideTracking: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  
  const [driverPosition, setDriverPosition] = useState(() => {
    try {
      const storedPosition = sessionStorage.getItem(DRIVER_POS_STORAGE_KEY);
      return storedPosition ? JSON.parse(storedPosition) : { top: "60%", left: "30%" };
    } catch (e) {
      return { top: "60%", left: "30%" };
    }
  });
  
  const [ridePhase, setRidePhase] = useState<"arriving" | "arrived" | "in_progress" | "approaching" | "almost_there" | "completed">(() => {
    return (sessionStorage.getItem(RIDE_PHASE_STORAGE_KEY) as any) || "arriving";
  });
  
  const [secondsLeft, setSecondsLeft] = useState(() => {
    return parseInt(sessionStorage.getItem(SECONDS_LEFT_STORAGE_KEY) || "30");
  });
  
  const [minutesToDestination, setMinutesToDestination] = useState(() => {
    return parseInt(sessionStorage.getItem(MINUTES_TO_DEST_STORAGE_KEY) || "10");
  });
  
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showCompletionRedirect, setShowCompletionRedirect] = useState(false);
  
  useEffect(() => {
    sessionStorage.setItem(RIDE_PHASE_STORAGE_KEY, ridePhase);
  }, [ridePhase]);
  
  useEffect(() => {
    sessionStorage.setItem(SECONDS_LEFT_STORAGE_KEY, secondsLeft.toString());
  }, [secondsLeft]);
  
  useEffect(() => {
    sessionStorage.setItem(MINUTES_TO_DEST_STORAGE_KEY, minutesToDestination.toString());
  }, [minutesToDestination]);
  
  useEffect(() => {
    sessionStorage.setItem(DRIVER_POS_STORAGE_KEY, JSON.stringify(driverPosition));
  }, [driverPosition]);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Page is now visible, resuming ride state");
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
  
  const completeRide = () => {
    if (!currentRide) return;
    
    try {
      const updatedRide = {
        ...currentRide,
        status: "completed" as const
      };
      
      console.log("Storing completed ride in sessionStorage:", updatedRide);
      sessionStorage.setItem('completedRide', JSON.stringify(updatedRide));
      
      setCurrentRide(updatedRide);
      setShowCompletionRedirect(true);
      
      sessionStorage.removeItem(RIDE_PHASE_STORAGE_KEY);
      sessionStorage.removeItem(SECONDS_LEFT_STORAGE_KEY);
      sessionStorage.removeItem(MINUTES_TO_DEST_STORAGE_KEY);
      sessionStorage.removeItem(DRIVER_POS_STORAGE_KEY);
      
      setTimeout(() => {
        console.log("Navigating to ride-completion page");
        window.location.href = "/ride-completion";
      }, 500);
    } catch (error) {
      console.error("Error during ride completion:", error);
      toast.error("Failed to complete ride. Please try again.");
    }
  };

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

  useEffect(() => {
    if (!currentRide || !currentRide.driver) {
      console.log("No ride in progress, redirecting to home");
      toast.error("No active ride found");
      navigate("/home");
      return;
    }

    console.log("Starting ride tracking simulation, phase:", ridePhase);
    
    if (currentRide.status !== "in-progress") {
      setCurrentRide({
        ...currentRide,
        status: "in-progress" as const
      });
    }

    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
    }

    const phaseTimings = {
      arriving: 5000,
      arrived: 3000,
      in_progress: 10000,
      approaching: 5000,
      almost_there: 5000,
    };

    if (ridePhase === "arriving") {
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
      const positionInterval = setInterval(() => {
        setDriverPosition(prev => ({
          top: `${Math.max(20, parseFloat(prev.top) - 0.5)}%`,
          left: `${Math.min(70, parseFloat(prev.left) + 0.5)}%`
        }));

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
      const positionInterval = setInterval(() => {
        setDriverPosition(prev => ({
          top: `${Math.max(15, parseFloat(prev.top) - 0.3)}%`,
          left: `${Math.min(85, parseFloat(prev.left) + 0.3)}%`
        }));

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
      const positionInterval = setInterval(() => {
        setDriverPosition(prev => ({
          top: `${Math.max(10, parseFloat(prev.top) - 0.3)}%`,
          left: `${Math.min(90, parseFloat(prev.left) + 0.3)}%`
        }));
        
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

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    };
  }, [currentRide, navigate, setCurrentRide, ridePhase]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const forceComplete = () => {
    setRidePhase("completed");
    completeRide();
  };

  if (!currentRide || !currentRide.driver || showCompletionRedirect) return null;

  return (
    <div className="flex flex-col h-screen bg-rideroot-lightGrey relative">
      <RootHeader title="Your Ride" />

      <div className="relative flex-1 overflow-hidden">
        <RideDetailsPanel currentRide={currentRide} />
        
        <div className="relative mt-[70px]">
          <MapView 
            driverPosition={driverPosition} 
            secondsLeft={secondsLeft} 
            onComplete={forceComplete} 
            ridePhase={ridePhase}
          />

          <EmergencyButton />

          <RideDetailsBanner 
            secondsLeft={secondsLeft}
            ridePhase={ridePhase}
            minutesToDestination={minutesToDestination} 
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 bg-white rounded-t-3xl shadow-lg z-10">
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
    </div>
  );
};

export default RideTracking;
