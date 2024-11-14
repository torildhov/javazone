import { DataContext, Speaker } from "../../context/DataContext";
import { useContext, useState } from "react";

interface SpeakerItemProps {
  speaker: Speaker;
}

const SpeakerItem = ({ speaker }: SpeakerItemProps) => {
  const context = useContext(DataContext);
  const [showDetails, setShowDetails] = useState(false);

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { talks } = context;

  //Filter the talks that are associated with the speaker
  const getTalksforSpeaker = talks.filter(
    (talk) => talk.speakerId === speaker._uuid
  );

  const clickChosenSpeaker = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div onClick={clickChosenSpeaker}>
      <h2>{speaker.name}</h2>
      <p>Biography: {speaker.biography}</p>

      {showDetails && (
        <div>
          <h3>Talks</h3>
          {getTalksforSpeaker.length > 0 ? (
            <ul>
              {getTalksforSpeaker.map((talk) => (
                <li key={talk._uuid}>
                  <strong>{talk.title}</strong> - Room ID: {talk.roomId}, Time:{" "}
                  {talk.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No talks available for this speaker.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SpeakerItem;
