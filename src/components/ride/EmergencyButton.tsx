
import React from "react";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const EmergencyButton: React.FC = () => {
  const { toast } = useToast();

  const handleSosClick = () => {
    toast({
      title: "Emergency Alert Sent",
      description: "Help is on the way. Stay calm and remain in the vehicle if safe to do so.",
      variant: "destructive",
    });
    console.log("SOS Button clicked");
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button 
        className="w-12 h-12 bg-red-600 text-white flex items-center justify-center shadow-lg border border-red-700 rounded-full"
        onClick={handleSosClick}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: ['0 4px 12px rgba(220, 38, 38, 0.3)', '0 4px 20px rgba(220, 38, 38, 0.5)', '0 4px 12px rgba(220, 38, 38, 0.3)'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="bg-white p-1 rounded-full">
          <AlertTriangle size={20} strokeWidth={2.5} className="text-red-600" />
        </div>
      </motion.button>
    </div>
  );
};

export default EmergencyButton;
