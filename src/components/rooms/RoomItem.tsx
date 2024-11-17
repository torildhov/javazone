import TalkList from "../talks/TalkList";
import { DataContext, Room } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useContext } from "react";
import "./RoomItem.css";

interface RoomItemProps {
  room: Room;
  onDelete: () => void;
  onEdit: () => void;
}

const RoomItem = ({ room, onDelete, onEdit }: RoomItemProps) => {
  const { isAuthenticated } = useAuth();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { talks, speakers } = context;

  const getTalksForRoom = (roomId: string) => {
    return talks
      .filter((talk) => talk.roomId === roomId)
      .map((talk) => ({
        ...talk,
        speaker: speakers.find((speaker) => speaker._uuid === talk.speakerId),
      }));
  };

  const roomTalks = getTalksForRoom(room._uuid || "");

  return (
    <li>
      <h2>
        {room.name} (Kapasitet: {room.capacity})
      </h2>
      <h3>Foredrag:</h3>
      {roomTalks.length === 0 ? (
        <p>No planned talks.</p>
      ) : (
        <div>
          <h3>Foredrag:</h3>
          <TalkList talks={roomTalks} />
        </div>
      )}
      {isAuthenticated && (
        <div>
          <button onClick={onEdit}>Edit room</button>
          <button onClick={onDelete}>Delete room</button>
        </div>
      )}
    </li>
  );
};
export default RoomItem;
