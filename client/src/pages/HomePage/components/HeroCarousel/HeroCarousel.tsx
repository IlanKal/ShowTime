import React, { useState, useEffect, useCallback } from "react";
import HeroItem from "./HeroItem";
import './HeroCarousel.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchHeroData } from "../../../../services/heroService"; 
import { HeroItemData } from "../../../../types/Hero"; 

const HeroCarousel: React.FC = () => {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [heroData, setHeroData] = useState<HeroItemData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const data = await fetchHeroData();
            setHeroData(data);
            setIsLoading(false);
        };
        loadData();
    }, []); 

    // Function for next item, memoized with useCallback
    const handleNext = useCallback(() => {
        if (heroData.length === 0) return; 

        setCurrentItemIndex((nextIndex) =>
            nextIndex === heroData.length - 1 ? 0 : nextIndex + 1);
    }, [heroData.length]); 
    
    // Function for previous item
    const handlePrev = () => {
        if (heroData.length === 0) return;

        setCurrentItemIndex((prevIndex) =>
            prevIndex === 0 ? heroData.length - 1 : prevIndex - 1);
    };

    const currentItem = heroData[currentItemIndex]; 

    // Effect for the automatic carousel interval
    useEffect(() => {
        if (heroData.length > 0) {
            const intervalId = setInterval(handleNext, 10000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [handleNext, heroData.length]);

    // Render loading state
    if (isLoading) {
        return <div className="hero-carousel loading">Loading hero content...</div>;
    }

    // Render empty state
    if (heroData.length === 0) {
        return <div className="hero-carousel error">Failed to load content, or no items available.</div>;
    }

    // Main render
    return (
        <div className="hero-carousel">
            {/* Display the current HeroItem */}
            {currentItem && <HeroItem item={currentItem} />}
    
            {/* Carousel Controls */}
            <div className="carousel-controls">
                <button className="carousel-arrow prev" onClick={handlePrev}>
                    <ArrowBackIosIcon />
                </button>
                <button className="carousel-arrow next" onClick={handleNext}>
                    <ArrowForwardIosIcon />
                </button>
            </div>
    
            {/* Pagination Dots */}
            <div className="carousel-dots">
                {heroData.map((_, index) => (
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