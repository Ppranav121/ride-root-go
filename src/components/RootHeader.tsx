import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import DriverSidebar from "./DriverSidebar";
interface RootHeaderProps {
  title?: React.ReactNode;
  showBackButton?: boolean;
  showProfileButton?: boolean;
  transparent?: boolean;
  showDriverSidebar?: boolean;
}
const RootHeader: React.FC<RootHeaderProps> = ({
  title,
  showBackButton = true,
  showProfileButton = true,
  transparent = false,
  showDriverSidebar = false
}) => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user
  } = useApp();

  // Get first name for driver sidebar welcome message
  const firstName = user?.name ? user.name.split(' ')[0] : "Driver";
  const isPrimeDriver = user?.isSubscribed || false;
  return <header className={`flex items-center justify-between px-4 py-4 ${transparent ? 'bg-transparent' : 'bg-white shadow-sm'} z-10`}>
      <div className="flex items-center">
        {showBackButton && <button onClick={() => navigate(-1)} className="p-2 rounded-full text-rideroot-text hover:bg-rideroot-lightGrey mr-2 transition-colors" aria-label="Go back">
            <ChevronLeft size={24} />
          </button>}
        {!showBackButton && showDriverSidebar && <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2 rounded-full text-rideroot-text hover:bg-rideroot-lightGrey mr-2 transition-colors">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0">
              <DriverSidebar firstName={firstName} isPrimeDriver={isPrimeDriver} />
            </SheetContent>
          </Sheet>}
        {title && <h1 className="text-lg font-semibold text-rideroot-text tracking-tight">
            {title}
          </h1>}
      </div>

      {showProfileButton && isAuthenticated && (showDriverSidebar ? <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="p-2 rounded-full bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey text-rideroot-text transition-colors">
                <User size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] p-0">
              <DriverSidebar firstName={firstName} isPrimeDriver={isPrimeDriver} />
            </SheetContent>
          </Sheet> : <button onClick={() => navigate("/profile")} className="p-2 rounded-full bg-rideroot-lightGrey hover:bg-rideroot-mediumGrey text-rideroot-text transition-colors" aria-label="View profile">
            
          </button>)}
    </header>;
};
export default RootHeader;