import { getRooms, createRoom } from "../services/roomService";

export const createInitialRooms = async () => {
  try {
    const existingRooms = await getRooms();

    if (existingRooms.items.length === 0) {
      const defaultRooms = [
        { name: "Room A", capacity: 50 },
        { name: "Room B", capacity: 30 },
        { name: "Room C", capacity: 100 },
      ];

      for (const room of defaultRooms) {
        const result = await createRoom(room);
        if (result) {
          console.log(`Created room: ${room.name}`);
        }
      }
    }
  } catch (error) {
    console.error("Error in createInitialRooms:", error);
  }
};
