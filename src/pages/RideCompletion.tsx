
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Star, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const RideCompletion: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  const [rating, setRating] = useState(5);
  const [tipAmount, setTipAmount] = useState(0);
  const [customTip, setCustomTip] = useState("");
  const [comment, setComment] = useState("");
  const [mood, setMood] = useState<"happy" | "neutral" | "sad" | null>(null);
  const [step, setStep] = useState<"rating" | "tip" | "feedback" | "success">("rating");
  const [showCustomTip, setShowCustomTip] = useState(false);

  useEffect(() => {
    // Redirect if no current ride
    if (!currentRide || !currentRide.driver) {
      console.log("No current ride data, redirecting to home");
      navigate("/home");
      return;
    }
    
    // Update ride status to ensure proper flow
    if (currentRide.status !== "completed") {
      setCurrentRide({
        ...currentRide,
        status: "completed"
      });
    }
  }, [currentRide, navigate, setCurrentRide]);

  if (!currentRide || !currentRide.driver) {
    return null;
  }

  const handleRatingSubmit = () => {
    setStep("tip");
  };

  const handleTipSubmit = () => {
    setStep("feedback");
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setCustomTip(value);
      if (value) {
        setTipAmount(parseFloat(value));
      } else {
        setTipAmount(0);
      }
    }
  };

  const handleSubmitFeedback = () => {
    // Update the ride with rating and tip
    setCurrentRide({
      ...currentRide,
      status: "completed",
      rating,
      tipAmount,
      comment,
      mood
    });

    setStep("success");
    toast.success("Thank you for your feedback!");

    // Show success message and redirect after delay
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        onClick={() => setRating(star)}
        className="focus:outline-none"
        aria-label={`Rate ${star} stars`}
      >
        <Star
          size={40}
          className={cn(
            "transition-all",
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          )}
        />
      </button>
    ));
  };

  const renderMoodOptions = () => {
    const options = [
      { value: "happy", icon: <Smile size={24} />, label: "Great" },
      { value: "neutral", icon: <Meh size={24} />, label: "OK" },
      { value: "sad", icon: <Frown size={24} />, label: "Poor" },
    ];

    return (
      <div className="flex justify-center space-x-4 mb-6">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setMood(option.value as any)}
            className={cn(
              "flex flex-col items-center p-3 rounded-full w-20 h-20 transition-all",
              mood === option.value
                ? "bg-rideroot-primary text-white"
                : "bg-gray-800 text-gray-300"
            )}
            aria-label={`Rate mood as ${option.label}`}
          >
            {option.icon}
            <span className="text-xs mt-1">{option.label}</span>
          </button>
        ))}
      </div>
    );
  };

  const renderRatingStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-rideroot-primary/20 rounded-full flex items-center justify-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${currentRide.driver.name}&background=random`}
            alt={currentRide.driver.name}
            className="rounded-full w-full h-full object-cover"
          />
        </div>

        <h2 className="text-xl font-bold mb-1">
          How was the driver?
        </h2>
        <p className="text-gray-400 mb-6">
          Rate {currentRide.driver.name}
        </p>

        <div className="flex justify-center space-x-2 mb-8">
          {renderStars()}
        </div>

        {renderMoodOptions()}

        <Button
          onClick={handleRatingSubmit}
          className="w-full py-6 bg-rideroot-primary hover:bg-rideroot-primary/90 text-white rounded-xl"
        >
          Submit Rating
        </Button>
      </motion.div>
    );
  };

  const renderTipStep = () => {
    const tipOptions = [
      { amount: 0, label: "No Tip" },
      { amount: 2, label: "$2" },
      { amount: 5, label: "$5" },
      { amount: 10, label: "$10" },
      { amount: -1, label: "Custom" }, // Custom tip option
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-24 h-24 bg-rideroot-primary/20 rounded-full flex items-center justify-center">
            <img
              src={`https://ui-avatars.com/api/?name=${currentRide.driver.name}&background=random`}
              alt={currentRide.driver.name}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-1">
            Wow 5 Stars!
          </h2>
          <p className="text-gray-400">
            Would you like to add a tip to make your driver's day?
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl mb-8">
          <h3 className="text-lg font-semibold mb-4">Add a tip for {currentRide.driver.name}</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {tipOptions.map((option) => (
              <button
                key={option.amount}
                onClick={() => {
                  if (option.amount === -1) {
                    setShowCustomTip(true);
                  } else {
                    setTipAmount(option.amount);
                    setShowCustomTip(false);
                  }
                }}
                className={cn(
                  "py-4 rounded-xl transition-all",
                  (tipAmount === option.amount || (showCustomTip && option.amount === -1))
                    ? "bg-rideroot-primary text-white"
                    : "bg-gray-700 text-white"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          {showCustomTip && (
            <div className="mt-3 mb-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="text"
                  value={customTip}
                  onChange={handleCustomTipChange}
                  placeholder="0.00"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-8 text-white"
                  autoFocus
                />
              </div>
            </div>
          )}
          
          <div className="mt-4 mb-2">
            <div className="flex justify-between mb-2">
              <span>Ride Total:</span>
              <span>${currentRide.fare.toFixed(2)}</span>
            </div>
            {tipAmount > 0 && (
              <div className="flex justify-between mb-2">
                <span>Tip:</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${(currentRide.fare + tipAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={handleTipSubmit}
            className="py-6 bg-transparent border border-gray-700 text-white hover:bg-gray-800"
          >
            Skip
          </Button>
          <Button
            onClick={handleTipSubmit}
            className="py-6 bg-rideroot-primary hover:bg-rideroot-primary/90 text-white"
          >
            {tipAmount > 0 ? `Pay $${(currentRide.fare + tipAmount).toFixed(2)}` : 'Continue'}
          </Button>
        </div>
      </motion.div>
    );
  };

  const renderFeedbackStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold mb-1">
            How was your trip?
          </h2>
          <p className="text-gray-400">
            Your feedback helps improve the experience
          </p>
        </div>

        <div className="mb-8">
          <Textarea
            placeholder="How was your ride? (optional)"
            className="bg-gray-800 border-gray-700 text-white resize-none w-full min-h-[120px] p-4 rounded-xl"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSubmitFeedback}
          className="w-full py-6 mb-4 bg-rideroot-primary hover:bg-rideroot-primary/90 text-white rounded-xl"
        >
          {tipAmount > 0 ? `Submit & Pay $${(currentRide.fare + tipAmount).toFixed(2)}` : 'Submit Feedback'}
        </Button>
      </motion.div>
    );
  };

  const renderSuccessStep = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full animate-fade-in"
      >
        <div className="bg-rideroot-primary rounded-full p-6 mb-6">
          <Check className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Thanks for your feedback!</h2>
        <p className="text-gray-400 text-center mb-6">
          See you on your next ride
        </p>
        
        <Button
          onClick={() => navigate("/home")}
          className="w-full py-6 bg-rideroot-primary hover:bg-rideroot-primary/90 text-white rounded-xl"
        >
          Done
        </Button>
      </motion.div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case "rating":
        return renderRatingStep();
      case "tip":
        return renderTipStep();
      case "feedback":
        return renderFeedbackStep();
      case "success":
        return renderSuccessStep();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <RootHeader title={
        step === "rating" ? "Rate Your Ride" : 
        step === "tip" ? "Add a Tip" : 
        step === "feedback" ? "Feedback" : 
        "Ride Complete"
      } />

      <div className="flex-1 p-6">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default RideCompletion;
