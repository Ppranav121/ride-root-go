
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CancelRideButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    toast.info("Ride cancelled", {
      description: "Your ride request has been cancelled",
      duration: 3000,
    });
    navigate("/home");
  };

  return (
    <motion.button
      onClick={handleCancel}
      className="w-full bg-rideroot-danger text-white rounded-xl py-4 font-medium border border-rideroot-danger/20 hover:bg-rideroot-danger/90 transition-colors shadow-button hover:shadow-button-hover"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Cancel Ride
    </motion.button>
  );
};

export default CancelRideButton;
