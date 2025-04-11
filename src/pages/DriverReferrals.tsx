
import React from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Users } from "lucide-react";

import RootHeader from "@/components/RootHeader";
import DriverBottomNav from "@/components/DriverBottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const DriverReferrals: React.FC = () => {
  const referralCode = "ALEX2025";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    toast("Referral code copied to clipboard!");
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <RootHeader title="Referrals" showBackButton={true} />
      
      <div className="flex-1 overflow-auto p-4 pb-20 space-y-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white">
          <Users className="h-12 w-12 mb-3 bg-white/20 p-2 rounded-lg" />
          <h1 className="text-2xl font-bold mb-2">Refer Friends & Earn</h1>
          <p className="text-white/80 mb-4">Earn up to $500 for each friend who signs up and completes 25 rides</p>
          
          <div className="bg-white rounded-lg p-4 text-center mt-4">
            <div className="text-gray-500 text-sm mb-1">Your Referral Code</div>
            <div className="flex items-center justify-center">
              <div className="text-xl font-bold text-black mr-2">{referralCode}</div>
              <button 
                onClick={copyToClipboard}
                className="text-blue-500 hover:text-blue-700"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-4">
            <h2 className="font-bold text-lg mb-4">How It Works</h2>
            
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</div>
                <div>
                  <h3 className="font-medium">Share your code</h3>
                  <p className="text-gray-500 text-sm">Send your referral code to friends who want to drive</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</div>
                <div>
                  <h3 className="font-medium">Friend signs up</h3>
                  <p className="text-gray-500 text-sm">They enter your code during registration</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</div>
                <div>
                  <h3 className="font-medium">Earn rewards</h3>
                  <p className="text-gray-500 text-sm">Get paid when they complete qualifying rides</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
        
        <div className="mt-6">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share Your Code
          </motion.button>
        </div>
      </div>
      
      <DriverBottomNav />
    </div>
  );
};

export default DriverReferrals;
