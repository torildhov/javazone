import { useContext, useEffect, useState } from "react";
import { createRoom } from "../../services/roomService";
import { DataContext } from "../../context/DataContext";
import { fetchAndSetRooms } from "../../utils/roomUtils";

const AddRoom: React.FC = () => {
  const [newRoomName, setNewRoomName] = useState<string>("");
  const [newRoomCapacity, setNewRoomCapacity] = useState<string>("");

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Finner ikke DataContext");
  }
  const { rooms, setRooms } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const capacity = Number(newRoomCapacity);

    if (newRoomName && !isNaN(capacity)) {
      const newRoom = { name: newRoomName, capacity };
      await createRoom(newRoom); // Legg til nytt rom i API
      await fetchAndSetRooms(setRooms); // Oppdater rooms-staten

      setNewRoomName("");
      setNewRoomCapacity("");
    } else {
      console.log("Alle felter må fylles ut");
    }
  };

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  return (
    <div>
      <h2>Add Room</h2>
      <form action="">
        <input
          type="text"
          placeholder="Name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Capacity"
          value={newRoomCapacity}
          onChange={(e) => {
            setNewRoomCapacity(e.target.value);
          }}
        />

        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Add new room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
