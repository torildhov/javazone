import { getSpeakers, getSpecificSpeaker } from "../services/speakerService";
import React, { useEffect, useState } from "react";
import "../App.css";

const SpeakerOverviewPage = () => {
  const [speakers, setSpeakers] = useState([]);
  const [chosenSpeaker, setChosenSpeaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMoreDetails, setLoadingMoreDetails] = useState(false);

  useEffect(() => {
    const fetchSpeakers = async () => {
      const speakerData = await getSpeakers();
      setSpeakers(speakerData.items);
      setLoading(false);
    };
    fetchSpeakers();
  }, []);

  const clickChosenSpeaker = async (id) => {
    setLoadingMoreDetails(true);
    const speakerData = await getSpecificSpeaker(id);
    setChosenSpeaker(speakerData);
    setLoadingMoreDetails(false);
  };

  //Clicking back to speaker overview
  const clickBack = () => {
    setChosenSpeaker(null);
  };

  useEffect(() => {
    console.log("Speakers: ", speakers);
  }, [speakers]);

  return (
    <div>
      <h1>Speaker Overview</h1>
      {loading ? (
        <p>Loading...</p>
      ) : chosenSpeaker ? (
        <div>
          {loadingMoreDetails ? (
            <p>Loading more details..</p>
          ) : (
            <div className="speaker-detail">
              <h2>{chosenSpeaker.name}</h2>
              <p>biography: {chosenSpeaker.biography}</p>
              <button onClick={clickBack}>Back</button>
            </div>
          )}
        </div>
      ) : (
        <div className="speaker-container">
          {speakers.map((speaker) => (
            <div
              key={speaker._uuid}
              className="speaker-list"
              onClick={() => clickChosenSpeaker(speaker._uuid)}
              style={{ cursor: "pointer" }}
            >
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
