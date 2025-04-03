
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, this would validate credentials with the server
      await login(email, password);
      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      // In a real app, we would show an error message
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <RootHeader title="Sign In" />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-rideroot-text">Welcome Back</h1>

        <form onSubmit={handleSignIn} className="space-y-4">
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

          <div className="text-right">
            <button type="button" className="text-rideroot-primary text-sm">
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            className={`btn-primary w-full mt-6 ${isLoading ? 'opacity-70' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
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
          <button onClick={goToSignUp} className="text-rideroot-primary">
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
