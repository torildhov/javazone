import { useContext } from "react";
import { Talk, Speaker, Room, DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import "./talkItem.css";

interface TalkItemProps {
  talk: Talk & { speaker?: Speaker };
  onDelete: () => void;
  onEdit: () => void;
}

const TalkItem = ({ talk, onDelete, onEdit }: TalkItemProps) => {
  const navigate = useNavigate();
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("DataContext not found");
  }

  const { speakers, rooms } = context;

  const getRoomForTalk = (roomId: string): Room | undefined => {
    return rooms.find((room) => room._uuid === roomId);
  };

  const getSpeakerForTalk = (speakerId: string): Speaker | undefined => {
    return speakers.find((speaker) => speaker._uuid === speakerId);
  };

  const room = getRoomForTalk(talk.roomId);
  const speaker = getSpeakerForTalk(talk.speakerId);

  const backButton = (overview: React.MouseEvent) => {
    overview.stopPropagation();
    navigate("/talks");
  };

  return (
    <div className="pTalkItem">
      <h2>{talk.title}</h2>
      <p>Foredragsholder: {speaker ? speaker.name : "Ikke spesifisert"}</p>
      <p>Tid: {talk.time}</p>
      <p>Rom: {room ? room.name : "Rom ikke spesifisert"}</p>
      <div className="talk-buttons">
        <button onClick={onEdit}>Rediger</button>
        <button onClick={onDelete}>Slett</button>
      </div>
      <br />
      <button onClick={backButton}>Back to Overview</button>
    </div>
  );
};

export default TalkItem;
