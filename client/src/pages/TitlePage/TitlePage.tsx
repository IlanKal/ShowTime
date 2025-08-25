// src/pages/TitlePage/TitlePage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import InfoTitle from './components/InfoTitle';
import { TitleData } from '../../types/title';
import { getTitle, MediaRoute } from '../../services/titles'; // ← שירות
import './styles/TitlePage.css';

type RouteParams = { mediaType?: string; id?: string };

const TitlePage: React.FC = () => {
  const [data, setData] = useState<TitleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { mediaType, id } = useParams<RouteParams>();
  const location = useLocation();
  const stateData = location.state as TitleData | undefined; // מגיע מה-Card (אם יש)

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // אם הגענו מה-Card עם state — מציירים מיידית
        if (stateData && mounted) {
          setData(stateData);
        }

        // ולידציה לנתיב
        if (!mediaType || !id) {
          throw new Error('Missing ID or media type in URL.');
        }
        const type = mediaType.toLowerCase();
        if (type !== 'movie' && type !== 'tv') {
          throw new Error('Invalid media type.');
        }
        const numericId = Number(id);
        if (!Number.isFinite(numericId)) {
          throw new Error('ID is not a valid number.');
        }

        // הקריאה הרשמית תמיד דרך ה-service
        const fresh = await getTitle(type as MediaRoute, numericId);

        if (!fresh) {
          throw new Error('Data not found for this ID.');
        }
        if (mounted) setData(fresh);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (mounted) setError('Failed to load data. Please try again later.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [mediaType, id, stateData]);

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</div>;
  }

  if (data) {
    return <InfoTitle {...data} />;
  }

  return null;
};

export default TitlePage;
