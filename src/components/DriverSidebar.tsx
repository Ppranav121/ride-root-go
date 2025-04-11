
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  BarChart3, 
  Star, 
  Settings, 
  MessageSquare, 
  HelpCircle, 
  Users, 
  ChevronRight,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SheetClose } from "@/components/ui/sheet";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: User, label: "Profile", path: "/driver-profile" },
    { icon: BarChart3, label: "Earnings", path: "/driver-earnings" },
    { icon: Star, label: "Ratings", path: "/driver-ratings" },
    { icon: Settings, label: "Settings", path: "/driver-settings" },
    { icon: MessageSquare, label: "Messages", path: "/driver-messages" },
    { icon: HelpCircle, label: "Help Center", path: "/driver-help" },
    { icon: Users, label: "Referrals", path: "/driver-referrals" },
  ];
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6">
        <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-white">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-blue-600 text-white text-xl">A</AvatarFallback>
        </Avatar>
        
        <h2 className="text-xl font-bold text-center">Welcome, Alex</h2>
        
        <div className="bg-yellow-100 text-amber-800 rounded-full px-4 py-1 text-sm font-medium mt-2 flex items-center justify-center">
          <span className="mr-1">⭐</span>
          Prime Driver
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {menuItems.map((item, index) => (
            <SheetClose asChild key={index}>
              <button
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg text-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </button>
            </SheetClose>
          ))}
        </nav>
      </div>
      
      <div className="border-t p-4">
        <SheetClose asChild>
          <button 
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </SheetClose>
      </div>
      
      <div className="p-4 text-center">
        <div className="flex flex-col items-center bg-indigo-50 p-4 rounded-lg mb-2">
          <div className="text-2xl font-bold text-indigo-600">4.9 ★★★★★</div>
          <div className="text-xs text-gray-500">Based on 420 rides</div>
        </div>
      </div>
    </div>
  );
};
