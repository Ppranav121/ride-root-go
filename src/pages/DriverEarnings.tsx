
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, ChevronDown, ChevronUp, DollarSign, LineChart, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RootHeader from "@/components/RootHeader";
import DriverBottomNav from "@/components/DriverBottomNav";

// Enhanced weekly bar chart with animated bars based on actual earnings data
const WeeklyBarChart = ({ values = [] }: { values: number[] }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const max = Math.max(...values);
  
  return (
    <div className="flex h-[160px] items-end space-x-2">
      {days.map((day, i) => (
        <div key={day} className="flex flex-col items-center flex-1">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${(values[i] / (max || 1)) * 100}%` }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="w-full bg-gradient-to-t from-rideroot-primary to-blue-400 rounded-t-md hover:from-blue-500 hover:to-indigo-400 transition-colors"
          />
          <div className="text-xs mt-2 text-rideroot-darkGrey">{day}</div>
          <div className="text-xs font-medium">${values[i]}</div>
        </div>
      ))}
    </div>
  );
};

interface EarningsProps {
  amount: number;
  rides: number;
  onlineHours: number;
  date: string;
  isPrime: boolean;
  weeklyTrend?: number[];
  rideDetails: {
    id: string;
    time: string;
    pickup: string;
    dropoff: string;
    fare: number;
    platformFee: number;
    peakBonus?: number;
    isCompleted: boolean;
  }[];
}

const DriverEarnings: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("weekly");
  const [expandedRide, setExpandedRide] = useState<string | null>(null);

  // Simulated earnings data with weekly trend
  const weeklyEarnings: EarningsProps = {
    amount: 680.50,
    rides: 32,
    onlineHours: 24,
    date: "Apr 1 - Apr 7, 2025",
    isPrime: true,
    weeklyTrend: [45, 65, 35, 50, 75, 90, 60], // Daily earnings amounts
    rideDetails: [
      {
        id: "ride-1",
        time: "Apr 7, 2:30 PM",
        pickup: "Financial District",
        dropoff: "Marina District",
        fare: 16.50,
        platformFee: 1.00,
        peakBonus: 0.50,
        isCompleted: true
      },
      {
        id: "ride-2",
        time: "Apr 7, 12:05 PM",
        pickup: "Union Square",
        dropoff: "Golden Gate Park",
        fare: 21.50,
        platformFee: 1.00,
        isCompleted: true
      },
      {
        id: "ride-3",
        time: "Apr 6, 5:45 PM",
        pickup: "Fisherman's Wharf",
        dropoff: "Mission District",
        fare: 18.75,
        platformFee: 1.00,
        peakBonus: 0.50,
        isCompleted: true
      },
      {
        id: "ride-4",
        time: "Apr 6, 3:20 PM",
        pickup: "Nob Hill",
        dropoff: "SOMA",
        fare: 12.25,
        platformFee: 1.00,
        isCompleted: true
      },
      {
        id: "ride-5",
        time: "Apr 5, 7:10 PM",
        pickup: "Hayes Valley",
        dropoff: "North Beach",
        fare: 14.00,
        platformFee: 1.00,
        peakBonus: 0.50,
        isCompleted: true
      },
    ]
  };

  const dailyEarnings: EarningsProps = {
    amount: 145.75,
    rides: 7,
    onlineHours: 6,
    date: "Today, Apr 7, 2025",
    isPrime: true,
    weeklyTrend: [0, 0, 0, 0, 0, 0, 145.75], // Today's earnings only
    rideDetails: [
      {
        id: "ride-1",
        time: "2:30 PM",
        pickup: "Financial District",
        dropoff: "Marina District",
        fare: 16.50,
        platformFee: 1.00,
        peakBonus: 0.50,
        isCompleted: true
      },
      {
        id: "ride-2",
        time: "12:05 PM",
        pickup: "Union Square",
        dropoff: "Golden Gate Park",
        fare: 21.50,
        platformFee: 1.00,
        isCompleted: true
      },
      {
        id: "ride-3",
        time: "10:45 AM",
        pickup: "Embarcadero",
        dropoff: "Sunset District",
        fare: 19.75,
        platformFee: 1.00,
        peakBonus: 0.50,
        isCompleted: true
      }
    ]
  };

  const handleExpandRide = (rideId: string) => {
    if (expandedRide === rideId) {
      setExpandedRide(null);
    } else {
      setExpandedRide(rideId);
    }
  };

  const currentEarnings = selectedTab === "weekly" ? weeklyEarnings : dailyEarnings;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-rideroot-lightGrey">
      <RootHeader title="Earnings" />
      
      <Tabs defaultValue="weekly" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger 
              value="daily" 
              onClick={() => setSelectedTab("daily")}
              className="data-[state=active]:bg-rideroot-primary data-[state=active]:text-white"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger 
              value="weekly" 
              onClick={() => setSelectedTab("weekly")}
              className="data-[state=active]:bg-rideroot-primary data-[state=active]:text-white"
            >
              Weekly
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="daily" className="flex-1 p-4 pb-24">
          <EarningsContent 
            earnings={dailyEarnings} 
            expandedRide={expandedRide} 
            onExpandRide={handleExpandRide} 
            isWeekly={false}
          />
        </TabsContent>
        
        <TabsContent value="weekly" className="flex-1 p-4 pb-24">
          <EarningsContent 
            earnings={weeklyEarnings} 
            expandedRide={expandedRide} 
            onExpandRide={handleExpandRide} 
            isWeekly={true}
            showSubscription 
          />
        </TabsContent>
      </Tabs>
      
      <div className="h-16"></div> {/* Spacer for bottom nav */}
      <DriverBottomNav />
    </div>
  );
};

interface EarningsContentProps {
  earnings: EarningsProps;
  expandedRide: string | null;
  onExpandRide: (id: string) => void;
  isWeekly: boolean;
  showSubscription?: boolean;
}

const EarningsContent: React.FC<EarningsContentProps> = ({ 
  earnings, 
  expandedRide, 
  onExpandRide,
  isWeekly,
  showSubscription = false 
}) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{earnings.date}</h2>
          <Button variant="outline" size="sm" className="text-xs">
            <Calendar size={14} className="mr-1" />
            Change
          </Button>
        </div>
        
        <div className="bg-gradient-to-r from-rideroot-primary/10 to-rideroot-secondary/10 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-rideroot-darkGrey">Total Earnings</span>
            <span className="text-xl font-bold text-rideroot-primary">
              ${earnings.amount.toFixed(2)}
            </span>
          </div>
          
          {showSubscription && earnings.isPrime && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-rideroot-darkGrey">After subscription fee</span>
              <span className="font-medium">${(earnings.amount - 19.99).toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-1">
              <Car size={16} className="text-rideroot-primary mr-1" />
              <span className="text-sm text-rideroot-darkGrey">Rides</span>
            </div>
            <p className="font-bold">{earnings.rides}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-1">
              <Clock size={16} className="text-rideroot-primary mr-1" />
              <span className="text-sm text-rideroot-darkGrey">Online Time</span>
            </div>
            <p className="font-bold">{earnings.onlineHours} hrs</p>
          </div>
        </div>
        
        {/* Enhanced weekly trend chart */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">
            {isWeekly ? "Weekly Trend" : "Daily Breakdown"}
          </h3>
          <WeeklyBarChart values={earnings.weeklyTrend || [0, 0, 0, 0, 0, 0, 0]} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-4">
        <h3 className="text-md font-medium mb-3">Ride Details</h3>
        
        <div className="space-y-3">
          {earnings.rideDetails.map((ride) => (
            <motion.div
              key={ride.id}
              className={`border border-gray-100 rounded-lg overflow-hidden transition-all ${expandedRide === ride.id ? 'shadow-md' : ''}`}
            >
              <div 
                className="p-3 bg-white flex justify-between items-center cursor-pointer"
                onClick={() => onExpandRide(ride.id)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{ride.time}</span>
                  <span className="text-sm text-rideroot-darkGrey">
                    {ride.pickup} → {ride.dropoff}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-rideroot-primary mr-2">${ride.fare.toFixed(2)}</span>
                  {expandedRide === ride.id ? (
                    <ChevronUp size={18} className="text-rideroot-darkGrey" />
                  ) : (
                    <ChevronDown size={18} className="text-rideroot-darkGrey" />
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {expandedRide === ride.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-gray-50 border-t border-gray-100"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-rideroot-darkGrey">Base fare</span>
                        <span className="text-sm font-medium">
                          ${(ride.fare - (ride.peakBonus || 0)).toFixed(2)}
                        </span>
                      </div>
                      
                      {ride.peakBonus && (
                        <div className="flex justify-between">
                          <span className="text-sm text-green-600">Peak bonus</span>
                          <span className="text-sm font-medium text-green-600">
                            +${ride.peakBonus.toFixed(2)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-red-500">Platform fee</span>
                        <span className="text-sm font-medium text-red-500">
                          -${ride.platformFee.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-200 flex justify-between">
                        <span className="font-medium">Your earnings</span>
                        <span className="font-bold text-rideroot-primary">
                          ${(ride.fare - ride.platformFee).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DriverEarnings;
