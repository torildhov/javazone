import { getSpeakers } from "../services/speakerService";
import React, { useEffect, useState } from "react";

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
        <ul>
          {speakers.map((speaker) => (
            <li key={speaker._uuid}>
              {speaker.name}, biography: {speaker.biography}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpeakerOverviewPage;
