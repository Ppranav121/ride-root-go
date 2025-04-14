
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import DriverSidebar from "./DriverSidebar";

interface RootHeaderProps {
  title?: React.ReactNode;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  transparent?: boolean;
  showDriverSidebar?: boolean;
}

const RootHeader: React.FC<RootHeaderProps> = ({
  title,
  showBackButton = true,
  showProfileButton = true,
  transparent = false,
  showDriverSidebar = false,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useApp();

  // Get first name for driver sidebar welcome message
  const firstName = user?.name ? user.name.split(' ')[0] : "Driver";
  const isPrimeDriver = user?.isSubscribed || false;

  return (
    <motion.header 
      className={`flex items-center justify-between px-4 py-4 mobile-top-safe ${transparent ? 'bg-transparent' : 'bg-white shadow-sm'} z-10`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        {showBackButton && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-rideroot-text hover:bg-rideroot-lightGrey mr-2 transition-colors touch-feedback"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </motion.button>
        )}
        {!showBackButton && showDriverSidebar && (
          <Sheet>
            <SheetTrigger asChild>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 rounded-full text-rideroot-text hover:bg-rideroot-lightGrey mr-2 transition-colors touch-feedback"
                >
                  <Menu size={24} />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0">
              <DriverSidebar firstName={firstName} isPrimeDriver={isPrimeDriver} />
            </SheetContent>
          </Sheet>
        )}
        {title && (
          <motion.h1 
            className="text-lg font-semibold text-rideroot-text tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h1>
        )}
      </div>

      {showProfileButton && isAuthenticated && (
        showDriverSidebar ? (
          <Sheet>
            <SheetTrigger asChild>
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 rounded-full bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey text-rideroot-text transition-colors touch-feedback"
                >
                  <User size={22} />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0">
              <DriverSidebar firstName={firstName} isPrimeDriver={isPrimeDriver} />
            </SheetContent>
          </Sheet>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey text-rideroot-text transition-colors touch-feedback"
            aria-label="View profile"
          >
            <User size={22} />
          </motion.button>
        )
      )}
    </motion.header>
  );
};

export default RootHeader;
