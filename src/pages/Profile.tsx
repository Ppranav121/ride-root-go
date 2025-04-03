
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, CreditCard, MapPin, Bell, LogOut, Star } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import BottomNav from "@/components/BottomNav";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSubscribe = () => {
    // In a real app, this would open a subscription flow
    console.log("Navigate to subscription page");
  };

  if (!user) {
    React.useEffect(() => {
      navigate("/signin");
    }, [navigate]);
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-rideroot-lightGrey">
      <RootHeader title="Profile" showBackButton={false} />

      <div className="flex-1 p-4">
        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-rideroot-primary/20 rounded-full flex items-center justify-center mr-4">
              <User size={32} className="text-rideroot-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-rideroot-text">{user.name}</h2>
              <p className="text-rideroot-darkGrey">{user.phone}</p>
              <p className="text-rideroot-darkGrey">{user.email}</p>
            </div>
          </div>

          {!user.isSubscribed && (
            <div className="bg-rideroot-lightGrey rounded-lg p-4 mb-4">
              <h3 className="font-medium text-rideroot-text mb-1">Join RideRoot Premium</h3>
              <p className="text-sm text-rideroot-darkGrey mb-3">
                Get 10% off every ride, free cancellations & more for just $9.99/month
              </p>
              <button
                onClick={handleSubscribe}
                className="btn-primary w-full py-2"
              >
                Subscribe for $9.99/month
              </button>
            </div>
          )}

          {user.isSubscribed && (
            <div className="bg-rideroot-primary/10 rounded-lg p-4 mb-4 border border-rideroot-primary/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-rideroot-primary">Premium Member</h3>
                <Star size={18} className="text-rideroot-primary" />
              </div>
              <p className="text-sm text-rideroot-text">
                You're saving 10% on every ride!
              </p>
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="font-semibold text-rideroot-text mb-4">Account Settings</h3>
          
          <button className="flex items-center w-full py-3 border-b border-rideroot-mediumGrey">
            <CreditCard size={20} className="text-rideroot-darkGrey mr-3" />
            <span className="text-rideroot-text">Payment Methods</span>
          </button>
          
          <button className="flex items-center w-full py-3 border-b border-rideroot-mediumGrey">
            <MapPin size={20} className="text-rideroot-darkGrey mr-3" />
            <span className="text-rideroot-text">Saved Addresses</span>
          </button>
          
          <button className="flex items-center w-full py-3">
            <Bell size={20} className="text-rideroot-darkGrey mr-3" />
            <span className="text-rideroot-text">Notifications</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full py-3 text-rideroot-danger font-medium"
        >
          <LogOut size={20} className="mr-2" />
          <span>Log Out</span>
        </button>
      </div>

      <div className="h-16"></div> {/* Spacer for bottom nav */}
      <BottomNav />
    </div>
  );
};

export default Profile;
