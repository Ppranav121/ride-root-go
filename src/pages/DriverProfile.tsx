
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, Shield, Car, FileText, Star, Camera, 
  ChevronRight, Award, MapPin, CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import RootHeader from "@/components/RootHeader";
import DriverBottomNav from "@/components/DriverBottomNav";

const DriverProfile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  const driverInfo = {
    name: "Michael Johnson",
    rating: 4.9,
    joinedDate: "June 2023",
    trips: 243,
    verified: true,
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      color: "Blue",
      licensePlate: "RR-1234",
    },
    documents: {
      license: {
        verified: true,
        expiryDate: "12/2025",
      },
      insurance: {
        verified: true,
        expiryDate: "06/2024",
      },
      registration: {
        verified: true,
        expiryDate: "09/2024",
      },
    },
    location: "San Francisco, CA",
    badges: ["Top Driver", "Excellent Service", "Punctual"]
  };

  const handleUpdatePhoto = () => {
    toast("Photo upload feature will be available soon!");
  };
  
  const handleEditProfile = () => {
    toast("Profile edit feature will be available soon!");
  };
  
  const handleUpdateDocument = (docType: string) => {
    toast(`${docType} update feature will be available soon!`);
  };
  
  const renderVerifiedBadge = (isVerified: boolean) => {
    if (isVerified) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          <CheckCircle size={12} className="mr-1" /> Verified
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
        Needs Review
      </Badge>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <RootHeader title="Driver Profile" showBackButton />
      
      <div className="flex-1 overflow-auto pb-20">
        {/* Profile Header Section */}
        <div className="bg-gradient-to-r from-rideroot-primary to-rideroot-secondary p-6 text-white">
          <div className="flex items-center">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-white">
                <AvatarImage src="/placeholder.svg" alt={driverInfo.name} />
                <AvatarFallback className="bg-white text-rideroot-primary">
                  {driverInfo.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="secondary" 
                className="absolute bottom-0 right-0 h-7 w-7 rounded-full shadow-md"
                onClick={handleUpdatePhoto}
              >
                <Camera size={14} />
              </Button>
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{driverInfo.name}</h2>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="h-8"
                  onClick={handleEditProfile}
                >
                  Edit
                </Button>
              </div>
              <div className="flex items-center mt-1">
                <Star size={16} className="text-yellow-300 fill-yellow-300 mr-1" />
                <span className="font-medium">{driverInfo.rating}</span>
                <span className="mx-2 text-white/80">•</span>
                <span>{driverInfo.trips} trips</span>
              </div>
              <div className="flex items-center mt-1">
                <MapPin size={14} className="mr-1" />
                <span className="text-sm">{driverInfo.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            {driverInfo.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-white/20 border-white/20 backdrop-blur-sm"
              >
                <Award size={12} className="mr-1" />
                {badge}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="px-4">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mt-4"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-4 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Account Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User size={18} className="text-gray-500 mr-3" />
                        <span>Full Name</span>
                      </div>
                      <span className="text-gray-700">{driverInfo.name}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Star size={18} className="text-gray-500 mr-3" />
                        <span>Rating</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-700 mr-1">{driverInfo.rating}</span>
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText size={18} className="text-gray-500 mr-3" />
                        <span>Member Since</span>
                      </div>
                      <span className="text-gray-700">{driverInfo.joinedDate}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield size={18} className="text-gray-500 mr-3" />
                        <span>Account Status</span>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 space-y-1">
                  <Button variant="ghost" className="w-full justify-between font-normal" onClick={() => navigate("/driver-earnings")}>
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <FileText size={16} className="text-blue-600" />
                      </div>
                      <span>Payment Information</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-between font-normal">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Shield size={16} className="text-green-600" />
                      </div>
                      <span>Security Settings</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-between font-normal" onClick={() => navigate("/driver-help")}>
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <FileText size={16} className="text-purple-600" />
                      </div>
                      <span>Help & Support</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="vehicle" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Vehicle Information</h3>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Car size={24} className="text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">Make</p>
                        <p className="font-medium">{driverInfo.vehicle.make}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Model</p>
                        <p className="font-medium">{driverInfo.vehicle.model}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Year</p>
                        <p className="font-medium">{driverInfo.vehicle.year}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Color</p>
                        <p className="font-medium">{driverInfo.vehicle.color}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-500">License Plate</p>
                        <p className="font-medium">{driverInfo.vehicle.licensePlate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Your vehicle information must match your registration documents.
                    Please keep this information up to date.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="mt-4 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Required Documents</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FileText size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Driver's License</h4>
                          <p className="text-xs text-gray-500">Expires: {driverInfo.documents.license.expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {renderVerifiedBadge(driverInfo.documents.license.verified)}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs mt-1 h-6 px-2"
                          onClick={() => handleUpdateDocument("License")}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <Shield size={18} className="text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Insurance</h4>
                          <p className="text-xs text-gray-500">Expires: {driverInfo.documents.insurance.expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {renderVerifiedBadge(driverInfo.documents.insurance.verified)}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs mt-1 h-6 px-2"
                          onClick={() => handleUpdateDocument("Insurance")}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <Car size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Vehicle Registration</h4>
                          <p className="text-xs text-gray-500">Expires: {driverInfo.documents.registration.expiryDate}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {renderVerifiedBadge(driverInfo.documents.registration.verified)}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs mt-1 h-6 px-2"
                          onClick={() => handleUpdateDocument("Registration")}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Background Check</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      Approved
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    Your background check has been completed and approved. 
                    This is reviewed annually for safety purposes.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <DriverBottomNav />
    </div>
  );
};

export default DriverProfile;
