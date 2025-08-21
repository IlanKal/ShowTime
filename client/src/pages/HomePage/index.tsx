import React, { useEffect } from "react";
import HeroCarousel from "./components/HeroCarousel/HeroCarousel";
import IntroSection from "./components/IntroSection/IntroSection";
import RegisterSection from "./components/IntroSection/RegisterSection";

const HomePage: React.FC = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div className="home">
            <HeroCarousel />
            <IntroSection />
            <RegisterSection />
            
        </div>
    )
}

export default HomePage;