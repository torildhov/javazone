import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, Room } from "../context/DataContext";
import RoomItem from "../components/rooms/RoomItem";
import { deleteRoom } from "../services/roomService";
import { fetchAndSetRooms } from "../utils/roomUtils";

const RoomDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Context
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Finner ikke DataContext");
  }
  const { rooms, setRooms } = context;

  // Finn rommet
  const room = rooms.find((room) => room._uuid === id);
  if (!room) {
    return <p>Rom ikke funnet</p>;
  }

  //Slett rom
  const handleDelete = async () => {
    if (!room._uuid) {
      console.error("Room ID is missing.");
      return;
    }
    try {
      await deleteRoom(room._uuid); // Slett rommet fra API
      await fetchAndSetRooms(setRooms); // Oppdater rooms-staten
      navigate("/rooms"); // Naviger tilbake til rooms-siden
    } catch (err) {
      console.error("Failed to delete room:", err);
    }
  };

  return (
    <div className="rooms-container">
      <RoomItem key={room._uuid} room={room} onDelete={handleDelete} />
    </div>
  );
};

export default RoomDetailsPage;
