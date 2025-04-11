
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, MapPin, User, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

const DriverBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-lg rounded-full shadow-xl z-30 border border-white/50 px-3"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-center p-1 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/30 to-blue-50/30 rounded-full opacity-50"></div>
        <div className="relative z-10 flex items-center">
          <NavButton 
            label="Dashboard" 
            icon={Home} 
            isActive={isActive("/driver-home")}
            onClick={() => navigate("/driver-home")}
          />
          
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          
          <NavButton 
            label="Map" 
            icon={MapPin} 
            isActive={isActive("/driver-ride")}
            onClick={() => navigate("/driver-ride")}
          />
          
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          
          <NavButton 
            label="Earnings" 
            icon={BarChart2} 
            isActive={isActive("/driver-earnings")}
            onClick={() => navigate("/driver-earnings")}
          />
          
          <div className="h-6 w-px bg-gray-200 mx-1"></div>
          
          <NavButton 
            label="Profile" 
            icon={User} 
            isActive={isActive("/driver-profile")}
            onClick={() => navigate("/driver-profile")}
          />
        </div>
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

const NavButton: React.FC<NavButtonProps> = ({
  label,
  icon: Icon,
  isActive,
  onClick
}) => {
  return (
    <motion.button 
      onClick={onClick} 
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center justify-center w-20 py-2 relative z-10"
    >
      <motion.div 
        className={`flex flex-col items-center relative ${isActive ? "text-rideroot-primary" : "text-gray-500"}`}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="relative">
          {isActive && (
            <motion.div
              layoutId="activeNavBackground"
              className="absolute inset-0 -m-2 bg-gradient-to-r from-rideroot-primary/20 via-blue-400/10 to-rideroot-secondary/20 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Icon 
            size={isActive ? 22 : 20} 
            className={`mb-1 transition-all ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`}
          />
        </div>
        <span className={`text-[10px] transition-all ${isActive ? 'font-semibold' : 'font-medium'}`}>
          {label}
        </span>
      </motion.div>
    </motion.button>
  );
};

export default DriverBottomNav;
