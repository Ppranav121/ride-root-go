
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Car, BarChart2, User, MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const DriverBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg backdrop-blur-lg bg-white/90 z-30"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        <NavButton 
          label="Dashboard" 
          icon={Car} 
          isActive={isActive("/driver-home")} 
          onClick={() => navigate("/driver-home")}
        />

        <NavButton 
          label="Earnings" 
          icon={BarChart2} 
          isActive={isActive("/driver-earnings")} 
          onClick={() => navigate("/driver-earnings")}
        />

        <NavButton 
          label="Messages" 
          icon={MessageCircle} 
          isActive={isActive("/driver-messages")}
          onClick={() => navigate("/driver-messages")}
        />

        <NavButton 
          label="Help" 
          icon={HelpCircle} 
          isActive={isActive("/driver-help")}
          onClick={() => navigate("/driver-help")}
        />

        <NavButton 
          label="Profile" 
          icon={User} 
          isActive={isActive("/driver-profile")}
          onClick={() => navigate("/profile")}
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
      className={`flex flex-col items-center justify-center w-1/5 pt-1 pb-1 relative ${
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
        <Icon size={isActive ? 24 : 20} className="mb-1 transition-all" />
        <span className={`text-xs transition-all ${isActive ? 'font-medium' : 'font-normal'}`}>{label}</span>
      </motion.div>
    </motion.button>
  );
};

export default DriverBottomNav;
