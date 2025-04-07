
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = "" }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`absolute top-4 left-4 z-10 ${className}`}>
      <button 
        onClick={handleClick}
        className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white"
      >
        <ArrowLeft size={24} />
      </button>
    </div>
  );
};

export default BackButton;
