
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";

const CancelRideButton: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  
  // Get ride phase from sessionStorage to determine if button should be disabled
  const ridePhase = sessionStorage.getItem("ride_phase");
  const isRideInProgress = ridePhase === "in_progress" || 
                          ridePhase === "approaching" || 
                          ridePhase === "almost_there";

  const handleCancel = () => {
    if (currentRide && !isRideInProgress) {
      // First log the current state before any changes
      console.log("Current ride before cancellation:", currentRide);
      
      try {
        // Update ride status to cancelled in state
        const updatedRide = {
          ...currentRide,
          status: "cancelled" as const
        };
        
        // Store ride data in sessionStorage BEFORE state update
        console.log("Storing cancelled ride in sessionStorage:", updatedRide);
        sessionStorage.setItem('cancelledRide', JSON.stringify(updatedRide));
        
        // Set the updated ride in context
        setCurrentRide(updatedRide);
        
        console.log("Updated ride after cancellation:", updatedRide);
        
        // Show confirmation toast
        toast.success("Ride cancelled successfully", {
          description: "You will not be charged for this ride",
          duration: 3000,
        });
        
        console.log("Navigating to ride-cancellation immediately");
        
        // Force immediate navigation
        window.location.href = "/ride-cancellation";
      } catch (error) {
        console.error("Error during cancellation process:", error);
        toast.error("Failed to cancel ride. Please try again.");
      }
    } else if (isRideInProgress) {
      toast.error("Cannot cancel ride that is already in progress");
    } else {
      console.log("No current ride found, navigating to home");
      navigate("/home");
    }
  };

  return (
    <motion.button
      onClick={handleCancel}
      className={`w-full rounded-xl py-4 font-medium border border-rideroot-danger/20 transition-colors flex items-center justify-center ${
        isRideInProgress 
          ? "bg-gray-400 text-white cursor-not-allowed opacity-60"
          : "bg-rideroot-danger text-white hover:bg-rideroot-danger/90 shadow-button hover:shadow-button-hover cursor-pointer"
      }`}
      whileHover={{ scale: isRideInProgress ? 1 : 1.02 }}
      whileTap={{ scale: isRideInProgress ? 1 : 0.98 }}
      disabled={isRideInProgress}
    >
      <X className="mr-2" size={18} />
      {isRideInProgress ? "Cannot Cancel During Ride" : "Cancel Ride"}
    </motion.button>
  );
};

export default CancelRideButton;
