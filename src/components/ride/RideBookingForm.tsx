
import React, { useMemo, memo } from "react";
import { useApp } from "@/contexts/AppContext";
import { PaymentMethod } from "@/components/ride/PaymentMethodSelector";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RideOptionSelector from "@/components/RideOptionSelector";
import PaymentMethodSelector from "@/components/ride/PaymentMethodSelector";
import FareEstimate from "@/components/ride/FareEstimate";
import { motion } from "framer-motion";

interface RideBookingFormProps {
  pickupLocation: string;
  dropoffLocation: string;
  distance?: number;
}

const RideBookingForm: React.FC<RideBookingFormProps> = ({
  pickupLocation,
  dropoffLocation,
  distance = 6, // Default value from original code
}) => {
  const navigate = useNavigate();
  const { bookRide, rideOption, capacityOption, user, calculateFare } = useApp();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<PaymentMethod | null>({
    id: "card-1",
    type: "card",
    name: "Personal Visa",
    last4: "4242",
    expiryDate: "12/25",
    isDefault: true
  });

  // Calculate fare once and memoize the value
  const fare = useMemo(() => {
    return calculateFare(distance, rideOption, capacityOption, user?.isSubscribed || false);
  }, [distance, rideOption, capacityOption, user?.isSubscribed, calculateFare]);

  const handleBookRide = async () => {
    if (!dropoffLocation) {
      toast.error("Missing destination", {
        description: "Please enter a destination",
      });
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Missing payment method", {
        description: "Please select a payment method",
      });
      return;
    }

    setIsLoading(true);
    try {
      await bookRide(pickupLocation, dropoffLocation, selectedPaymentMethod.id);
      navigate("/ride-confirmation");
    } catch (error) {
      console.error("Error booking ride:", error);
      toast.error("Failed to book ride", {
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the button should be disabled
  const isButtonDisabled = isLoading || !dropoffLocation || !selectedPaymentMethod;

  return (
    <div className="px-6 pb-8">
      <div className="mb-5">
        <RideOptionSelector />
      </div>

      <div className="mb-5">
        <PaymentMethodSelector 
          selectedPaymentMethod={selectedPaymentMethod}
          onSelectPaymentMethod={setSelectedPaymentMethod}
        />
      </div>

      <FareEstimate 
        distance={distance}
        rideOption={rideOption}
        capacityOption={capacityOption}
        fare={fare}
        isSubscribed={user?.isSubscribed || false}
      />

      <motion.button
        onClick={handleBookRide}
        className={`bg-gradient-to-r from-rideroot-primary to-rideroot-secondary w-full h-[56px] flex items-center justify-center rounded-xl text-white font-bold font-heading shadow-md ${isLoading ? "opacity-70" : ""}`}
        disabled={isButtonDisabled}
        whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isLoading ? "Finding your ride..." : "Book Ride"}
      </motion.button>

      {!user?.isSubscribed && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-center mb-6"
        >
          <p className="text-xs text-rideroot-darkGrey">
            Save 10% on rides with <span className="text-rideroot-primary font-medium">RideRoot Premium</span>
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default memo(RideBookingForm);
