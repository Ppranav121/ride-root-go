
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Wallet, PlusCircle, ChevronRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PaymentMethod = {
  id: string;
  type: "card" | "wallet" | "other";
  name: string;
  last4?: string;
  expiryDate?: string;
  isDefault?: boolean;
};

interface PaymentMethodSelectorProps {
  selectedPaymentMethod: PaymentMethod | null;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedPaymentMethod,
  onSelectPaymentMethod,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Mock payment methods - in a real app, these would come from a backend
  const paymentMethods: PaymentMethod[] = [
    { 
      id: "card-1", 
      type: "card", 
      name: "Personal Visa", 
      last4: "4242",
      expiryDate: "12/25",
      isDefault: true
    },
    { 
      id: "card-2", 
      type: "card", 
      name: "Work Mastercard", 
      last4: "8888",
      expiryDate: "05/27"
    },
    { 
      id: "wallet-1", 
      type: "wallet", 
      name: "RideRoot Balance", 
    },
  ];

  const handleSelectPayment = (method: PaymentMethod) => {
    onSelectPaymentMethod(method);
    setShowDropdown(false);
  };

  const addNewPaymentMethod = () => {
    // In a real app, this would open a modal to add a new payment method
    console.log("Add new payment method");
  };

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium text-rideroot-darkGrey">Payment Method</div>

      <RadioGroup 
        value={selectedPaymentMethod?.id || ""}
        className="space-y-3"
      >
        {/* Current selected payment method card */}
        <div className="relative">
          <Card className={cn(
            "border-2 transition-all duration-200",
            selectedPaymentMethod ? "border-rideroot-primary" : "border-rideroot-mediumGrey"
          )}>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-rideroot-secondary/10 flex items-center justify-center">
                    {selectedPaymentMethod?.type === "wallet" ? (
                      <Wallet size={20} className="text-rideroot-secondary" />
                    ) : (
                      <CreditCard size={20} className="text-rideroot-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-rideroot-text">
                      {selectedPaymentMethod?.name || "Select payment"}
                    </p>
                    {selectedPaymentMethod?.last4 && (
                      <p className="text-xs text-rideroot-darkGrey">
                        •••• {selectedPaymentMethod.last4}
                        {selectedPaymentMethod.expiryDate ? 
                          ` - Exp: ${selectedPaymentMethod.expiryDate}` : ''}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenu open={showDropdown} onOpenChange={setShowDropdown}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="rounded-full h-8 w-8 p-0"
                    >
                      <ChevronRight size={16} className="text-rideroot-darkGrey" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {paymentMethods.map((method) => (
                      <DropdownMenuItem 
                        key={method.id}
                        className="py-2 cursor-pointer"
                        onClick={() => handleSelectPayment(method)}
                      >
                        <div className="flex items-center w-full">
                          <div className="w-8 h-8 rounded-full bg-rideroot-lightGrey flex items-center justify-center mr-2">
                            {method.type === "wallet" ? (
                              <Wallet size={16} className="text-rideroot-secondary" />
                            ) : (
                              <CreditCard size={16} className="text-rideroot-primary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium flex items-center">
                              {method.name}
                              {method.isDefault && (
                                <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-rideroot-primary/10 text-rideroot-primary">
                                  Default
                                </span>
                              )}
                            </p>
                            {method.last4 && (
                              <p className="text-xs text-rideroot-darkGrey">
                                •••• {method.last4}
                              </p>
                            )}
                          </div>
                          {selectedPaymentMethod?.id === method.id && (
                            <Check size={16} className="text-rideroot-primary ml-2" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem 
                      className="py-2 text-rideroot-primary cursor-pointer"
                      onClick={addNewPaymentMethod}
                    >
                      <PlusCircle size={16} className="mr-2" />
                      <span>Add new payment method</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
