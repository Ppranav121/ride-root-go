
import React from "react";
import { motion } from "framer-motion";
import { 
  Star, MessageSquare, ThumbsUp, Award, 
  ThumbsDown, ChevronRight, Filter 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import RootHeader from "@/components/RootHeader";
import DriverBottomNav from "@/components/DriverBottomNav";

// Sample data
const ratingsData = {
  overall: 4.9,
  total: 243,
  breakdown: {
    "5": 215,
    "4": 20,
    "3": 5,
    "2": 2,
    "1": 1,
  }
};

const recentFeedback = [
  {
    id: "feedback-1",
    rider: "Sarah M.",
    rating: 5,
    comment: "Very professional driver. The car was clean and the ride was smooth. Would ride again!",
    date: "Yesterday",
    tags: ["Professional", "Clean Car"],
    avatarUrl: "",
  },
  {
    id: "feedback-2",
    rider: "John T.",
    rating: 5,
    comment: "Great conversation and excellent navigation through traffic. Made it to my appointment on time!",
    date: "3 days ago",
    tags: ["Good Navigation", "Friendly"],
    avatarUrl: "",
  },
  {
    id: "feedback-3",
    rider: "Mia K.",
    rating: 4,
    comment: "Good driver, but the car was a bit warm. Overall a pleasant experience.",
    date: "Last week",
    tags: ["Good Driver"],
    avatarUrl: "",
  },
  {
    id: "feedback-4",
    rider: "David W.",
    rating: 5,
    comment: "Excellent ride! Driver was very courteous and professional.",
    date: "2 weeks ago",
    tags: ["Courteous", "Professional"],
    avatarUrl: "",
  },
];

const feedbackCategories = [
  {
    name: "Communication",
    positive: 92,
    negative: 8,
  },
  {
    name: "Driving",
    positive: 95,
    negative: 5,
  },
  {
    name: "Cleanliness",
    positive: 90,
    negative: 10,
  },
  {
    name: "Pickup",
    positive: 88,
    negative: 12,
  },
  {
    name: "Navigation",
    positive: 85,
    negative: 15,
  },
];

const badges = [
  {
    name: "Excellent Service",
    count: 45,
    icon: Award,
  },
  {
    name: "Great Conversation",
    count: 38,
    icon: MessageSquare,
  },
  {
    name: "Punctual Pickup",
    count: 56,
    icon: Star,
  },
];

const DriverRatings: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <RootHeader title="Ratings & Feedback" showBackButton />
      
      <div className="flex-1 overflow-auto p-4 pb-20 space-y-4">
        {/* Rating Summary Card */}
        <Card className="border-none shadow-md bg-gradient-to-r from-rideroot-primary to-rideroot-secondary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <h2 className="text-3xl font-bold">{ratingsData.overall}</h2>
                <div className="flex items-center mt-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < Math.floor(ratingsData.overall) ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'} mr-0.5`} 
                    />
                  ))}
                  <span className="text-sm ml-1">
                    ({ratingsData.total} ratings)
                  </span>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-xs font-medium text-white/80">DRIVER RANKING</p>
                <p className="text-xl font-bold">TOP 5%</p>
              </div>
            </div>
            
            <Separator className="bg-white/20 mb-4" />
            
            <div className="grid grid-cols-5 gap-x-1">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex flex-col items-center">
                  <div className="flex items-center mb-1">
                    <Star size={10} className="text-yellow-300 fill-yellow-300 mr-0.5" />
                    <span className="text-xs">{rating}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5 mb-1">
                    <div 
                      className="bg-white h-1.5 rounded-full" 
                      style={{ 
                        width: `${(ratingsData.breakdown[rating as keyof typeof ratingsData.breakdown] / ratingsData.total) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-xs">
                    {ratingsData.breakdown[rating as keyof typeof ratingsData.breakdown]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs Navigation */}
        <Tabs defaultValue="feedback">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-4 mt-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing recent feedback
              </p>
              <Button variant="outline" size="sm">
                <Filter size={14} className="mr-1" />
                Filter
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentFeedback.map((feedback) => (
                <Card key={feedback.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={feedback.avatarUrl} alt={feedback.rider} />
                        <AvatarFallback className="bg-rideroot-primary/10 text-rideroot-primary">
                          {feedback.rider.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-sm">{feedback.rider}</h3>
                          <span className="text-xs text-gray-500">{feedback.date}</span>
                        </div>
                        
                        <div className="flex mb-2">
                          {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={`${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} mr-0.5`} 
                            />
                          ))}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{feedback.comment}</p>
                        
                        <div className="flex flex-wrap gap-1">
                          {feedback.tags.map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="bg-blue-50 text-blue-600 border-blue-100 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full">
                View More Feedback
              </Button>
            </div>
          </TabsContent>
          
          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-4 mt-2">
            <p className="text-sm text-gray-500">
              Badges earned from rider feedback
            </p>
            
            <div className="space-y-4">
              {badges.map((badge, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary p-3 rounded-full mr-4">
                        <badge.icon size={20} className="text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium">{badge.name}</h3>
                        <p className="text-sm text-gray-500">
                          Received {badge.count} times
                        </p>
                      </div>
                      
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                      <Award size={30} className="text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Earn More Badges</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Provide excellent service to earn badges that highlight your strengths
                    </p>
                    <Button>View All Badges</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4 mt-2">
            <p className="text-sm text-gray-500">
              Detailed feedback categories
            </p>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Feedback Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackCategories.map((category, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-sm font-medium text-blue-600">{category.positive}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full flex overflow-hidden">
                        <div 
                          className="h-full bg-green-500"
                          style={{ width: `${category.positive}%` }}
                        ></div>
                        <div 
                          className="h-full bg-red-400"
                          style={{ width: `${category.negative}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                        <div className="flex items-center">
                          <ThumbsUp size={12} className="text-green-500 mr-1" />
                          <span>{category.positive}%</span>
                        </div>
                        <div className="flex items-center">
                          <ThumbsDown size={12} className="text-red-400 mr-1" />
                          <span>{category.negative}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Rating History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Last 100 rides</p>
                    <div className="flex items-center mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="text-yellow-400 fill-yellow-400 mr-0.5" 
                        />
                      ))}
                      <span className="ml-1 font-medium">4.92</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last 500 rides</p>
                    <div className="flex items-center justify-end mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className="text-yellow-400 fill-yellow-400 mr-0.5" 
                        />
                      ))}
                      <span className="ml-1 font-medium">4.89</span>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  className="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1 }}
                />
                
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>1 month ago</span>
                  <span>Current</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Want to improve your ratings?</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Check out our tips for providing five-star experiences to your riders
                  </p>
                  <Button variant="outline">View Tips</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <DriverBottomNav />
    </div>
  );
};

export default DriverRatings;
