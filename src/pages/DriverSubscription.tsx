
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Crown, Shield, Zap, Check, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DriverSubscription: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubscribe = () => {
    toast({
      title: "Subscription Activated!",
      description: "You are now a Prime Driver. Enjoy the benefits!",
    });
    navigate("/driver-home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="p-4 flex items-center border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </Button>
        <h1 className="text-xl font-semibold">Prime Driver</h1>
      </header>
      
      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Hero section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8 pt-4"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Crown size={36} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Upgrade to Prime Driver</h1>
          <p className="text-gray-600">Get priority access to premium rides and earn more</p>
        </motion.div>
        
        {/* Pricing */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-indigo-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Crown size={20} className="text-amber-500 mr-2" />
              Prime Driver
            </h2>
            <div className="flex items-center">
              <span className="text-sm line-through text-gray-400 mr-2">$24.99</span>
              <span className="text-lg font-bold text-indigo-600">$19.99</span>
              <span className="text-xs text-gray-600">/week</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-4 mt-2">
            <p className="text-sm text-gray-600 mb-4">With Prime Driver, you'll pay just $1 per ride instead of $2.50, saving you money on high volume.</p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                  <Check size={14} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Priority Ride Assignments</h3>
                  <p className="text-sm text-gray-600">Get matched to riders before non-Prime drivers</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                  <Check size={14} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Peak Time Bonuses</h3>
                  <p className="text-sm text-gray-600">Earn an extra $0.50 per ride during peak hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                  <Check size={14} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">5 Free Cancellations Daily</h3>
                  <p className="text-sm text-gray-600">Cancel rides without penalty (up to 5 per day)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
          <div className="flex items-center mb-3">
            <Star size={16} className="text-amber-500 mr-1" />
            <Star size={16} className="text-amber-500 mr-1" />
            <Star size={16} className="text-amber-500 mr-1" />
            <Star size={16} className="text-amber-500 mr-1" />
            <Star size={16} className="text-amber-500 mr-1" />
            <span className="text-sm font-medium ml-1">4.9/5 from Prime Drivers</span>
          </div>
          <p className="text-sm italic text-gray-700">
            "I earned 30% more in my first month as a Prime Driver. The peak bonuses really add up!"
          </p>
          <p className="text-xs text-gray-600 mt-2">- Michael S., Prime Driver for 3 months</p>
        </div>
        
        {/* Break-even calculator */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center mb-2">
            <Clock size={16} className="text-indigo-500 mr-2" />
            <h3 className="font-medium">Prime pays for itself if you do:</h3>
          </div>
          <p className="text-center bg-indigo-50 py-3 rounded-lg text-indigo-700 font-bold">
            13+ rides per week
          </p>
          <p className="text-xs text-center text-gray-600 mt-2">
            Based on savings of $1.50 per ride ($2.50 vs $1.00 ride fee)
          </p>
        </div>
        
        {/* CTA */}
        <div className="py-4">
          <Button 
            onClick={handleSubscribe}
            className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg"
          >
            <Crown size={18} className="mr-2" />
            Become a Prime Driver
          </Button>
          <p className="text-center text-sm text-gray-600 mt-3">
            You can cancel your subscription at any time
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverSubscription;
