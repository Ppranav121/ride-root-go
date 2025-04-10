
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Car, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const DriverBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 z-30"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-around items-center h-16 px-4 w-48">
        <NavButton 
          label="Dashboard" 
          icon={Car} 
          isActive={isActive("/driver-home")} 
          onClick={() => navigate("/driver-home")}
        />

        <div className="h-8 w-px bg-gray-200"></div>

        <NavButton 
          label="Map" 
          icon={MapPin} 
          isActive={isActive("/driver-ride")} 
          onClick={() => navigate("/driver-ride")}
        />
      </div>
    </motion.div>
  );
};

interface NavButtonProps {
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, icon: Icon, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center justify-center w-20 py-1 relative"
    >
      <motion.div
        className={`flex flex-col items-center relative ${
          isActive ? "text-rideroot-primary" : "text-rideroot-darkGrey"
        }`}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="relative">
          {isActive && (
            <motion.div
              layoutId="activeNavBackground"
              className="absolute inset-0 -m-2 bg-rideroot-primary/10 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Icon size={isActive ? 24 : 20} className="mb-1 transition-all" />
        </div>
        <span className={`text-xs transition-all ${isActive ? 'font-medium' : 'font-normal'}`}>{label}</span>
      </motion.div>
    </motion.button>
  );
};

export default DriverBottomNav;
