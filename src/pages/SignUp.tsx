
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Lock, User } from "lucide-react";
import RootHeader from "@/components/RootHeader";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"rider" | "driver">("rider");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to register the user
    console.log("Signing up with:", { fullName, email, phone, password, userType });
    navigate("/home");
  };

  const goToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <RootHeader title="Create Account" />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-rideroot-text">Join RideRoot</h1>

        <div className="flex mb-6 bg-rideroot-lightGrey rounded-lg p-1">
          <button
            onClick={() => setUserType("rider")}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-colors ${
              userType === "rider" 
                ? "bg-white text-rideroot-primary shadow-sm" 
                : "text-rideroot-darkGrey"
            }`}
          >
            <span>I'm a Rider</span>
          </button>
          <button
            onClick={() => setUserType("driver")}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-colors ${
              userType === "driver" 
                ? "bg-white text-rideroot-primary shadow-sm" 
                : "text-rideroot-darkGrey"
            }`}
          >
            <span>I'm a Driver</span>
          </button>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-rideroot-darkGrey" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="input-field pl-10 w-full"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-rideroot-darkGrey" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="input-field pl-10 w-full"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-rideroot-darkGrey" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="input-field pl-10 w-full"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-rideroot-darkGrey" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field pl-10 w-full"
              required
            />
          </div>

          <button type="submit" className="btn-primary w-full mt-6">
            Create Account
          </button>
        </form>

        <div className="mt-8">
          <div className="flex items-center">
            <div className="flex-grow border-t border-rideroot-mediumGrey"></div>
            <span className="mx-4 text-sm text-rideroot-darkGrey">or continue with</span>
            <div className="flex-grow border-t border-rideroot-mediumGrey"></div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <button className="py-2 px-4 border border-rideroot-mediumGrey rounded-lg flex justify-center items-center">
              G
            </button>
            <button className="py-2 px-4 border border-rideroot-mediumGrey rounded-lg flex justify-center items-center">
              f
            </button>
            <button className="py-2 px-4 border border-rideroot-mediumGrey rounded-lg flex justify-center items-center">
              a
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button onClick={goToSignIn} className="text-rideroot-primary">
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
