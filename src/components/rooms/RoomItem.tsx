import TalkList from "../talks/TalkList";
import { DataContext, Room } from "../../context/DataContext";
import { useContext } from "react";
import "./RoomItem.css";

interface RoomItemProps {
  room: Room;
}

const RoomItem = ({ room }: RoomItemProps) => {
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

  const roomTalks = getTalksForRoom(room._uuid);

  return (
    <div className="pRoomItem">
      <h2>{room.name}</h2>
      <p>Capacity: {room.capacity}</p>
      <h3>Talk:</h3>
      {roomTalks.length === 0 ? (
        <p>No planned talks.</p>
      ) : (
        <TalkList talks={roomTalks} />
      )}
    </div>
  );
  
};

export default RoomItem;
