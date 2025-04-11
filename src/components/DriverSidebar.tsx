
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  User, 
  Wallet, 
  Star, 
  Settings, 
  MessageCircle, 
  HelpCircle, 
  Gift, 
  Crown, 
  X,
  Car,
  Map,
  LogOut,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"; 
import { SheetClose } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

interface DriverSidebarProps {
  firstName?: string;
  isPrimeDriver?: boolean;
}

const DriverSidebar: React.FC<DriverSidebarProps> = ({ 
  firstName = "Alex", 
  isPrimeDriver = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useApp();
  const rating = 4.9;
  const totalRides = 420;

  const menuItems = [
    { icon: Car, label: "Home", path: "/driver-home" },
    { icon: Map, label: "Map", path: "/driver-map" },
    { icon: Wallet, label: "Earnings", path: "/driver-earnings" },
    { icon: Star, label: "Ratings", path: "/driver-ratings" },
    { icon: Bell, label: "Notifications", path: "/driver-notifications", badge: 3 },
    { icon: MessageCircle, label: "Messages", path: "/driver-messages" },
    { icon: Gift, label: "Referrals", path: "/driver-referrals" },
    { icon: Settings, label: "Settings", path: "/driver-settings" },
    { icon: HelpCircle, label: "Help Center", path: "/driver-help" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex justify-end p-4">
        <SheetClose className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
          <X size={20} />
        </SheetClose>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center px-6 pb-6">
        <Avatar className="w-24 h-24 bg-[#6c5ce7] mb-4">
          <AvatarFallback className="text-white text-3xl">
            {firstName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <h2 className="text-2xl font-semibold mb-3">
          Welcome, {firstName}
        </h2>

        {isPrimeDriver && (
          <div className="bg-amber-100 text-amber-600 px-4 py-1.5 rounded-full flex items-center">
            <Crown size={16} className="text-amber-500 mr-2" />
            <span className="font-medium">Prime Driver</span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 overflow-y-auto">
        {menuItems.map((item) => (
          <motion.button
            key={item.label}
            className={cn(
              "flex items-center w-full py-3.5 rounded-lg px-4 mb-1 transition-all",
              isActive(item.path)
                ? "bg-[#6c5ce7]/10 text-[#6c5ce7]" 
                : "hover:bg-gray-50 text-gray-700"
            )}
            onClick={() => handleNavigation(item.path)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon size={22} className="mr-4" />
            <span className="font-medium flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="bg-[#6c5ce7] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {item.badge}
              </span>
            )}
            {isActive(item.path) && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 w-1 h-8 bg-[#6c5ce7] rounded-r-md"
              />
            )}
          </motion.button>
        ))}
      </nav>

      <Separator className="mb-4 mt-2" />

      {/* Rating Card */}
      <div className="mx-4 mb-6">
        <motion.div 
          className="bg-gradient-to-r from-[#6c5ce7] to-[#5046af] text-white p-4 rounded-2xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-lg font-medium mb-1">Driver Rating</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold mr-2">{rating}</span>
            <div className="flex text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" size={18} />
              ))}
            </div>
          </div>
          <p className="text-sm opacity-80 mt-1">Based on {totalRides} rides</p>
        </motion.div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mb-6">
        <button 
          onClick={() => navigate("/signin")}
          className="flex items-center w-full py-3.5 px-4 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={22} className="mr-4" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default DriverSidebar;
