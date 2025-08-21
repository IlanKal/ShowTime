import React from 'react';
import './HeroItem.css';
import StarIcon from '@mui/icons-material/Star';
import { href } from 'react-router-dom';
import HeroItemData from "../../../../types/Hero"
import { Rating } from 'react-simple-star-rating';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface HeroItemProps {
    item: HeroItemData;
}

const HeroItem: React.FC <HeroItemProps> = ({item}) => {
    const formattedDate = new Date(item.releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className='hero-item' style={{backgroundImage: `url(${item.posterUrl})` }}>
            <div className="hero-content">
                <h1 className='hero-title'>{item.title}</h1>
                <div className='hero-meta'>
                <Rating
                        initialValue={item.rating / 2}
                        readonly // disable edit
                        allowFraction // allow half star
                        size={25} 
                        fillColor="#D4AF37" 
                        emptyColor="#121212"
                    />
                    <span className='here-voteCount'>{item.voteCount} Reviews</span>
                    <span className='here-releaseDate'>{formattedDate}</span>
                </div>
                <p className='hero-description'>{item.description}</p>
                <a href={item.trailerUrl} target="_blank" rel="noopener noreferrer" className="hero-trailer-btn">
                <PlayArrowIcon  /> Watch Trailer
                </a>
            </div>    
        </div>
    )
}

export default HeroItem;