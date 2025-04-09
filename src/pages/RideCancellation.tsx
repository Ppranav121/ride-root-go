
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import MapBackground from "@/components/ride/MapBackground";
import { Button } from "@/components/ui/button";

const RideCancellation: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();

  useEffect(() => {
    // Fallback if coming directly to this page without a ride
    if (!currentRide) {
      console.log("No current ride, redirecting to home");
      navigate("/home");
    }
  }, [currentRide, navigate]);

  const handleConfirmCancel = () => {
    // Update ride status
    if (currentRide) {
      setCurrentRide({
        ...currentRide,
        status: "cancelled"
      });
      
      toast.success("Ride cancelled successfully", {
        description: "You will not be charged for this ride",
        duration: 3000,
      });
      
      // Navigate back to home
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } else {
      // Fallback in case currentRide is null
      navigate("/home");
    }
  };

  const handleGoBack = () => {
    // Determine where to go back based on ride status
    if (currentRide?.status === "in-progress") {
      navigate("/ride-tracking");
    } else {
      navigate("/ride-confirmation");
    }
  };

  if (!currentRide) return null;

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <RootHeader title="Cancel Ride" />
      
      {/* Map Background */}
      <MapBackground>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
          <motion.div
            className="w-full max-w-md bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-rideroot-danger/30 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-rideroot-danger/20 rounded-full">
                <AlertCircle className="h-12 w-12 text-rideroot-danger" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2 text-white">Cancel your ride?</h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to cancel this ride? A cancellation fee may apply.
              </p>
              
              <motion.button
                onClick={handleConfirmCancel}
                className="w-full bg-rideroot-danger text-white rounded-xl py-4 font-medium border border-rideroot-danger/20 hover:bg-rideroot-danger/90 transition-colors shadow-button hover:shadow-button-hover mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Yes, Cancel This Ride
              </motion.button>
              
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                Go Back
              </Button>
            </div>
          </motion.div>
        </div>
      </MapBackground>
    </div>
  );
};

export default RideCancellation;
