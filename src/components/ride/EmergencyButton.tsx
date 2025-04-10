
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
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <motion.button 
        className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-3 flex items-center justify-center gap-2 shadow-lg border border-red-700 rounded-lg"
        onClick={handleSosClick}
        whileTap={{ scale: 0.98 }}
        animate={{ 
          backgroundColor: ['rgba(220, 38, 38, 0.9)', 'rgba(239, 68, 68, 0.95)', 'rgba(220, 38, 38, 0.9)'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="bg-white p-1 rounded-full">
          <AlertTriangle size={18} strokeWidth={2.5} className="text-red-600" />
        </div>
        <span className="text-base font-semibold tracking-wide">EMERGENCY ASSISTANCE</span>
      </motion.button>
    </div>
  );
};

export default EmergencyButton;
