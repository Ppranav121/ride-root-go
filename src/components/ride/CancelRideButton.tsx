
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const CancelRideButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    console.log("Navigating to ride cancellation page");
    navigate("/ride-cancellation");
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
