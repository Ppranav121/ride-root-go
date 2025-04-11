
import React from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

interface DriverStatusToggleProps {
  isOnline: boolean;
  onStatusChange: (online: boolean) => void;
}

const DriverStatusToggle: React.FC<DriverStatusToggleProps> = ({ 
  isOnline, 
  onStatusChange 
}) => {
  const navigate = useNavigate();
  
  const handleStatusChange = (online: boolean) => {
    onStatusChange(online);
    
    // If turning online, navigate directly to the driver-ride page
    // with replace: true to prevent back navigation issues
    if (online) {
      navigate("/driver-ride", { replace: true });
    }
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium shadow-md"
      onClick={() => handleStatusChange(!isOnline)}
    >
      Go Online
    </motion.button>
  );
};

export default DriverStatusToggle;
