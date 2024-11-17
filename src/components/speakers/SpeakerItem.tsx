import { DataContext, Speaker } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import "./SpeakerItem.css";

interface SpeakerItemProps {
  speaker: Speaker;
}

const SpeakerItem = ({ speaker }: SpeakerItemProps) => {
  const context = useContext(DataContext);
  const { isAuthenticated } = useAuth();

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { talks } = context;

  //Filter the talks that are associated with the speaker
  const getTalksforSpeaker = talks.filter(
    (talk) => talk.speakerId === speaker._uuid
  );

  const navigate = useNavigate();

  const backButton = (overview: React.MouseEvent) => {
    overview.stopPropagation();
    navigate(-1); //Hide the details
  };

  return (
    <div className="speaker-detail">
      <h2> {speaker.name || "No Name Available"}</h2>
      <p>Biography: {speaker.biography || "No biography available"}</p>
      <br />
      <h3>Talks:</h3>
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
      {isAuthenticated && <button>Edit</button>}
      {isAuthenticated && <button>Delete</button>}
      <br />
      <button onClick={backButton}>Back to overview</button>
    </div>
  );
};

export default SpeakerItem;
