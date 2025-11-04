import React, { useState, useEffect } from "react";
import { MOVIE_GENRES, MovieGenre } from "../../utils/movieGenres"; 
import "./GenreSelection.css";

type Props = {
  selectedGenres?: MovieGenre[];
  onSave: (selected: MovieGenre[]) => void;
  onCancel?: () => void;
};

const GenreSelection: React.FC<Props> = ({ selectedGenres = [], onSave, onCancel }) => {
  const [selected, setSelected] = useState<MovieGenre[]>([]);

  useEffect(() => {
    setSelected(selectedGenres);
  }, [selectedGenres]);

  const toggleGenre = (genre: MovieGenre) => {
    if (selected.includes(genre)) {
      setSelected(selected.filter((g) => g !== genre));
    } else {
      setSelected([...selected, genre]);
    }
  };

  return (
    <div className="genre-screen-overlay">
      <div className="genre-screen-content">
        <h2>Select Your Favorite Genres</h2>
        <div className="genre-buttons-container">
          {MOVIE_GENRES.map((genre) => (
            <button
              key={genre}
              className={`genre-btn ${selected.includes(genre) ? "selected" : ""}`}
              onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="genre-screen-actions">
          <button onClick={() => onSave(selected)}>Save</button>
          {onCancel && <button onClick={onCancel}>Cancel</button>}
        </div>
      </div>
    </div>
  );
};

export default GenreSelection;
