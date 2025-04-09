import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Car, User, Shield, ChevronRight, Calendar, Palette, Key, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import BackButton from "@/components/common/BackButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface CarDetails {
  type: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  isPremium: boolean;
}

const DriverSignUp: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [driverTier, setDriverTier] = useState<"tier1" | "tier2">("tier1");
  const [currentStep, setCurrentStep] = useState(1);
  const [carDetails, setCarDetails] = useState<CarDetails>({
    type: "sedan",
    model: "",
    year: "",
    color: "Black",
    licensePlate: "",
    isPremium: false
  });
  
  const carColors = [
    "Black", "White", "Silver", "Gray", "Red", 
    "Blue", "Green", "Yellow", "Brown", "Gold"
  ];
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Driver signing up with:", { fullName, email, phone, password, driverTier, carDetails });
    
    toast({
      title: "Account created!",
      description: "Let's get you behind the wheel.",
    });
    
    navigate("/driver-home");
  };
  
  const goToSignIn = () => {
    navigate("/signin");
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col"
    >
      {/* Add Back Button */}
      <BackButton 
        onClick={() => navigate('/signup')} 
        className="top-6 left-6 z-50"
      />
      
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

        {/* Progress indicator */}
        <div className="w-full max-w-md mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step ? 'bg-rideroot-primary' : 'bg-gray-700'
                  }`}
                >
                  {currentStep > step ? (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm text-white">{step}</span>
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-400">
                  {step === 1 ? "Account" : step === 2 ? "Vehicle" : "Plan"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 w-full bg-gray-700 rounded-full">
            <div 
              className="h-1 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary rounded-full"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-black/40 border border-gray-700 text-white"
                />
              </div>
              
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-black/40 border border-gray-700 text-white"
                />
              </div>
              
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 bg-black/40 border border-gray-700 text-white"
                />
              </div>
              
              <div className="relative">
                <Shield size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-black/40 border border-gray-700 text-white"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleNextStep}
              className="w-full bg-gradient-to-r from-rideroot-primary to-rideroot-secondary hover:opacity-90 text-white rounded-full p-6 font-medium shadow-md"
            >
              Next: Vehicle Details
            </Button>
          </motion.div>
        )}

        {/* Step 2: Vehicle Details */}
        {currentStep === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
            
            <div className="bg-black/40 border border-gray-700 rounded-lg p-5 mb-6">
              <Tabs defaultValue={carDetails.type} onValueChange={(value) => setCarDetails({...carDetails, type: value})}>
                <TabsList className="grid grid-cols-3 mb-4 bg-gray-800">
                  <TabsTrigger value="sedan">Sedan</TabsTrigger>
                  <TabsTrigger value="suv">SUV/XL</TabsTrigger>
                  <TabsTrigger value="eco">Eco</TabsTrigger>
                </TabsList>
                
                <TabsContent value="sedan" className="space-y-4">
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex justify-center mb-2">
                      <Car size={48} className="text-blue-400" />
                    </div>
                    <p className="text-center text-sm text-gray-300">Standard 4-seat vehicle for everyday rides</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="suv" className="space-y-4">
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex justify-center mb-2">
                      <Car size={48} className="text-purple-400" />
                    </div>
                    <p className="text-center text-sm text-gray-300">Larger vehicle with 6+ seats for group rides</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="eco" className="space-y-4">
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex justify-center mb-2">
                      <Car size={48} className="text-green-400" />
                    </div>
                    <p className="text-center text-sm text-gray-300">Hybrid or electric vehicle for eco-friendly rides</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Car size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Car Model"
                      value={carDetails.model}
                      onChange={(e) => setCarDetails({...carDetails, model: e.target.value})}
                      className="pl-10 bg-black/40 border border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Year"
                      value={carDetails.year}
                      onChange={(e) => setCarDetails({...carDetails, year: e.target.value})}
                      className="pl-10 bg-black/40 border border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Palette size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Select
                      value={carDetails.color}
                      onValueChange={(value) => setCarDetails({...carDetails, color: value})}
                    >
                      <SelectTrigger className="pl-10 bg-black/40 border border-gray-700 text-white">
                        <SelectValue placeholder="Color" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white border-gray-700">
                        <SelectGroup>
                          {carColors.map((color) => (
                            <SelectItem key={color} value={color}>
                              {color}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="relative">
                    <Key size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="License Plate"
                      value={carDetails.licensePlate}
                      onChange={(e) => setCarDetails({...carDetails, licensePlate: e.target.value})}
                      className="pl-10 bg-black/40 border border-gray-700 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="premium"
                      checked={carDetails.isPremium}
                      onChange={(e) => setCarDetails({...carDetails, isPremium: e.target.checked})}
                      className="w-4 h-4 bg-gray-700 border-gray-600 rounded accent-rideroot-primary"
                    />
                    <label htmlFor="premium" className="ml-2 text-sm text-gray-300">
                      Premium Vehicle
                    </label>
                  </div>
                  <span className="text-xs text-gray-400">Higher earnings for luxury vehicles</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Back
              </Button>
              <Button 
                onClick={handleNextStep}
                className="flex-1 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary hover:opacity-90 text-white"
              >
                Next: Choose Plan
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Driver tier selection */}
        {currentStep === 3 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Choose Your Plan</h2>
            
            <div className="space-y-4">
              {/* Driver tier selector */}
              <div className="flex flex-col mb-6 bg-black/40 border border-gray-700 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-sm font-medium text-gray-300 mb-4">SELECT DRIVER TIER:</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => setDriverTier("tier1")}
                    className={`relative overflow-hidden p-4 rounded-lg flex flex-col items-start transition-all ${
                      driverTier === "tier1" 
                        ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/40" 
                        : "bg-black/20 border border-gray-700"
                    }`}
                  >
                    {driverTier === "tier1" && (
                      <span className="absolute top-0 right-0 bg-blue-500 text-xs font-bold text-white px-2 py-1 rounded-bl">
                        SELECTED
                      </span>
                    )}
                    <div className="flex items-center mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        driverTier === "tier1" ? "bg-blue-500" : "bg-gray-700"
                      }`}>
                        <Zap size={24} className={driverTier === "tier1" ? "text-white" : "text-gray-400"} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-lg">Pay-Per-Ride</h4>
                        <p className="text-sm text-gray-400">Flexible earnings structure</p>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 w-full p-3 rounded-lg mt-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Fee per ride:</span>
                        <span className="font-bold text-blue-400">$2.50</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-300">Weekly subscription:</span>
                        <span className="font-bold text-green-400">$0</span>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-400">
                      Great for part-time drivers. No subscription fee, just pay per ride you complete.
                    </p>
                  </button>
                  
                  <button
                    onClick={() => setDriverTier("tier2")}
                    className={`relative overflow-hidden p-4 rounded-lg flex flex-col items-start transition-all ${
                      driverTier === "tier2" 
                        ? "bg-gradient-to-r from-rideroot-primary/20 to-rideroot-secondary/20 border border-rideroot-primary/40" 
                        : "bg-black/20 border border-gray-700"
                    }`}
                  >
                    {driverTier === "tier2" && (
                      <span className="absolute top-0 right-0 bg-rideroot-primary text-xs font-bold text-white px-2 py-1 rounded-bl">
                        SELECTED
                      </span>
                    )}
                    <div className="flex items-center mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        driverTier === "tier2" ? "bg-gradient-to-r from-rideroot-primary to-rideroot-secondary" : "bg-gray-700"
                      }`}>
                        <Crown size={24} className="text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-lg">Prime Driver</h4>
                        <p className="text-sm text-gray-400">Premium benefits & priority</p>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 w-full p-3 rounded-lg mt-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Fee per ride:</span>
                        <span className="font-bold text-green-400">$1.00</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-300">Weekly subscription:</span>
                        <span className="font-bold text-rideroot-primary">$19.99</span>
                      </div>
                    </div>
                    
                    <ul className="mt-3 text-sm text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <ChevronRight size={16} className="text-rideroot-primary mr-1 flex-shrink-0 mt-0.5" />
                        <span>Priority ride assignments</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight size={16} className="text-rideroot-primary mr-1 flex-shrink-0 mt-0.5" />
                        <span>Peak-time bonuses (+$0.50/ride)</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight size={16} className="text-rideroot-primary mr-1 flex-shrink-0 mt-0.5" />
                        <span>5 free cancellations per day</span>
                      </li>
                    </ul>
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSignUp}
                  className="flex-1 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary hover:opacity-90 text-white"
                >
                  Complete Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Social login buttons - only show on first step */}
        {currentStep === 1 && (
          <>
            <div className="w-full max-w-md flex items-center my-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <div className="mx-4 text-sm text-gray-500">or continue with</div>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>
            
            <div className="w-full max-w-md space-y-3 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center p-3 bg-black border border-gray-700 rounded-xl text-white hover:bg-gray-900 transition-all">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                
                <button className="flex items-center justify-center p-3 bg-black border border-gray-700 rounded-xl text-white hover:bg-gray-900 transition-all">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                  </svg>
                  Apple
                </button>
              </div>
            </div>
          </>
        )}

        {/* Sign in link */}
        <Button
          variant="outline"
          onClick={goToSignIn}
          className="w-full max-w-md bg-transparent border border-rideroot-primary/70 text-white hover:bg-rideroot-primary/20 rounded-full p-3 mt-4"
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
