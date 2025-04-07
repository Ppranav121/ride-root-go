
import React from "react";

interface MapBackgroundProps {
  children?: React.ReactNode;
}

const MapBackground: React.FC<MapBackgroundProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-73.9857,40.7484,12,0/800x600?access_token=YOUR_TOKEN')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-rideroot-primary/30 via-transparent to-transparent"></div>
      {children}
    </div>
  );
};

export default MapBackground;
