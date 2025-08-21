import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfoTitle from './components/InfoTitle';
import { mockTitles } from '../../data/mockTitleData';
import { TitleData } from '../../types/title';
import './styles/TitlePage.css';

const TitlePage: React.FC = () => {
  const [data, setData] = useState<TitleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { mediaType, id } = useParams<{ mediaType: string; id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!id || !mediaType) {
          throw new Error('Missing ID or media type in URL.');
        }

        // נחפש את הנתונים הנכונים במערך mockTitles
        // נשתמש ב-toLowerCase() כדי להבטיח שההשוואה לא רגישה לאותיות
        const foundTitle = mockTitles.find(
          title => title.id === parseInt(id) && title.mediaType.toLowerCase() === mediaType.toLowerCase()
        );

        if (foundTitle) {
          setData(foundTitle);
        } else {
          throw new Error('Data not found for this ID.');
        }
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, mediaType]);

  if (loading) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
        {error}
      </div>
    );
  }

  if (data) {
    return <InfoTitle {...data} />;
  }
  
  return null; 
};

export default TitlePage;
