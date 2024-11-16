import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import "../../App.css";

const RoomsList = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { rooms } = context;
  const navigate = useNavigate();

  const handleRoomClick = (id: string) => {
    navigate(`/rooms/${id}`);
  };

  return (
    <div className="rooms-container">
      {rooms.map((room) => (
        <div
          className="liRoomItem"
          key={room._uuid}
          onClick={() => handleRoomClick(room._uuid)}
          style={{ cursor: "pointer" }}
        >
          <h2> {room.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default RoomsList;
