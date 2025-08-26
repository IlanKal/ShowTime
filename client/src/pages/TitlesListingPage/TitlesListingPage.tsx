import React, { useEffect, useState } from "react";
import CardGrid from "../../components/CardGrid/CardGrid";
import { TitleData } from "../../types/title";
import { listTitles, mediaLabels, MediaRoute } from "../../services/titles";
import Loader from "../../components/Loader/Loader";
import "./styles/TitlesListingPage.css";


type FetcherArgs = { signal: AbortSignal };
type Fetcher = (args: FetcherArgs) => Promise<TitleData[]>;

type Props = {
  title: React.ReactNode;
  fetcher: Fetcher;
  toolbar?: React.ReactNode;
  emptyMessage?: string;
};

const TitlesListingPage: React.FC<Props> = ({
  title,
  fetcher,
  toolbar,
  emptyMessage ="No itmes to display."
}) => {
  const [data, setData] = useState<TitleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetcher({ signal: controller.signal })
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
  }, [fetcher]);

  if (loading) {
    return (
      <div className="listing-loading">
        <Loader size="medium" />
      </div>
    );
  }

  if (error) {
    return <div className="listing-error">{error}</div>;
  }

  return (
    <div className="titles-page-container">
      <div className="peage-header">
      <h1 className="page-title">{title}</h1>
      {toolbar && <div className="page-toolbar"> {toolbar}</div>}
      </div>

      {data.length === 0 ? (
        <div className="listing-empty"> {emptyMessage} </div>
      ) : (
      <CardGrid data={data} />
      )}
    </div>
  );
};

export default TitlesListingPage;