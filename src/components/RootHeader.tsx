
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface RootHeaderProps {
  title?: React.ReactNode; // Changed from string to ReactNode
  showBackButton?: boolean;
  showProfileButton?: boolean;
  transparent?: boolean;
}

const RootHeader: React.FC<RootHeaderProps> = ({
  title,
  showBackButton = true,
  showProfileButton = true,
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
        {title && (
          <h1 className="text-lg font-semibold text-rideroot-text tracking-tight">
            {title}
          </h1>
        )}
      </div>

      {showProfileButton && isAuthenticated && (
        <button
          onClick={() => navigate("/profile")}
          className="p-2 rounded-full bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey text-rideroot-text transition-colors"
          aria-label="View profile"
        >
          <User size={22} />
        </button>
      )}
    </header>
  );
};

export default RootHeader;
