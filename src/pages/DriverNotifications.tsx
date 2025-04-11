
import React from "react";
import { motion } from "framer-motion";
import { Check, Star, TrendingUp, Clock, DollarSign } from "lucide-react";

import RootHeader from "@/components/RootHeader";
import DriverBottomNav from "@/components/DriverBottomNav";

interface Notification {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notificationList: Notification[] = [
  {
    id: 1,
    icon: <DollarSign className="h-6 w-6 text-green-500" />,
    title: "You received a $7.50 tip!",
    description: "A passenger from your recent trip left you a tip",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 2,
    icon: <Star className="h-6 w-6 text-blue-500" />,
    title: "New 5-star rating received!",
    description: "A passenger rated your service 5 stars",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
    title: "Surge pricing active in your area",
    description: "Higher rates are now available nearby",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    icon: <Check className="h-6 w-6 text-green-500" />,
    title: "Account verification completed",
    description: "Your account has been fully verified",
    time: "1 day ago",
    read: true,
  },
  {
    id: 5,
    icon: <Clock className="h-6 w-6 text-orange-500" />,
    title: "Weekly summary available",
    description: "Your weekly earnings and stats report is ready",
    time: "2 days ago",
    read: true,
  }
];

const DriverNotifications: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <RootHeader title="Notifications" showBackButton={true} showNotificationButton={false} />
      
      <div className="flex-1 overflow-auto p-4 pb-20">
        <h1 className="text-2xl font-bold mb-6">Recent Notifications</h1>
        
        <div className="space-y-4">
          {notificationList.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white p-4 rounded-lg shadow-sm flex ${notification.read ? 'opacity-75' : 'border-l-4 border-blue-500'}`}
            >
              <div className="mr-4 bg-gray-100 rounded-full p-2">
                {notification.icon}
              </div>
              
              <div className="flex-1">
                <div className="font-medium">{notification.title}</div>
                <div className="text-gray-500 text-sm">{notification.description}</div>
                <div className="text-gray-400 text-xs mt-1">{notification.time}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button className="text-blue-600 font-medium">Mark all as read</button>
        </div>
      </div>
      
      <DriverBottomNav />
    </div>
  );
};

export default DriverNotifications;
