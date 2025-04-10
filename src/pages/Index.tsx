
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to welcome page instead of root path
    navigate("/welcome");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-rideroot-darkGrey animate-pulse">Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
