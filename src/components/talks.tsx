import {useEffect, useState} from 'react';

export default function Talks() {
    const [talks, setTalks] = useState<Talk[]>([]);
  
    useEffect(() => {
      const fetchTalks = async () => {
        try {
          const response = await fetch('/api/talks');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setTalks(data);
        } catch (error) {
          console.error('Error fetching talks:', error);
        }
      };
  
      fetchTalks();
    }, []);
  
    return (
      <div>
        <h1>Foredrag</h1>
        {talks.length > 0 ? (
          <ul>
            {talks.map((talk) => (
              <li key={talk.id}>
                <h3>Title:</h3>
                <p>Speaker:</p>
                <p>Date: </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No talks available.</p>
        )}
      </div>
    );
  }