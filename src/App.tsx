
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

// Pages
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Welcome from "./pages/Welcome";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import BookRide from "./pages/BookRide";
import RideConfirmation from "./pages/RideConfirmation";
import RideTracking from "./pages/RideTracking";
import RideCompletion from "./pages/RideCompletion";
import RideCancellation from "./pages/RideCancellation";
import Profile from "./pages/Profile";
import Rides from "./pages/Rides";
import NotFound from "./pages/NotFound";

// Driver Pages
import DriverSignUp from "./pages/DriverSignUp";
import DriverHome from "./pages/DriverHome";
import DriverRide from "./pages/DriverRide";
import DriverEarnings from "./pages/DriverEarnings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/book-ride" element={<BookRide />} />
            <Route path="/ride-confirmation" element={<RideConfirmation />} />
            <Route path="/ride-tracking" element={<RideTracking />} />
            <Route path="/ride-completion" element={<RideCompletion />} />
            <Route path="/ride-cancellation" element={<RideCancellation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rides" element={<Rides />} />
            
            {/* Driver Routes */}
            <Route path="/driver-signup" element={<DriverSignUp />} />
            <Route path="/driver-home" element={<DriverHome />} />
            <Route path="/driver-ride" element={<DriverRide />} />
            <Route path="/driver-earnings" element={<DriverEarnings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
