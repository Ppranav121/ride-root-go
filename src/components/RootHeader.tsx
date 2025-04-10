
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Bell } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RootHeaderProps {
  title?: React.ReactNode;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  showNotifications?: boolean;
  transparent?: boolean;
  children?: React.ReactNode;
}

const RootHeader: React.FC<RootHeaderProps> = ({
  title,
  showBackButton = true,
  showProfileButton = true,
  showNotifications = true,
  transparent = false,
  children,
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
        {title && (
          <h1 className="text-lg font-semibold text-rideroot-text tracking-tight">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-3">
        {children}

        {showNotifications && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-full bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey text-rideroot-text transition-colors"
          >
            <Bell size={20} />
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-rideroot-primary text-white">
              2
            </Badge>
          </Button>
        )}

        {showProfileButton && isAuthenticated && (
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded-full bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey text-rideroot-text transition-colors"
            aria-label="View profile"
          >
            <User size={22} />
          </button>
        )}
      </div>
    </header>
  );
};

export default RootHeader;
