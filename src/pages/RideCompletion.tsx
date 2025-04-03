
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ThumbsUp, DollarSign } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import RootHeader from "@/components/RootHeader";

const RideCompletion: React.FC = () => {
  const navigate = useNavigate();
  const { currentRide, setCurrentRide } = useApp();
  const [rating, setRating] = useState(5);
  const [tipAmount, setTipAmount] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!currentRide || !currentRide.driver) {
    // Redirect if there's no current ride
    React.useEffect(() => {
      navigate("/home");
    }, [navigate]);
    return null;
  }

  const handleSubmitFeedback = () => {
    // Update the ride with rating and tip
    setCurrentRide({
      ...currentRide,
      status: "completed",
      // Add rating and tip information
    });

    setFeedbackSubmitted(true);

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
        className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-rideroot-mediumGrey"}`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <RootHeader title="Rate Your Ride" />

      <div className="flex-1 p-6">
        {feedbackSubmitted ? (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-rideroot-text mb-2">
              Thank You!
            </h2>
            <p className="text-rideroot-darkGrey">
              Your feedback helps improve our service.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-rideroot-text mb-2">
                How was your ride?
              </h2>
              <p className="text-rideroot-darkGrey">
                Your feedback helps {currentRide.driver.name} improve.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-rideroot-lightGrey rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-rideroot-darkGrey">
                    {currentRide.driver.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-rideroot-text">
                    {currentRide.driver.name}
                  </h3>
                  <p className="text-rideroot-darkGrey">
                    {currentRide.driver.vehicleType}
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-2 mb-6">
                {renderStars()}
              </div>

              <textarea
                placeholder="Add a comment (optional)"
                className="input-field w-full min-h-[100px] resize-none mb-4"
              ></textarea>

              <div className="bg-rideroot-lightGrey p-4 rounded-xl mb-4">
                <h4 className="font-medium text-rideroot-text mb-2">Add a tip?</h4>
                <div className="flex space-x-3">
                  {[0, 2, 5, 10].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTipAmount(amount)}
                      className={`flex-1 py-2 px-3 rounded-lg ${
                        tipAmount === amount
                          ? "bg-rideroot-primary text-white"
                          : "bg-white border border-rideroot-mediumGrey"
                      }`}
                    >
                      {amount === 0 ? "No tip" : `$${amount}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Eco-Bonus Tracker - For subscribers only (would be conditional in a real app) */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-green-700">Eco-Bonus Tracker</h4>
                <span className="text-sm text-green-600">3/5 rides</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                Complete 2 more eco-rides to earn a $1 credit!
              </p>
            </div>

            <button
              onClick={handleSubmitFeedback}
              className="btn-primary w-full mb-4"
            >
              Submit Feedback
            </button>

            <button
              onClick={() => navigate("/home")}
              className="text-rideroot-primary text-center w-full"
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
