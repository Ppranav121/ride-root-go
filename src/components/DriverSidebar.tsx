
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Wallet, 
  Star, 
  Settings, 
  MessageCircle, 
  HelpCircle, 
  Gift, 
  Crown, 
  X
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator"; 
import { SheetClose } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";

interface DriverSidebarProps {
  firstName?: string;
  isPrimeDriver?: boolean;
}

const DriverSidebar: React.FC<DriverSidebarProps> = ({ 
  firstName = "Alex", 
  isPrimeDriver = true 
}) => {
  const navigate = useNavigate();
  const { user } = useApp();
  const rating = 4.9;
  const totalRides = 420;

  const menuItems = [
    { icon: User, label: "Profile", path: "/driver-profile" },
    { icon: Wallet, label: "Earnings", path: "/driver-earnings" },
    { icon: Star, label: "Ratings", path: "/driver-ratings" },
    { icon: Settings, label: "Settings", path: "/driver-settings" },
    { icon: MessageCircle, label: "Messages", path: "/driver-messages" },
    { icon: HelpCircle, label: "Help Center", path: "/driver-help" },
    { icon: Gift, label: "Referrals", path: "/driver-referrals" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
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
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            className="flex items-center w-full py-3.5 hover:bg-gray-50 rounded-md px-4 mb-1 transition-colors"
            onClick={() => handleNavigation(item.path)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon size={22} className="mr-4" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <Separator className="mb-4 mt-2" />

      {/* Rating Card */}
      <div className="mx-4 mb-6">
        <motion.div 
          className="bg-[#6c5ce7] text-white p-4 rounded-2xl"
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
    </div>
  );
};

export default DriverSidebar;
