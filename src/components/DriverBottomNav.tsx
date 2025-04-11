
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, MapPin, BarChart3, User } from "lucide-react";
import { motion } from "framer-motion";

const DriverBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg z-30"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        <NavButton 
          label="Dashboard" 
          icon={Home} 
          isActive={isActive("/driver-home")} 
          onClick={() => navigate("/driver-home")}
        />
        
        <NavButton 
          label="Map" 
          icon={MapPin} 
          isActive={isActive("/driver-ride")} 
          onClick={() => navigate("/driver-ride")}
        />
        
        <NavButton 
          label="Earnings" 
          icon={BarChart3} 
          isActive={isActive("/driver-earnings")} 
          onClick={() => navigate("/driver-earnings")}
        />
        
        <NavButton 
          label="Profile" 
          icon={User} 
          isActive={isActive("/driver-profile")} 
          onClick={() => navigate("/driver-profile")}
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
      className={`flex flex-col items-center justify-center pt-1 pb-1 relative ${
        isActive ? "text-rideroot-primary" : "text-gray-500"
      }`}
    >
      {isActive && (
        <motion.div 
          layoutId="driverActiveTab"
          className="absolute -top-1 w-10 h-1 rounded-full bg-rideroot-primary" 
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
