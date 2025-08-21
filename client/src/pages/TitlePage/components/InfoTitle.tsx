// src/components/InfoTitle.tsx (מתוקן)
import React from 'react';
import { FC } from 'react';
import { TitleData } from '../../../types/title';
import '../styles/InfoTitle.css';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const InfoTitle: FC<TitleData> = ({
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
  cast
}) => {
  const imageUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
  const youtubeUrl = `https://www.youtube.com/embed/${trailerKey}`;

  const formatVoteCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  return (
    <div className="info-title-container">
      {/* הרקע הכללי והשכבה העליונה */}
      <div className="title-background" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="overlay"></div>

        {/* התוכן הראשי של הדף */}
        <div className="content-wrapper">
          {/* שורה 1: כותרת ופרטים עליונים */}
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
              <button className="action-button">
                <span className="icon"><AddOutlinedIcon/></span> Watchlist
              </button>
              <button className="action-button">
                <span className="icon"><RemoveRedEyeIcon/></span> Watched
              </button>
              <button className="action-button">
                <span className="icon"><ShareOutlinedIcon/></span> Share
              </button>
            </div>
          </div>
          
          {/* שורה 2: טריילר במרכז */}
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
      
      {/* כל החלק הזה יהיה מיושר לשמאל */}
      <div className="content-below-trailer">
        {/* שורה 3: ז'אנרים */}
        <div className="genres-section">
          {genres.map(genre => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
        </div>

        {/* שורה 4: תקציר */}
        <div className="overview-section">
          <h3>Overview</h3>
          <p>{overview}</p>
        </div>
        
        {/* שורה 5: יוצר */}
        {creator && (
          <div className="creator-section">
            <h3>Creator</h3>
            <div className="person-card">
              <img src={`https://image.tmdb.org/t/p/w200${creator.profilePath}`} alt={creator.name} />
              <span className="person-name">{creator.name}</span>
            </div>
          </div>
        )}

        {/* שורה 6: כוכבים בולטים */}
        {cast.length > 0 && (
          <div className="cast-section">
            <h3>Top Cast</h3>
            <div className="cast-list">
              {cast.slice(0, 8).map(member => (
                <div key={member.name} className="person-card">
                  {member.profilePath ? (
                    <img src={`https://image.tmdb.org/t/p/w200${member.profilePath}`} alt={member.name} />
                  ) : (
                    <div className="placeholder-image">?</div>
                  )}
                  <span className="person-name">{member.name}</span>
                  <span className="character-name">{member.character}</span>
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