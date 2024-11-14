import TalkList from "../talks/TalkList";
import { DataContext, Room } from "../../context/DataContext";
import { useContext } from "react";

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
    <li>
      <h2>
        {room.name} (Kapasitet: {room.capacity})
      </h2>
      <h3>Foredrag:</h3>
      {roomTalks.length === 0 ? (
        <p>Ingen foredrag planlagt.</p>
      ) : (
        <TalkList talks={roomTalks} />
      )}
    </li>
  );
};

export default RoomItem;
