
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Clock, User, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      className="fixed bottom-0 w-full bg-white border-t border-rideroot-mediumGrey shadow-lg backdrop-blur-lg bg-white/90 z-30 mobile-bottom-safe"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        <NavButton 
          label="Home" 
          icon={Home} 
          isActive={isActive("/home")} 
          onClick={() => navigate("/home")}
        />

        <NavButton 
          label="Book" 
          icon={MapPin} 
          isActive={isActive("/book-ride")} 
          onClick={() => navigate("/book-ride")}
        />

        <NavButton 
          label="Rides" 
          icon={Clock} 
          isActive={isActive("/rides")} 
          onClick={() => navigate("/rides")}
        />

        <NavButton 
          label="Profile" 
          icon={User} 
          isActive={isActive("/profile")}
          onClick={() => navigate("/profile", { replace: false, state: { refresh: Date.now() } })}
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
      whileTap={{ scale: 0.9 }}
      className={`flex flex-col items-center justify-center w-1/4 pt-1 pb-1 relative touch-feedback ${
        isActive ? "text-rideroot-primary" : "text-rideroot-darkGrey"
      }`}
    >
      {isActive && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full bg-rideroot-primary" 
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon size={isActive ? 24 : 20} className={`${isActive ? 'mb-1' : 'mb-1'} transition-all`} />
        <span className={`text-xs transition-all ${isActive ? 'font-medium' : 'font-normal'}`}>{label}</span>
      </motion.div>
    </motion.button>
  );
};

export default BottomNav;
