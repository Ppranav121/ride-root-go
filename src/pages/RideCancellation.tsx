
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";

const RideCancellation: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide } = useApp();

  useEffect(() => {
    if (!currentRide || currentRide.status !== "cancelled") {
      navigate("/home");
    }
  }, [currentRide, navigate]);

  const handleGoHome = () => {
    navigate("/home");
  };

  if (!currentRide) return null;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4">
        <BackButton />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <XCircle size={80} className="text-rideroot-danger" />
          </div>

          <h1 className="text-2xl font-bold mb-3">Ride Cancelled</h1>
          
          <p className="text-gray-500 mb-8 max-w-xs">
            Your ride has been cancelled successfully. You won't be charged for this ride.
          </p>

          <Button 
            onClick={handleGoHome}
            className="w-full h-14 bg-rideroot-primary text-white rounded-xl font-medium hover:bg-rideroot-primary/90 transition-colors shadow-button hover:shadow-button-hover"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RideCancellation;
