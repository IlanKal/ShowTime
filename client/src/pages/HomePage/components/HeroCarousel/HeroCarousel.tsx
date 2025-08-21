import React, { useState, useEffect } from "react";
import HeroItem from "./HeroItem";
import mockHeroData from "../../../../data/mockHeroData";
import './HeroCarousel.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HeroCarousel: React.FC = () => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    const handlePrev = () => {
        setCurrentItemIndex((prevIndex) =>
            prevIndex === 0 ? mockHeroData.length -1 : prevIndex - 1);
    };

    const handleNext = () => {
        setCurrentItemIndex((nextIndex) =>
            nextIndex === mockHeroData.length -1 ? 0 : nextIndex + 1);
    };

    const currentItem = mockHeroData[currentItemIndex]; // 0

    useEffect(() => {
        const intervalId = setInterval(handleNext, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [handleNext]); 

    return (
        <div className="hero-carousel">
          <HeroItem item={currentItem} />
    
          <div className="carousel-controls">
            <button className="carousel-arrow prev" onClick={handlePrev}>
              <ArrowBackIosIcon />
            </button>
            <button className="carousel-arrow next" onClick={handleNext}>
              <ArrowForwardIosIcon />
            </button>
          </div>
    
          <div className="carousel-dots">
            {mockHeroData.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentItemIndex ? 'active' : ''}`}
                onClick={() => setCurrentItemIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      );
};

export default HeroCarousel;