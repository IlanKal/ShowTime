import React from "react";
import './HomePage.css';
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";

const HomePage: React.FC = () => {
    return (
        <div className="home">
            <HeroCarousel />
        </div>
    )
}

export default HomePage;