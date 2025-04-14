
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Clock, User, MapPin, Car } from "lucide-react";
import { motion } from "framer-motion";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-rideroot-mediumGrey/20 shadow-lg backdrop-blur-lg bg-white/90 z-30">
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

        <motion.div 
          className="relative flex flex-col items-center justify-center -mt-8"
          whileTap={{ scale: 0.95 }}
        >
          <button 
            onClick={() => navigate("/ride-tracking")}
            className={`flex items-center justify-center w-14 h-14 rounded-full shadow-xl ${
              isActive("/ride-tracking") ? "bg-rideroot-primary" : "bg-rideroot-secondary"
            }`}
          >
            <Car size={24} className="text-white" />
          </button>
          <span className={`text-xs mt-1 ${isActive("/ride-tracking") ? "text-rideroot-primary font-medium" : "text-rideroot-darkGrey"}`}>
            Active
          </span>
        </motion.div>

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
    </nav>
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
      className={`flex flex-col items-center justify-center w-1/5 pt-1 pb-1 relative ${
        isActive ? "text-rideroot-primary" : "text-rideroot-darkGrey"
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.div 
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full bg-rideroot-primary" 
          layoutId="bottomNavIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <Icon size={isActive ? 24 : 20} className={`${isActive ? 'mb-1' : 'mb-1'} transition-all`} />
      <span className={`text-xs transition-all ${isActive ? 'font-medium' : 'font-normal'}`}>{label}</span>
    </motion.button>
  );
};

export default BottomNav;
