import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Lock, User, ChevronRight, Car } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"rider" | "driver">("rider");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", { fullName, email, phone, password, userType });
    navigate("/home");
  };

  const goToSignIn = () => {
    navigate("/signin");
  };

  const goToDriverSignUp = () => {
    navigate("/driver-signup");
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
          {/* Updated logo to match RideRoot branding */}
          <div className="w-20 h-20 bg-gradient-to-r from-rideroot-primary to-rideroot-secondary rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg">
            <Car size={36} className="text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-rideroot-primary to-rideroot-secondary">Create Account</h1>
          <p className="text-gray-400 text-center">Join RideRoot today</p>
        </motion.div>

        {/* User type selector */}
        <div className="w-full max-w-md mb-8">
          <div className="flex mb-6 bg-black/40 border border-gray-700 rounded-lg p-1 backdrop-blur-sm">
            <button
              onClick={() => setUserType("rider")}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center transition-all ${
                userType === "rider" 
                  ? "bg-rideroot-primary text-white" 
                  : "text-gray-400"
              }`}
            >
              <span>I'm a Rider</span>
            </button>
            <button
              onClick={() => goToDriverSignUp()}
              className="flex-1 py-3 rounded-lg flex items-center justify-center transition-all text-gray-400 hover:text-white"
            >
              <span>I'm a Driver</span>
            </button>
          </div>
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
          
          <button className="flex items-center justify-center w-full p-3 bg-black border border-gray-700 rounded-full text-white hover:bg-gray-900 transition-all">
            <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-5.989-4.394-10.954-10.13-11.855v8.363h2.789l0.531 3.46h-3.32v2.214c0 0.947 0.464 1.869 1.95 1.869h1.514v2.942c0 0 -1.376 0.235-2.69 0.235c-2.742 0-4.538-1.662-4.538-4.67v-2.59h-3.055v-3.46h3.055v-8.363c-5.736 0.901-10.13 5.866-10.13 11.855c0 6.627 5.373 12 12.002 12c6.628 0 12.002-5.373 12.002-12z" />
            </svg>
            Continue with Facebook
          </button>
          
          <button className="flex items-center justify-center w-full p-3 bg-black border border-gray-700 rounded-full text-white hover:bg-gray-900 transition-all">
            <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Continue with X
          </button>
        </div>

        {/* Sign up button */}
        <Button 
          onClick={handleSignUp}
          className="w-full max-w-md bg-gradient-to-r from-rideroot-primary to-rideroot-secondary hover:opacity-90 text-white rounded-full p-6 mb-4 font-medium shadow-md"
        >
          Sign up
        </Button>

        {/* Sign in link */}
        <Button
          variant="outline"
          onClick={goToSignIn}
          className="w-full max-w-md bg-transparent border-2 border-rideroot-primary/70 text-white hover:bg-rideroot-primary/20 rounded-full p-6"
        >
          Sign in
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

export default SignUp;
