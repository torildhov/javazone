import { getRooms } from "../services/roomService";

import React, { useEffect, useState } from "react";

const RoomOverviewPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();
      setRooms(data.items);
      setLoading(false);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    console.log("Rom: ", rooms);
  }, [rooms]);

  return (
    <div>
      <h1>Romoversikt</h1>
      {loading ? (
        <p>Laster...</p>
      ) : (
        <>
          <ul>
            {rooms.map((room) => (
              <li key={room._uuid}>
                {room.name}, kapasitet: {room.capacity}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default RoomOverviewPage;
