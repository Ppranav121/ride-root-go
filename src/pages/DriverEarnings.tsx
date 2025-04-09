
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, DollarSign, Calendar, ChevronDown, 
  TrendingUp, Clock, Award, Filter, Download, 
  ChevronRight, ChevronLeft, CircleDollarSign 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import RootHeader from "@/components/RootHeader";
import DriverBottomNav from "@/components/DriverBottomNav";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const earningsData = [
  { date: "Mon", earnings: 85, rides: 7 },
  { date: "Tue", earnings: 110, rides: 9 },
  { date: "Wed", earnings: 95, rides: 8 },
  { date: "Thu", earnings: 135, rides: 11 },
  { date: "Fri", earnings: 170, rides: 13 },
  { date: "Sat", earnings: 190, rides: 15 },
  { date: "Sun", earnings: 150, rides: 12 },
];

const timeframeOptions = ["This Week", "Last Week", "This Month", "Last Month", "Custom"];

const rideHistory = [
  {
    id: "ride-1",
    date: "Today, 4:30 PM",
    pickup: "Downtown SF",
    dropoff: "Mission District",
    earnings: 18.75,
    isPeakBonus: true,
    isTipped: true,
    tipAmount: 5.00,
  },
  {
    id: "ride-2",
    date: "Today, 2:15 PM",
    pickup: "SFO Airport",
    dropoff: "Financial District",
    earnings: 42.50,
    isPeakBonus: false,
    isTipped: true,
    tipAmount: 8.50,
  },
  {
    id: "ride-3",
    date: "Yesterday, 7:45 PM",
    pickup: "Golden Gate Park",
    dropoff: "Fisherman's Wharf",
    earnings: 24.35,
    isPeakBonus: true,
    isTipped: false,
    tipAmount: 0,
  },
  {
    id: "ride-4",
    date: "Yesterday, 5:20 PM",
    pickup: "Sunset District",
    dropoff: "UCSF Medical Center",
    earnings: 15.90,
    isPeakBonus: false,
    isTipped: true,
    tipAmount: 3.00,
  },
  {
    id: "ride-5",
    date: "Feb 12, 3:10 PM",
    pickup: "Oracle Park",
    dropoff: "Russian Hill",
    earnings: 19.25,
    isPeakBonus: true,
    isTipped: true,
    tipAmount: 4.50,
  },
];

