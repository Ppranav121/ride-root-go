
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";

// Custom Components
import DriverBottomNav from "@/components/DriverBottomNav";
import RootHeader from "@/components/RootHeader";
import { Card, CardContent } from "@/components/ui/card";

const DriverHome: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <RootHeader />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 pb-20 space-y-6">
        {/* Today's Earnings */}
        <div className="text-center mb-8">
          <h2 className="text-gray-500 font-medium">Today's Earnings</h2>
          <div className="text-4xl font-bold text-blue-600">$75.00</div>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="text-gray-500 text-xs uppercase font-medium">RIDES</div>
            <div className="text-xl font-bold">8</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 text-xs uppercase font-medium">HOURS</div>
            <div className="text-xl font-bold">4.5</div>
          </div>
          <div className="text-center">
            <div className="text-gray-500 text-xs uppercase font-medium">AVERAGE</div>
            <div className="text-xl font-bold">$9.38</div>
          </div>
        </div>
        
        {/* Driver Tier */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-3">Driver Tier</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress to Platinum</span>
                <span className="font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs text-gray-500 font-medium">PRIORITY RIDES</h4>
                <div className="text-xl font-bold">12</div>
              </div>
              <div>
                <h4 className="text-xs text-gray-500 font-medium">PREMIUM BENEFITS</h4>
                <div className="text-xl font-bold text-green-600">Active</div>
              </div>
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center text-blue-600 font-medium">
              View Tier Benefits
              <ArrowRight className="ml-1 w-4 h-4" />
            </button>
          </CardContent>
        </Card>
        
        {/* Performance Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Performance Stats</h3>
              <div className="text-green-600 font-medium flex items-center">
                <span className="mr-1">4.9 Rating</span>
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 font-medium">ACCEPTANCE</div>
                <div className="text-xl font-bold">92%</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 font-medium">COMPLIMENTS</div>
                <div className="text-xl font-bold">24</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 font-medium">TOTAL RIDES</div>
                <div className="text-xl font-bold">420</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 font-medium">WEEKLY</div>
                <div className="text-xl font-bold">$670</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Go Online Button */}
        <div className="mt-8 mb-2">
          <h3 className="text-lg font-bold mb-1">Go Online</h3>
          <p className="text-gray-500 text-sm mb-4">Start receiving ride requests</p>
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium shadow-md"
          >
            Go Online
          </motion.button>
        </div>
      </div>
      
      <DriverBottomNav />
    </div>
  );
};

export default DriverHome;
