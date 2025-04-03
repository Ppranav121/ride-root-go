
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Clock, User } from "lucide-react";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-rideroot-mediumGrey shadow-md">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center justify-center w-1/3 ${
            isActive("/home") ? "text-rideroot-primary" : "text-rideroot-darkGrey"
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>

        <button
          onClick={() => navigate("/rides")}
          className={`flex flex-col items-center justify-center w-1/3 ${
            isActive("/rides") ? "text-rideroot-primary" : "text-rideroot-darkGrey"
          }`}
        >
          <Clock size={24} />
          <span className="text-xs mt-1">Rides</span>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center justify-center w-1/3 ${
            isActive("/profile") ? "text-rideroot-primary" : "text-rideroot-darkGrey"
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
