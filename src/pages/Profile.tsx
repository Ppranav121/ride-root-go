
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, CreditCard, MapPin, Bell, LogOut, Star, Settings, History, Shield, HelpCircle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useApp();
  const { toast } = useToast();

  // This ensures the component re-renders when navigated to via the bottom nav
  useEffect(() => {
    if (location.state?.refresh) {
      console.log("Profile refreshed at:", location.state.refresh);
    }
  }, [location.state]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const handleSubscribe = () => {
    toast({
      title: "Subscribing to RideRoot Premium",
      description: "Directing to payment page...",
    });
    // In a real app, this would open a subscription flow
    console.log("Navigate to subscription page");
  };

  // Handler for profile settings
  const handleProfileAction = (action: string) => {
    toast({
      title: `Accessing ${action}`,
      description: `This would open the ${action} section in a real app`,
    });
    console.log(`User clicked: ${action}`);
  };

  if (!user) {
    React.useEffect(() => {
      navigate("/signin");
    }, [navigate]);
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-rideroot-lightGrey"
    >
      <RootHeader title="Profile" showBackButton={false} />

      <div className="flex-1 p-4 pb-20 overflow-auto">
        {/* User Profile Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rideroot-primary to-rideroot-primary/70 rounded-full flex items-center justify-center mr-4">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-rideroot-text">{user.name}</h2>
              <p className="text-rideroot-darkGrey">{user.phone}</p>
              <p className="text-rideroot-darkGrey">{user.email}</p>
            </div>
          </div>

          {!user.isSubscribed && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-rideroot-lightGrey to-rideroot-lightGrey/50 rounded-lg p-4 mb-4"
            >
              <h3 className="font-medium text-rideroot-text mb-1">Join RideRoot Premium</h3>
              <p className="text-sm text-rideroot-darkGrey mb-3">
                Get 10% off every ride, free cancellations & more for just $9.99/month
              </p>
              <button
                onClick={handleSubscribe}
                className="btn-primary w-full py-2 rounded-full bg-rideroot-primary text-white hover:bg-rideroot-primary/90 transition-all"
              >
                Subscribe for $9.99/month
              </button>
            </motion.div>
          )}

          {user.isSubscribed && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-rideroot-primary/10 rounded-lg p-4 mb-4 border border-rideroot-primary/20"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-rideroot-primary">Premium Member</h3>
                <Star size={18} className="text-rideroot-primary" />
              </div>
              <p className="text-sm text-rideroot-text">
                You're saving 10% on every ride!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Account Settings */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <h3 className="font-semibold text-rideroot-text mb-4 px-2">Account Settings</h3>
          
          <ProfileLink icon={CreditCard} label="Payment Methods" onClick={() => handleProfileAction("Payment Methods")} />
          <ProfileLink icon={MapPin} label="Saved Addresses" onClick={() => handleProfileAction("Saved Addresses")} />
          <ProfileLink icon={Bell} label="Notifications" onClick={() => handleProfileAction("Notifications")} isLast={true} />
        </motion.div>

        {/* Additional Settings */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-6"
        >
          <h3 className="font-semibold text-rideroot-text mb-4 px-2">More</h3>
          
          <ProfileLink icon={History} label="Ride History" onClick={() => navigate("/rides")} />
          <ProfileLink icon={Settings} label="Preferences" onClick={() => handleProfileAction("Preferences")} />
          <ProfileLink icon={Shield} label="Privacy & Security" onClick={() => handleProfileAction("Privacy & Security")} />
          <ProfileLink icon={HelpCircle} label="Help & Support" onClick={() => handleProfileAction("Help & Support")} isLast={true} />
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={handleLogout}
          className="flex items-center justify-center w-full py-4 bg-white rounded-xl shadow-sm text-rideroot-danger font-medium mt-4"
        >
          <LogOut size={20} className="mr-2" />
          <span>Log Out</span>
        </motion.button>
      </div>

      <div className="h-16"></div> {/* Spacer for bottom nav */}
      <BottomNav />
    </motion.div>
  );
};

interface ProfileLinkProps {
  icon: React.ElementType;
  label: string;
  isLast?: boolean;
  onClick: () => void;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ icon: Icon, label, isLast = false, onClick }) => {
  return (
    <>
      <button 
        className="flex items-center w-full py-3 px-2 hover:bg-rideroot-primary/5 rounded-lg transition-colors"
        onClick={onClick}
      >
        <Icon size={20} className="text-rideroot-primary mr-3" />
        <span className="text-rideroot-text">{label}</span>
      </button>
      {!isLast && <Separator className="my-1 bg-rideroot-mediumGrey/30" />}
    </>
  );
};

export default Profile;
