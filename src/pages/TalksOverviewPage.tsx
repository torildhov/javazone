import { useEffect, useState } from 'react';
import { getTalks } from '../services/TalksService';

const TalksOverviewPage = () => {
  const [talks, setTalks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTalks = async () => {
      try {
        const data = await getTalks();
        setTalks(data);
      } catch (error) {
        console.error('Error fetching talks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTalks();
  }, []);


  useEffect(() => {
    console.log('Talks:', talks);
  }, [talks]);

  return (
    <div>
      <h1>Foredrag Overview</h1>
      {loading ? (
        <p>Loading...</p>
      ) : talks.length > 0 ? (
        <ul>
          {talks.map((talk: any) => (
            <li key={talk.id}>
              <h3>Title: {talk.title}</h3>
              <p>Speaker: {talk.speaker}</p>
              <p>Date: {new Date(talk.date).toLocaleDateString()}</p>
              {talk.description && <p>Description: {talk.description}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No talks available.</p>
      )}
    </div>
  );
};

export default TalksOverviewPage;
