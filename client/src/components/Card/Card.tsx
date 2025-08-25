import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'; // plus icon for watchlist
import { TitleData } from '../../types/title';
import './Card.css';

interface CardProps {
    data: TitleData;
  }

const Card: React.FC<CardProps> = ({ data }) => {
    const navigate = useNavigate();

    const posterUrl = data.posterPath
    ? `https://image.tmdb.org/t/p/w500${data.posterPath}`
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s';

    const handleCardClick  = () => {
        navigate(`/title/${data.mediaType.toLowerCase()}/${data.id}`, { state: data })
    }

    const handleWatchlistClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        console.log(`Added "${data.title}" to Watchlist!`);
      };

    return (
        <div className="card-container">
      <div className="card-image-content" onClick={handleCardClick}>
        <img src={posterUrl} alt={data.title} className="card-poster" />
        <div className="background-card">
          <h3 className="card-title">{data.title}</h3>
        </div>
      </div>
      <button className="watchlist-button" onClick={handleWatchlistClick}>
        <AddOutlinedIcon /> Watchlist
      </button>
    </div>
  );
};

export default Card;