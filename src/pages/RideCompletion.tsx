
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";

const RideCompletion: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide } = useApp();
  const [rideData, setRideData] = useState(currentRide);

  useEffect(() => {
    console.log("RideCompletion - Current ride from context:", currentRide);

    // First try to use ride data from context
    if (currentRide && currentRide.status === "completed") {
      setRideData(currentRide);
      return;
    }

    // If no valid ride in context, try to recover from sessionStorage
    try {
      const storedRide = sessionStorage.getItem('completedRide');
      if (storedRide) {
        const parsedRide = JSON.parse(storedRide);
        console.log("RideCompletion - Recovered ride from storage:", parsedRide);
        setRideData(parsedRide);
        return;
      }
    } catch (e) {
      console.error("Error parsing stored ride:", e);
    }

    // If still no valid ride, redirect to home
    if (!rideData || rideData.status !== "completed") {
      console.log("RideCompletion - No completed ride found, redirecting to home");
      navigate("/home");
    }
  }, [currentRide, navigate, rideData]);

  const handleGoHome = () => {
    navigate("/home");
  };

  const handleRateRide = () => {
    if (rideData) {
      navigate("/ride/" + rideData.id);
    } else {
      navigate("/rides");
    }
  };

  if (!rideData) return null;

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
            <CheckCircle size={80} className="text-green-500" />
          </div>

          <h1 className="text-2xl font-bold mb-3">Ride Completed</h1>
          
          <p className="text-gray-500 mb-8 max-w-xs">
            Thanks for riding with us! Your ride has been completed successfully.
          </p>

          <div className="w-full space-y-4">
            <Button 
              onClick={handleRateRide}
              className="w-full h-14 bg-rideroot-primary text-white rounded-xl font-medium hover:bg-rideroot-primary/90 transition-colors shadow-button hover:shadow-button-hover flex items-center justify-center"
            >
              <Star className="mr-2" size={18} />
              Rate Your Ride
            </Button>
            
            <Button 
              onClick={handleGoHome}
              variant="outline"
              className="w-full h-14 rounded-xl font-medium shadow-button hover:shadow-button-hover"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RideCompletion;
