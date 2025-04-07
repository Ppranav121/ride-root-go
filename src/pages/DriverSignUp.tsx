
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Car, User, Shield, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const DriverSignUp: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState<"standard" | "xl" | "eco">("standard");
  const [driverTier, setDriverTier] = useState<"tier1" | "tier2">("tier1");
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Driver signing up with:", { fullName, email, phone, password, vehicleType, driverTier });
    
    toast({
      title: "Account created!",
      description: "Let's get you behind the wheel.",
    });
    
    navigate("/driver-home");
  };
  
  const goToSignIn = () => {
    navigate("/signin");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col"
    >
      {/* Logo and header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-16">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="w-16 h-16 bg-rideroot-primary rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
            <Car size={32} className="text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-rideroot-primary to-rideroot-secondary">Create Driver Account</h1>
          <p className="text-gray-400 text-center">Join RideRoot as a driver</p>
        </motion.div>

        {/* Driver tier selector */}
        <div className="w-full max-w-md mb-8">
          <h3 className="text-sm font-medium text-gray-300 mb-2">SELECT DRIVER TIER:</h3>
          <div className="flex mb-6 bg-black/40 border border-gray-700 rounded-lg p-1 backdrop-blur-sm">
            <button
              onClick={() => setDriverTier("tier1")}
              className={`flex-1 py-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                driverTier === "tier1" 
                  ? "bg-rideroot-accent text-white" 
                  : "text-gray-400"
              }`}
            >
              <span>Pay-Per-Ride</span>
              <span className="text-xs mt-1 opacity-80">$2.50/ride</span>
            </button>
            <button
              onClick={() => setDriverTier("tier2")}
              className={`flex-1 py-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                driverTier === "tier2" 
                  ? "bg-rideroot-primary text-white" 
                  : "text-gray-400"
              }`}
            >
              <span>Prime Driver</span>
              <span className="text-xs mt-1 opacity-80">$19.99/week + $1/ride</span>
            </button>
          </div>
        </div>

        {/* Vehicle type selector */}
        <div className="w-full max-w-md mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-2">VEHICLE TYPE:</h3>
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button
              onClick={() => setVehicleType("standard")}
              className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                vehicleType === "standard" 
                  ? "bg-rideroot-primary text-white border border-rideroot-primary" 
                  : "bg-black/40 border border-gray-700 text-gray-400"
              }`}
            >
              <Car size={20} className="mb-1" />
              <span className="text-sm">Standard</span>
              <span className="text-xs mt-1 opacity-80">4 seats</span>
            </button>
            <button
              onClick={() => setVehicleType("xl")}
              className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                vehicleType === "xl" 
                  ? "bg-rideroot-secondary text-white border border-rideroot-secondary" 
                  : "bg-black/40 border border-gray-700 text-gray-400"
              }`}
            >
              <Car size={24} className="mb-1" />
              <span className="text-sm">XL</span>
              <span className="text-xs mt-1 opacity-80">6+ seats</span>
            </button>
            <button
              onClick={() => setVehicleType("eco")}
              className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                vehicleType === "eco" 
                  ? "bg-green-600 text-white border border-green-600" 
                  : "bg-black/40 border border-gray-700 text-gray-400"
              }`}
            >
              <Car size={20} className="mb-1" />
              <span className="text-sm">Eco</span>
              <span className="text-xs mt-1 opacity-80">Electric/Hybrid</span>
            </button>
          </div>
        </div>

        {/* Driver benefits based on selected tier */}
        <div className="w-full max-w-md mb-8">
          {driverTier === "tier2" ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-r from-rideroot-primary/20 to-rideroot-secondary/20 p-4 rounded-lg border border-rideroot-primary/30"
            >
              <h3 className="font-medium text-rideroot-primary mb-2">Prime Driver Benefits:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <ChevronRight size={18} className="text-rideroot-primary mr-1 flex-shrink-0 mt-0.5" />
                  <span>Priority ride assignments</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight size={18} className="text-rideroot-primary mr-1 flex-shrink-0 mt-0.5" />
                  <span>Peak-time bonuses (+$0.50/ride)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight size={18} className="text-rideroot-primary mr-1 flex-shrink-0 mt-0.5" />
                  <span>5 free cancellations per month</span>
                </li>
              </ul>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-r from-rideroot-accent/20 to-blue-600/20 p-4 rounded-lg border border-rideroot-accent/30"
            >
              <h3 className="font-medium text-rideroot-accent mb-2">Pay-Per-Ride Benefits:</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start">
                  <ChevronRight size={18} className="text-rideroot-accent mr-1 flex-shrink-0 mt-0.5" />
                  <span>No weekly subscription fee</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight size={18} className="text-rideroot-accent mr-1 flex-shrink-0 mt-0.5" />
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight size={18} className="text-rideroot-accent mr-1 flex-shrink-0 mt-0.5" />
                  <span>Simple earnings structure</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Social login buttons */}
        <div className="w-full max-w-md space-y-3 mb-6">
          <button className="flex items-center justify-center w-full p-3 bg-black border border-gray-700 rounded-full text-white hover:bg-gray-900 transition-all">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
          
          <button className="flex items-center justify-center w-full p-3 bg-black border border-gray-700 rounded-full text-white hover:bg-gray-900 transition-all">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
            </svg>
            Continue with Apple
          </button>
        </div>

        {/* Sign up button */}
        <Button 
          onClick={handleSignUp}
          className="w-full max-w-md bg-gradient-to-r from-rideroot-primary to-rideroot-secondary hover:opacity-90 text-white rounded-full p-6 mb-4 font-medium shadow-md"
        >
          {driverTier === "tier2" ? "Join as Prime Driver" : "Join as Pay-Per-Ride Driver"}
        </Button>

        {/* Sign in link */}
        <Button
          variant="outline"
          onClick={goToSignIn}
          className="w-full max-w-md bg-transparent border-2 border-rideroot-primary/70 text-white hover:bg-rideroot-primary/20 rounded-full p-6"
        >
          Already a driver? Sign in
        </Button>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center w-full max-w-md text-xs text-gray-500">
          <span>Privacy Policy</span>
          <span className="mx-2">•</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverSignUp;
