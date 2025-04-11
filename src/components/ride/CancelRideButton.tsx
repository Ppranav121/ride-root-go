
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
      // Update ride status to cancelled
      setCurrentRide({
        ...currentRide,
        status: "cancelled"
      });
      
      toast.success("Ride cancelled successfully", {
        description: "You will not be charged for this ride",
        duration: 3000,
      });
      
      // Add console log to track navigation intent
      console.log("Attempting to navigate to ride-cancellation");
      
      // Navigate to cancellation page with a slight delay to ensure state updates
      setTimeout(() => {
        console.log("Navigating to ride-cancellation now");
        navigate("/ride-cancellation");
      }, 1500);
    } else {
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
