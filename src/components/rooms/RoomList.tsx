import { useContext } from "react";
import RoomItem from "./RoomItem";
import { DataContext } from "../../context/DataContext";

const RoomList = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { rooms } = context;

  return (
    <div className="liRoomItem">
      {rooms.map((room) => (
        <RoomItem key={room._uuid} room={room} />
      ))}
    </div>
  );  
};

export default RoomList;