const DriverEarnings: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("This Week");
  const [activeTab, setActiveTab] = useState("earnings");
  
  // Calculate summary stats
  const totalEarnings = earningsData.reduce((sum, day) => sum + day.earnings, 0);
  const totalRides = earningsData.reduce((sum, day) => sum + day.rides, 0);
  const averagePerRide = totalEarnings / totalRides;
  const bestDay = [...earningsData].sort((a, b) => b.earnings - a.earnings)[0];
  
  const handleTimeframeChange = (value: string) => {
    setSelectedTimeframe(value);
  };
  
  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <RootHeader title="Earnings Dashboard" showBackButton />
      
      <div className="flex-1 overflow-auto p-4 pb-20 space-y-4">
        {/* Timeframe Selector */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Calendar size={18} className="text-rideroot-darkGrey mr-2" />
            <Select value={selectedTimeframe} onValueChange={handleTimeframeChange}>
              <SelectTrigger className="w-[160px] h-9 text-sm bg-white">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronLeft size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronRight size={16} />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Download size={16} />
            </Button>
          </div>
        </div>
        
        {/* Earnings Summary Card */}
        <Card className="border-none shadow-md bg-gradient-to-r from-rideroot-primary to-rideroot-secondary text-white">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <p className="text-white/80 text-sm">Total Earnings</p>
                <motion.div 
                  className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {selectedTimeframe}
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold mb-1">{formatCurrency(totalEarnings)}</h2>
              <div className="flex items-center text-green-200 text-sm mb-4">
                <TrendingUp size={14} className="mr-1" />
                <span>15% more than last week</span>
              </div>
              
              <Separator className="bg-white/20 mb-4" />
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-white/80 text-xs mb-1">Rides</p>
                  <p className="font-bold">{totalRides}</p>
                </div>
                <div>
                  <p className="text-white/80 text-xs mb-1">Avg/Ride</p>
                  <p className="font-bold">{formatCurrency(averagePerRide)}</p>
                </div>
                <div>
                  <p className="text-white/80 text-xs mb-1">Best Day</p>
                  <p className="font-bold">{bestDay.date}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-4 mt-2">
            {/* Chart Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <BarChart size={16} className="text-rideroot-primary mr-2" />
                  Earnings Overview
                </CardTitle>
                <CardDescription>Daily breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] mt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={earningsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, 'Earnings']}
                        labelStyle={{ color: '#333' }}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Bar 
                        dataKey="earnings" 
                        fill="#4F46E5" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Earnings Breakdown */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <CircleDollarSign size={16} className="text-rideroot-primary mr-2" />
                  Earnings Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Fares</span>
                    <span className="font-medium">{formatCurrency(totalEarnings * 0.75)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tips</span>
                    <span className="font-medium">{formatCurrency(totalEarnings * 0.15)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Peak Hour Bonuses</span>
                    <span className="font-medium">{formatCurrency(totalEarnings * 0.1)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Service Fee</span>
                    <span className="font-medium text-red-500">-{formatCurrency(totalEarnings * 0.25)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Your Earnings</span>
                    <span className="font-bold text-green-600">{formatCurrency(totalEarnings * 0.75)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Daily Goals */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Award size={16} className="text-rideroot-primary mr-2" />
                  Daily Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Earnings Target</span>
                      <span className="text-sm font-medium">{formatCurrency(150)} / {formatCurrency(200)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Rides Completed</span>
                      <span className="text-sm font-medium">{totalRides} / 20</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(totalRides / 20) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 mt-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {rideHistory.length} recent rides
              </p>
              <Button variant="outline" size="sm" className="h-8">
                <Filter size={14} className="mr-1" /> 
                Filter
              </Button>
            </div>
            
            <div className="space-y-3">
              {rideHistory.map((ride) => (
                <Card key={ride.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{ride.date}</h3>
                          <p className="text-xs text-gray-500">
                            {ride.pickup} → {ride.dropoff}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-rideroot-primary">
                            {formatCurrency(ride.earnings)}
                          </p>
                          <div className="flex space-x-1 mt-1">
                            {ride.isPeakBonus && (
                              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                Peak
                              </span>
                            )}
                            {ride.isTipped && (
                              <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                                +{formatCurrency(ride.tipAmount)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">ID: #{ride.id}</span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button variant="outline" className="w-full">
              View All History
            </Button>
          </TabsContent>
          
          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <DollarSign size={24} className="text-rideroot-primary mb-1" />
                    <h3 className="text-sm text-gray-500 mb-1">Avg. Earnings/Hour</h3>
                    <p className="text-xl font-bold">{formatCurrency(32.75)}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center">
                    <Clock size={24} className="text-rideroot-primary mb-1" />
                    <h3 className="text-sm text-gray-500 mb-1">Online Hours</h3>
                    <p className="text-xl font-bold">24.5</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Acceptance Rate</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Completion Rate</span>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Rating</span>
                      <span className="text-sm font-medium">4.9/5.0</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-500">February 2025</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        February <ChevronDown size={14} className="ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>January</DropdownMenuItem>
                      <DropdownMenuItem>February</DropdownMenuItem>
                      <DropdownMenuItem>March</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Rides</span>
                    <span className="font-medium">142</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hours</span>
                    <span className="font-medium">87.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Distance</span>
                    <span className="font-medium">1,245 miles</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-medium">Total Earnings</span>
                    <span className="font-bold text-rideroot-primary">{formatCurrency(2875.50)}</span>
                  </div>
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

export default DriverEarnings;
