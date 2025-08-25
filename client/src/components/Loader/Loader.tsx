import React from "react";
import { OrbitProgress } from "react-loading-indicators";
import "./Loader.css";

interface LoaderProps {
  size?: "small" | "medium" | "large";
}

const Loader: React.FC<LoaderProps> = ({ size = "medium" }) => {
  return (
    <div className="loader-container">
      <OrbitProgress
        color="#D4AF37"
        size={size}
        text=""
        textColor=""
      />
    </div>
  );
};

export default Loader;
