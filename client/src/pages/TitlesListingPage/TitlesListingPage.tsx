import React, { useEffect, useState } from "react";
import CardGrid from "../../components/CardGrid/CardGrid";
import { TitleData } from "../../types/title";
import { listTitles } from "../../services/titles";
import Loader from "../../components/Loader/Loader";
import GenreSelection from "../../components/GenreSelection/GenreSelection";
import { MovieGenre } from "../../utils/movieGenres";
import "./styles/TitlesListingPage.css";

type FetcherArgs = { signal: AbortSignal; genres?: MovieGenre[] };
type Fetcher = (args: FetcherArgs) => Promise<TitleData[]>;

type Props = {
  title: React.ReactNode;
  fetcher: Fetcher;
  toolbar?: React.ReactNode;
  emptyMessage?: string;
  showGenrePicker?: boolean; 
};

const TitlesListingPage: React.FC<Props> = ({
  title,
  fetcher,
  toolbar,
  emptyMessage = "No items to display.",
  showGenrePicker = false,
}) => {
  const [data, setData] = useState<TitleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [showGenreScreen, setShowGenreScreen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<MovieGenre[]>([]);

  const loadData = (genres?: MovieGenre[]) => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetcher({ signal: controller.signal, genres })
      .then((items) => setData(items))
      .catch((e) => {
        if (controller.signal.aborted) return;
        console.error(e);
        setError("Failed to load data.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  };

  useEffect(() => {
    loadData(selectedGenres);
  }, [fetcher, selectedGenres]);

  useEffect(() => {
    if (showGenrePicker && selectedGenres.length === 0) {
      setShowGenreScreen(true);
    }
  }, [showGenrePicker, selectedGenres]);

  return (
    <div className="titles-page-container">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        {toolbar && <div className="page-toolbar">{toolbar}</div>}
        {showGenrePicker && (
          <button className="choose-genres-btn" onClick={() => setShowGenreScreen(true)}>
            Choose Genres
          </button>
        )}
      </div>

      {showGenreScreen && (
        <GenreSelection
          selectedGenres={selectedGenres}
          onSave={(genres) => {
            setSelectedGenres(genres);
            setShowGenreScreen(false);
            loadData(genres);
          }}
          onCancel={() => setShowGenreScreen(false)}
        />
      )}

      {loading ? (
        <div className="listing-loading">
          <Loader size="medium" />
        </div>
      ) : error ? (
        <div className="listing-error">{error}</div>
      ) : data.length === 0 ? (
        <div className="listing-empty">{emptyMessage}</div>
      ) : (
        <CardGrid data={data} />
      )}
    </div>
  );
};

export default TitlesListingPage;
