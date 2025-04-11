
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";

const CancelRideButton: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();

  const handleCancel = () => {
    if (currentRide) {
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
    } else {
      console.log("No current ride found, navigating to home");
      navigate("/home");
    }
  };

  return (
    <motion.button
      onClick={handleCancel}
      className="w-full bg-rideroot-danger text-white rounded-xl py-4 font-medium border border-rideroot-danger/20 hover:bg-rideroot-danger/90 transition-colors shadow-button hover:shadow-button-hover flex items-center justify-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <X className="mr-2" size={18} />
      Cancel Ride
    </motion.button>
  );
};

export default CancelRideButton;
