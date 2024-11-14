import { DataContext } from "../context/DataContext";
import { useContext, useState } from "react";
import "../App.css";

const SpeakerOverviewPage = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { speakers, talks, loading } = context;
  const [chosenSpeaker, setChosenSpeaker] = useState(null);

  //Fetches talks that associates to a particular speaker
  const getTalksForSpeaker = (speakerId: string) => {
    return talks.filter((talk) => talk.speakerId === speakerId);
  };

  const clickChosenSpeaker = (speaker) => {
    setChosenSpeaker(speaker);
  };

  //Clicking back to speaker overview
  const clickBack = () => {
    setChosenSpeaker(null);
  };

  return (
    <div>
      <h1>Speaker Overview</h1>
      {loading ? (
        <p>Loading...</p>
      ) : chosenSpeaker ? (
        <div className="speaker-detail">
          <h2>{chosenSpeaker.name}</h2>
          <p>biography: {chosenSpeaker.biography}</p>
          <h3>Talks</h3>
          {getTalksForSpeaker(chosenSpeaker._uuid).length > 0 ? (
            <ul>
              {getTalksForSpeaker(chosenSpeaker._uuid).map((talk) => (
                <li key={talk._uuid}>
                  <strong>{talk.title}</strong> - Room ID: {talk.roomId}, Time:{" "}
                  {talk.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No talks available for this speaker.</p>
          )}
          <button onClick={clickBack}>Back to overview</button>
        </div>
      ) : (
        <div className="speaker-container">
          {speakers.map((speaker) => (
            <div
              key={speaker._uuid}
              className="speaker-list"
              onClick={() => clickChosenSpeaker(speaker)}
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
