import { getRooms, createRoom } from "../services/roomService";

// Funksjon for å opprette standardrom hvis ingen rom finnes
export const createInitialRooms = async () => {
  const existingRooms = await getRooms();

  if (existingRooms.items.length === 0) {
    const defaultRooms = [
      { name: "Room A", capacity: 50 },
      { name: "Room B", capacity: 30 },
      { name: "Room C", capacity: 100 },
    ];

    for (const room of defaultRooms) {
      await createRoom(room);
    }
  }
};
