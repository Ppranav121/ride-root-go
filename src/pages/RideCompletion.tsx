import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { CheckCircle, Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import BackButton from "@/components/common/BackButton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const RideCompletion: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide } = useApp();
  const [rideData, setRideData] = useState(currentRide);

  useEffect(() => {
    console.log("RideCompletion - Component mounted");
    console.log("RideCompletion - Current ride from context:", currentRide);
    
    // First try to use ride data from context
    if (currentRide && currentRide.status === "completed") {
      console.log("RideCompletion - Using ride data from context");
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
        toast.success("Ride completed successfully!");
        return;
      } else {
        console.log("RideCompletion - No ride data found in sessionStorage");
      }
    } catch (e) {
      console.error("Error parsing stored ride:", e);
    }

    // If still no valid ride, redirect to home
    if (!rideData || rideData.status !== "completed") {
      console.log("RideCompletion - No completed ride found, redirecting to home");
      navigate("/home");
    }
  }, [currentRide, navigate]);  // Remove rideData from dependencies to prevent circular checks

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

  if (!rideData) {
    console.log("RideCompletion - No ride data, rendering null");
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4">
        <BackButton />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          className="flex flex-col items-center text-center w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <CheckCircle size={80} className="text-green-500" />
          </div>

          <h1 className="text-2xl font-bold mb-3">Ride Completed</h1>
          
          <p className="text-gray-500 mb-8">
            Thanks for riding with us! Your ride has been completed successfully.
          </p>

          <Card className="w-full mb-8 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src="https://source.unsplash.com/photo-1618160702438-9b02ab6515c9" alt="Driver" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <div className="flex items-center">
                    <div className="flex space-x-0.5 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={`${
                            star <= 4.8 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <MessageCircle size={20} className="text-gray-400 mt-1" />
                  <p className="text-sm text-gray-600 italic">
                    "Thank you for being a great passenger! I enjoyed our conversation and hope you had a comfortable ride. Have a wonderful day!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
