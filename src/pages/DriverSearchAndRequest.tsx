
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DriverSearching from "@/components/ride/DriverSearching";
import DriverRideRequest from "@/components/ride/DriverRideRequest";
import DriverBottomNav from "@/components/DriverBottomNav";

const DriverSearchAndRequest: React.FC = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<"searching" | "request">("searching");
  
  const handleCancelSearch = () => {
    toast("Search cancelled");
    navigate("/driver-home");
  };
  
  const handleFoundRideRequest = () => {
    setStage("request");
  };
  
  // When driver accepts the ride, navigate to the DriverRide page
  // which has the full ride management interface
  const handleAcceptRide = () => {
    toast.success("Ride accepted! Navigate to pickup location.");
    navigate("/driver-ride");
  };
  
  const handleDeclineRide = () => {
    toast.info("Ride declined, continuing search");
    setStage("searching");
  };
  
  return (
    <div className="relative min-h-screen">
      {stage === "searching" && (
        <DriverSearching 
          onCancel={handleCancelSearch} 
          onRideFound={handleFoundRideRequest}
        />
      )}
      
      {stage === "request" && (
        <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col">
          {/* Map placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-blue-800 animate-pulse">
              Map View
            </div>
          </div>
          
          <DriverRideRequest
            onAccept={handleAcceptRide}
            onDecline={handleDeclineRide}
          />
        </div>
      )}
      
      {/* Only show BottomNav on searching stage */}
      {stage === "searching" && <DriverBottomNav />}
    </div>
  );
};

export default DriverSearchAndRequest;
