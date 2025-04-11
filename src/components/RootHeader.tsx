
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Bell, Menu } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./DriverSidebar";

interface RootHeaderProps {
  title?: React.ReactNode;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  showSidebarButton?: boolean;
  showNotificationButton?: boolean;
  transparent?: boolean;
}

const RootHeader: React.FC<RootHeaderProps> = ({
  title,
  showBackButton = false,
  showProfileButton = false,
  showSidebarButton = true,
  showNotificationButton = true,
  transparent = false,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  return (
    <header className={`flex items-center justify-between px-4 py-4 ${transparent ? 'bg-transparent' : 'bg-white shadow-sm'} z-10`}>
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-rideroot-text hover:bg-rideroot-lightGrey mr-2 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {showSidebarButton && isAuthenticated && (
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-full text-rideroot-text hover:bg-rideroot-lightGrey mr-2 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px] sm:max-w-[280px]">
              <Sidebar />
            </SheetContent>
          </Sheet>
        )}
        
        {title && (
          <h1 className="text-lg font-semibold text-rideroot-text tracking-tight">
            {title}
          </h1>
        )}
      </div>

      {showNotificationButton && isAuthenticated && (
        <button
          onClick={() => navigate("/driver-notifications")}
          className="p-2 rounded-full bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey text-rideroot-text transition-colors relative"
          aria-label="View notifications"
        >
          <Bell size={22} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
      )}
    </header>
  );
};

export default RootHeader;
