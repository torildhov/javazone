import TalkList from "../talks/TalkList";
import { DataContext, Room } from "../../context/DataContext";
import { useContext } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

interface RoomItemProps {
  room: Room;
}

const RoomItem = ({ room }: RoomItemProps) => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { talks, speakers } = context;
  const navigate = useNavigate();

  const getTalksForRoom = (roomId: string) => {
    return talks
      .filter((talk) => talk.roomId === roomId)
      .map((talk) => ({
        ...talk,
        speaker: speakers.find((speaker) => speaker._uuid === talk.speakerId),
      }));
  };

  const roomTalks = getTalksForRoom(room._uuid);

  return (
    <div className="room-detail">
      <h1>{room.name}</h1>
      <h2> Kapasitet: {room.capacity}</h2>

      {roomTalks.length === 0 ? (
        <p>Ingen foredrag planlagt.</p>
      ) : (
        <div>
          <h3>Foredrag:</h3>
          <TalkList talks={roomTalks} />
        </div>
      )}
      <button onClick={() => navigate(-1)} style={{ margin: "1rem" }}>
        Go back
      </button>
    </div>
  );
};

export default RoomItem;
