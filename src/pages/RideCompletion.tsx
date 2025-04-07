
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const RideCompletion: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  const [rating, setRating] = useState(5);
  const [tipAmount, setTipAmount] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Only redirect if there's no current ride
    if (!currentRide || !currentRide.driver) {
      console.log("No current ride data, redirecting to home");
      navigate("/home");
    }
  }, [currentRide, navigate]);

  if (!currentRide || !currentRide.driver) {
    return null;
  }

  const handleSubmitFeedback = () => {
    // Update the ride with rating and tip
    setCurrentRide({
      ...currentRide,
      status: "completed",
      rating,
      tipAmount,
      comment
    });

    setFeedbackSubmitted(true);
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
        className={`text-4xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <RootHeader title="Rate Your Ride" />

      <div className="flex-1 p-6">
        {feedbackSubmitted ? (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in">
            <div className="bg-green-500 rounded-full p-4 mb-6">
              <Check className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thanks for your feedback!</h2>
            <p className="text-gray-400 text-center">
              See you on your next ride
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${currentRide.driver.name}&background=random`}
                  alt={currentRide.driver.name}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                How was the driver?
              </h2>
              <p className="text-gray-400">
                Rate {currentRide.driver.name}
              </p>
            </div>

            <div className="flex justify-center space-x-2 mb-8">
              {renderStars()}
            </div>

            <div className="mb-8">
              <Textarea
                placeholder="How was your ride?"
                className="bg-gray-800 border-gray-700 text-white resize-none w-full min-h-[100px] p-4 rounded-xl"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="bg-gray-800 p-4 rounded-xl mb-8">
              <h3 className="text-lg font-semibold mb-4">Tip your driver</h3>
              <div className="grid grid-cols-4 gap-3">
                {[0, 2, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTipAmount(amount)}
                    className={`py-3 rounded-lg ${
                      tipAmount === amount
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-white"
                    } ${amount === 0 ? "col-span-1" : ""}`}
                  >
                    {amount === 0 ? "Skip" : `$${amount}`}
                  </button>
                ))}
              </div>
              
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

            <Button
              onClick={handleSubmitFeedback}
              className="w-full py-6 mb-4 bg-green-500 hover:bg-green-600 text-white rounded-xl"
            >
              {tipAmount > 0 ? `Pay $${(currentRide.fare + tipAmount).toFixed(2)}` : 'Submit'}
            </Button>

            <button
              onClick={() => navigate("/home")}
              className="w-full text-center text-gray-400"
            >
              Skip
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RideCompletion;
