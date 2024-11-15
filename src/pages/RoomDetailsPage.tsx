import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext, Room } from "../context/DataContext";
import RoomItem from "../components/rooms/RoomItem";

const RoomDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Finner ikke DataContext");
  }
  const { rooms } = context;

  const room = rooms.find((room) => room._uuid === id);

  return (
    <div>
      <RoomItem key={room._uuid} room={room} />
    </div>
  );
};

export default RoomDetailsPage;
