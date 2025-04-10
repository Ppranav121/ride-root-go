
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Wifi, Battery, Smartphone, Volume2, Moon, Globe, Bluetooth } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import DriverBottomNav from "@/components/DriverBottomNav";
import { toast } from "sonner";

const DriverSettings: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataUsage, setDataUsage] = useState(true);
  const [batteryOptimization, setBatteryOptimization] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [volume, setVolume] = useState(80);
  
  const handleBackgroundLocationToggle = (checked: boolean) => {
    if (checked) {
      toast.info("Background location enables faster ride matching when app is closed");
    }
    setDataUsage(checked);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 flex items-center shadow-sm"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full mr-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Settings</h1>
      </motion.header>
      
      <div className="flex-1 p-4 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <h2 className="text-md font-medium flex items-center mb-3">
            <Smartphone className="h-5 w-5 mr-2 text-rideroot-primary" />
            Mobile Device Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-gray-600" />
                <Label htmlFor="notifications" className="cursor-pointer">Notifications</Label>
              </div>
              <Switch 
                id="notifications" 
                checked={notifications} 
                onCheckedChange={setNotifications}
                className={notifications ? 'bg-rideroot-primary/90' : ''}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Moon className="h-5 w-5 mr-2 text-gray-600" />
                <Label htmlFor="darkMode" className="cursor-pointer">Dark Mode</Label>
              </div>
              <Switch 
                id="darkMode" 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
                className={darkMode ? 'bg-rideroot-primary/90' : ''}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bluetooth className="h-5 w-5 mr-2 text-gray-600" />
                <Label htmlFor="bluetooth" className="cursor-pointer">Bluetooth Audio</Label>
              </div>
              <Switch 
                id="bluetooth" 
                checked={bluetoothEnabled} 
                onCheckedChange={setBluetoothEnabled}
                className={bluetoothEnabled ? 'bg-rideroot-primary/90' : ''}
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <h2 className="text-md font-medium flex items-center mb-3">
            <Battery className="h-5 w-5 mr-2 text-green-600" />
            Performance & Battery
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Battery className="h-5 w-5 mr-2 text-gray-600" />
                <Label htmlFor="battery" className="cursor-pointer">Battery Optimization</Label>
              </div>
              <Switch 
                id="battery" 
                checked={batteryOptimization} 
                onCheckedChange={setBatteryOptimization}
                className={batteryOptimization ? 'bg-rideroot-primary/90' : ''}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-gray-600" />
                <Label htmlFor="location" className="cursor-pointer">Background Location</Label>
              </div>
              <Switch 
                id="location" 
                checked={dataUsage} 
                onCheckedChange={handleBackgroundLocationToggle}
                className={dataUsage ? 'bg-rideroot-primary/90' : ''}
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <h2 className="text-md font-medium flex items-center mb-3">
            <Volume2 className="h-5 w-5 mr-2 text-blue-500" />
            Audio Settings
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="volume" className="flex items-center">
                <Volume2 className="h-4 w-4 mr-2 text-gray-600" />
                Navigation Volume: {volume}%
              </Label>
              <input
                type="range"
                id="volume"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-2 accent-rideroot-primary rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="p-4">
        <Button 
          className="w-full bg-rideroot-primary hover:bg-rideroot-secondary transition-colors"
          onClick={() => toast.success("Settings updated successfully")}
        >
          Save Settings
        </Button>
      </div>
      
      <div className="h-16"></div>
      <DriverBottomNav />
    </div>
  );
};

export default DriverSettings;
