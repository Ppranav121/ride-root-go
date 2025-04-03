
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

interface RootHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showProfileButton?: boolean;
}

const RootHeader: React.FC<RootHeaderProps> = ({
  title,
  showBackButton = true,
  showProfileButton = true,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useApp();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm z-10">
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-rideroot-text hover:bg-rideroot-lightGrey mr-2"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {title && <h1 className="text-lg font-semibold text-rideroot-text">{title}</h1>}
      </div>

      {showProfileButton && isAuthenticated && (
        <button
          onClick={() => navigate("/profile")}
          className="p-2 rounded-full text-rideroot-text hover:bg-rideroot-lightGrey"
        >
          <User size={24} />
        </button>
      )}
    </header>
  );
};

export default RootHeader;
