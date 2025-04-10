
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Car, Star } from "lucide-react";
import { motion } from "framer-motion";

const DriverBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      className="fixed bottom-0 w-full bg-white/95 border-t border-gray-200 shadow-lg backdrop-blur-lg z-30"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        <NavButton 
          label="Home" 
          icon={Car} 
          isActive={isActive("/driver-home")} 
          onClick={() => navigate("/driver-home")}
        />

        <NavButton 
          label="Ratings" 
          icon={Star} 
          isActive={isActive("/driver-ratings")} 
          onClick={() => navigate("/driver-ratings")}
        />
      </div>
    </motion.nav>
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
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center justify-center w-1/2 pt-1 pb-1 relative ${
        isActive ? "text-rideroot-primary" : "text-rideroot-darkGrey"
      }`}
    >
      {isActive && (
        <motion.div 
          layoutId="driverActiveTab"
          className="absolute -top-1 w-full h-1 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary" 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex flex-col items-center"
      >
        <Icon size={isActive ? 24 : 20} className="mb-1 transition-all" />
        <span className={`text-xs transition-all ${isActive ? 'font-medium' : 'font-normal'}`}>{label}</span>
      </motion.div>
    </motion.button>
  );
};

export default DriverBottomNav;
