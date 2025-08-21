import React from "react";
import { useNavigate } from "react-router";
import './IntroSection.css';

const RegisterSection: React.FC = () => {
  let navigate = useNavigate();

  const onClick = () =>{
    navigate("/register");
  }

  return (
    <div className="register-section">
      <h2 className="why-us-headline">Why are you still waiting?</h2>
      <button className="cta-button" onClick={onClick}>Register Now</button>
    </div>
  );
};

export default RegisterSection;