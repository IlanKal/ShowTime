import React, { useEffect, useState } from "react";
import CardGrid from "../../components/CardGrid/CardGrid";
import { TitleData } from "../../types/title";
import { listTitles, mediaLabels, MediaRoute } from "../../services/titles";
import Loader from "../../components/Loader/Loader";
import "./styles/TitlesListingPage.css";

type Props = {
  mediaType: MediaRoute; // "movie" | "tv"
};

const TitlesListingPage: React.FC<Props> = ({ mediaType }) => {
  const [data, setData] = useState<TitleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    listTitles(mediaType)
      .then((items) => {
        if (isMounted) setData(items);
      })
      .catch((e) => {
        console.error(e);
        if (isMounted) setError("Failed to load data.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [mediaType]);

  if (loading) {
    return <div className="listing-loading"><Loader size="medium" />;</div>;
  }

  if (error) {
    return <div className="listing-error">{error}</div>;
  }

  return (
    <div className="titles-page-container">
      <h1 className="page-title">{mediaLabels[mediaType]}</h1>
      <CardGrid data={data} />
    </div>
  );
};

export default TitlesListingPage;