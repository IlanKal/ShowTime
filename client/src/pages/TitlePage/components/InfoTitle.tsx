import React, { FC, useEffect, useState } from 'react';
import { TitleData } from '../../../types/title';
import type { MediaType as PrefMediaType } from '../../../services/preferencesService';
import '../styles/InfoTitle.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useAuth } from '../../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFlags, toggleFavorite, toggleWatchlist } from '../../../services/preferencesService';

const InfoTitle: FC<TitleData> = ({
  id,           
  title,
  releaseYear,
  runtime,
  rating,
  voteCount,
  mediaType,      
  genres,
  backdropPath,
  trailerKey,
  overview,
  creator,
  cast,
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
  const youtubeUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : '';
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useAuth();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [pendingW, setPendingW] = useState(false);
  const [pendingF, setPendingF] = useState(false);
  const mt = mediaType.toLowerCase() as PrefMediaType;

  

  // טעינת מצב כפתורים כשיש משתמש מחובר
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!isAuthenticated || !user) {
        setInWatchlist(false);
        setIsFavorite(false);
        return;
      }
      const flags = await getFlags(user._id, { id, mediaType: mt });
      if (mounted) {
        setInWatchlist(flags.inWatchlist);
        setIsFavorite(flags.isFavorite);
      }
    })();
    return () => { mounted = false; };
  }, [isAuthenticated, user, id, mediaType]);

  const requireAuthOr = (fn: () => void) => {
    if (!isAuthenticated) {
      // מפנה ל-login ושומר נתיב לחזרה
      navigate('/login', { state: { from: location } });
      return;
    }
    fn();
  };

  const onToggleWatchlist = () =>
    requireAuthOr(async () => {
      if (!user) return;
      try {
        setPendingW(true);
        // אופטימיסטי: הופך מצב מיידית
        setInWatchlist((prev) => !prev);
        const added = await toggleWatchlist(user._id, { id, mediaType: mt });
        // סנכרון (למקרה של race)
        setInWatchlist(added);
      } finally {
        setPendingW(false);
      }
    });

  const onToggleFavorite = () =>
    requireAuthOr(async () => {
      if (!user) return;
      try {
        setPendingF(true);
        setIsFavorite((prev) => !prev);
        const added = await toggleFavorite(user._id, { id, mediaType: mt });
        setIsFavorite(added);
      } finally {
        setPendingF(false);
      }
    });

  const formatVoteCount = (count: number) => (count >= 1000 ? (count / 1000).toFixed(1) + 'K' : count);

  return (
    <div className="info-title-container">
      <div className="title-background" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="overlay"></div>

        <div className="content-wrapper">
          <div className="top-section">
            <div className="title-details">
              <h1>{title}</h1>
              <p className="subtitle">{mediaType} · {releaseYear} · {runtime}</p>
            </div>

            <div className="action-buttons">
              <div className="rating-box">
                <span className="rating-score">{rating.toFixed(1)}/10</span>
                <span className="vote-count">{formatVoteCount(voteCount)} votes</span>
              </div>

              {/* Watchlist */}
              <button
                className={`action-button ${inWatchlist ? 'watchlist-page-button' : ''}`}
                onClick={onToggleWatchlist}
                disabled={pendingW}
                aria-pressed={inWatchlist}
                title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                <span className="icon">{inWatchlist ? <DoneOutlinedIcon/> : <AddOutlinedIcon/>}</span>
                {inWatchlist ? 'In Watchlist' : 'Watchlist'}
              </button>

              {/* Favorite */}
              <button
                className={`action-button ${isFavorite ? 'favorited-button' : ''}`}
                onClick={onToggleFavorite}
                disabled={pendingF}
                aria-pressed={isFavorite}
                title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                <span className="icon">{isFavorite ? <FavoriteIcon/> : <FavoriteBorderOutlinedIcon/>}</span>
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </button>

              <button className="action-button">
                <span className="icon"><ShareOutlinedIcon/></span> Share
              </button>
            </div>
          </div>

          {trailerKey && (
            <div className="trailer-section">
              <div className="trailer-container">
                <iframe
                  src={youtubeUrl}
                  title={`${title} trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="content-below-trailer">
        <div className="genres-section">
          {genres.map((g) => <span key={g} className="genre-tag">{g}</span>)}
        </div>

        <div className="overview-section">
          <h3>Overview</h3>
          <p>{overview}</p>
        </div>

        {creator && (
          <div className="creator-section">
            <h3>Creator</h3>
            <div className="person-card">
              <img src={`https://image.tmdb.org/t/p/w200${creator.profilePath}`} alt={creator.name} />
              <span className="person-name">{creator.name}</span>
            </div>
          </div>
        )}

        {cast.length > 0 && (
          <div className="cast-section">
            <h3>Top Cast</h3>
            <div className="cast-list">
              {cast.slice(0, 8).map((m) => (
                <div key={m.name} className="person-card">
                  {m.profilePath ? (
                    <img src={`https://image.tmdb.org/t/p/w200${m.profilePath}`} alt={m.name} />
                  ) : (
                    <div className="placeholder-image">?</div>
                  )}
                  <span className="person-name">{m.name}</span>
                  <span className="character-name">{m.character}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoTitle;