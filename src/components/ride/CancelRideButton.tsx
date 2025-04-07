
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CancelRideButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/ride-cancellation");
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
