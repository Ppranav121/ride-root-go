
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CancelRideButtonProps {
  className?: string;
}

const CancelRideButton: React.FC<CancelRideButtonProps> = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <Button 
      onClick={() => navigate("/home")}
      variant="outline" 
      className={`w-full border border-red-500/50 bg-transparent text-red-500 hover:bg-red-500/10 hover:text-red-400 py-6 rounded-full text-lg ${className}`}
    >
      Cancel Ride
    </Button>
  );
};

export default CancelRideButton;
