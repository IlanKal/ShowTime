import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { TitleData } from '../../types/title';
import './Card.css';

import { useAuth } from '../../context/AuthContext';
import { getFlags, toggleWatchlist } from '../../services/preferencesService';
import { normalizeMediaType } from '../../utils/mediaType'; // ("Movie"/"Tv") -> "movie" | "tv"

interface CardProps {
  data: TitleData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const posterUrl = data.posterPath
    ? `https://image.tmdb.org/t/p/w500${data.posterPath}`
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoWcWg0E8pSjBNi0TtiZsqu8uD2PAr_K11DA&s';

  const mediaType = normalizeMediaType(String(data.mediaType));

  const [inWatchlist, setInWatchlist] = useState(false);
  const [pending, setPending] = useState(false);

  // טען מצב ראשוני של הכפתור כשיש יוזר
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!isAuthenticated || !user) {
        setInWatchlist(false);
        return;
      }
      const flags = await getFlags(user._id, { id: data.id, mediaType });
      if (mounted) setInWatchlist(flags.inWatchlist);
    })();
    return () => { mounted = false; };
  }, [isAuthenticated, user, data.id, mediaType]);

  const handleCardClick = () => {
    navigate(`/title/${mediaType}/${data.id}`, { state: { ...data, mediaType } });
  };

  const handleWatchlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      // מפנה ל-login ושומר לאן לחזור
      navigate('/login', { state: { from: location } });
      return;
    }
    if (!user) return;

    try {
      setPending(true);
      // עדכון אופטימיסטי
      setInWatchlist(prev => !prev);
      const added = await toggleWatchlist(user._id, { id: data.id, mediaType });
      // סנכרון סופי
      setInWatchlist(added);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="card-image-content">
        <img src={posterUrl} alt={data.title} className="card-poster" />
        <div className="background-card">
          <h3 className="card-title">{data.title}</h3>
        </div>
      </div>

      <button
        className="watchlist-button"
        onClick={handleWatchlistClick}
        disabled={pending}
        aria-pressed={inWatchlist}
        title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      >
        {inWatchlist ? <DoneOutlinedIcon /> : <AddOutlinedIcon />}
        {inWatchlist ? ' In Watchlist' : ' Watchlist'}
      </button>
    </div>
  );
};

export default Card;
