
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CancelRideButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <motion.button
      onClick={handleCancel}
      className="w-full bg-white/10 backdrop-blur-md text-white rounded-xl py-4 font-medium border border-white/20 hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Cancel Ride
    </motion.button>
  );
};

export default CancelRideButton;
