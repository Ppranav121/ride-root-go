
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ChevronRight, Filter, MessageSquare } from "lucide-react";
import RootHeader from "@/components/RootHeader";
import { Button } from "@/components/ui/button";
import DriverBottomNav from "@/components/DriverBottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Rating {
  id: string;
  rider: string;
  date: string;
  rating: number;
  comment: string;
  tags: string[];
}

const DriverRatings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  
  // Sample ratings data
  const ratings: Rating[] = [
    {
      id: "r1",
      rider: "Alex G.",
      date: "Apr 6, 2025",
      rating: 5,
      comment: "Perfect ride, very professional driver!",
      tags: ["Clean Car", "Professional", "Great Conversation"]
    },
    {
      id: "r2",
      rider: "Sam T.",
      date: "Apr 4, 2025",
      rating: 5,
      comment: "Excellent service and very helpful with my luggage",
      tags: ["Helpful", "On Time", "Safe Driving"]
    },
    {
      id: "r3",
      rider: "Riley P.",
      date: "Apr 3, 2025",
      rating: 4,
      comment: "Good ride overall, but arrived a bit late",
      tags: ["Good Music", "Safe Driving"]
    },
    {
      id: "r4",
      rider: "Jamie R.",
      date: "Apr 1, 2025",
      rating: 5,
      comment: "Outstanding service, will request again!",
      tags: ["Professional", "Clean Car"]
    },
    {
      id: "r5",
      rider: "Taylor M.",
      date: "Mar 30, 2025",
      rating: 3,
      comment: "Ride was okay, but driver seemed distracted",
      tags: ["Safe Driving"]
    },
  ];
  
  const filteredRatings = activeTab === "all" 
    ? ratings 
    : ratings.filter(rating => {
        if (activeTab === "5star") return rating.rating === 5;
        if (activeTab === "4star") return rating.rating === 4;
        if (activeTab === "3star") return rating.rating === 3;
        return rating.rating <= 2;
      });
  
  const averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
  const starCounts = {
    "5": ratings.filter(r => r.rating === 5).length,
    "4": ratings.filter(r => r.rating === 4).length,
    "3": ratings.filter(r => r.rating === 3).length,
    "2": ratings.filter(r => r.rating === 2).length,
    "1": ratings.filter(r => r.rating === 1).length,
  };
  
  return (
    <div className="min-h-screen bg-rideroot-lightGrey pb-16">
      <RootHeader title="Your Ratings" />
      
      <div className="p-4">
        {/* Rating Summary Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Overall Rating</h2>
            <span className="text-xs text-gray-500">Last 30 days</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-rideroot-primary">{averageRating.toFixed(1)}</div>
              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={14} 
                    className={star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1">{ratings.length} ratings</div>
            </div>
            
            <div className="w-3/5">
              {/* Star breakdown bars */}
              {["5", "4", "3", "2", "1"].map((star) => (
                <div key={star} className="flex items-center mb-1">
                  <span className="text-xs w-4 mr-2">{star}</span>
                  <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(starCounts[star as keyof typeof starCounts] / ratings.length) * 100}%` }}
                      transition={{ duration: 0.5, delay: Number(star) * 0.1 }}
                      className={`h-full rounded-full ${
                        star === "5" || star === "4" ? "bg-green-500" : 
                        star === "3" ? "bg-yellow-400" : "bg-red-500"
                      }`}
                    />
                  </div>
                  <span className="text-xs w-6 ml-2 text-right">
                    {starCounts[star as keyof typeof starCounts]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Filter section */}
        <div className="mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-3">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-white">All</TabsTrigger>
                <TabsTrigger value="5star" className="data-[state=active]:bg-white">5 ★</TabsTrigger>
                <TabsTrigger value="4star" className="data-[state=active]:bg-white">4 ★</TabsTrigger>
                <TabsTrigger value="3star" className="data-[state=active]:bg-white">3 ★</TabsTrigger>
                <TabsTrigger value="below" className="data-[state=active]:bg-white">Below</TabsTrigger>
              </TabsList>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center text-xs"
                onClick={() => setShowFilter(!showFilter)}
              >
                <Filter size={14} className="mr-1" />
                Filter
              </Button>
            </div>

            {showFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-white p-3 rounded-lg shadow-sm mb-3"
              >
                <div className="flex flex-wrap gap-2">
                  {["All Time", "This Month", "Last 7 Days", "Clean Car", "Safe Driving", "Professional"].map((filter) => (
                    <Button 
                      key={filter} 
                      variant="outline" 
                      size="sm" 
                      className="text-xs rounded-full"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Rating cards */}
            <TabsContent value={activeTab}>
              <div className="space-y-3">
                {filteredRatings.length > 0 ? (
                  filteredRatings.map((rating) => (
                    <RatingCard key={rating.id} rating={rating} />
                  ))
                ) : (
                  <div className="bg-white rounded-xl p-6 text-center">
                    <p className="text-gray-500">No ratings in this category yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Improvement Tips */}
        <motion.div
          className="bg-white rounded-xl shadow-sm p-4 mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-3">Tips to Improve Ratings</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                <Star size={14} className="text-blue-600" />
              </div>
              <span>Keep your vehicle clean and well-maintained</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                <Star size={14} className="text-blue-600" />
              </div>
              <span>Confirm pickup and dropoff locations with riders</span>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                <Star size={14} className="text-blue-600" />
              </div>
              <span>Be professional and respectful with all passengers</span>
            </li>
          </ul>
        </motion.div>
      </div>
      
      <DriverBottomNav />
    </div>
  );
};

interface RatingCardProps {
  rating: Rating;
}

const RatingCard: React.FC<RatingCardProps> = ({ rating }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              {rating.rider.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium text-sm">{rating.rider}</h3>
              <span className="text-xs text-gray-500">{rating.date}</span>
            </div>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={(i + 1) <= rating.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
        </div>
        
        {rating.comment && (
          <p className="text-sm text-gray-600 mb-2">{rating.comment}</p>
        )}
        
        {rating.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {rating.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <Button 
        variant="ghost" 
        className="w-full flex items-center justify-center py-1 text-xs text-rideroot-primary border-t border-gray-100"
      >
        <MessageSquare size={12} className="mr-1" />
        Respond
        <ChevronRight size={12} className="ml-1" />
      </Button>
    </motion.div>
  );
};

export default DriverRatings;
