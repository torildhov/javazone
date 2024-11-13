import { getSpeakers } from "../services/speakerService";
import React, { useEffect, useState } from "react";
import "../App.css";

const SpeakerOverviewPage = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      const speakerData = await getSpeakers();
      setSpeakers(speakerData.items);
      setLoading(false);
    };
    fetchSpeakers();
  }, []);

  useEffect(() => {
    console.log("Speakers: ", speakers);
  }, [speakers]);

  return (
    <div>
      <h1>Speaker Overview</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="speaker-container">
          {speakers.map((speaker) => (
            <div key={speaker._uuid} className="speaker-list">
              <h2>{speaker.name}</h2>
              <p>biography: {speaker.biography}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeakerOverviewPage;
