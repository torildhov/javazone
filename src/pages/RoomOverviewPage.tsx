import { DataContext } from "../context/DataContext";
import { useContext, useEffect, useState } from "react";

const RoomOverviewPage = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { rooms, talks, speakers, loading } = context;

  const getTalksForRoom = (roomId: string) => {
    // Finner foredragene som er knyttet til rommet
    return talks
      .filter((talk) => talk.roomId === roomId)
      .map((talk) => ({
        ...talk,
        speaker: speakers.find((speaker) => speaker._uuid === talk.speakerId), // Knytter foredragsholder til foredrag
      }));
  };

  return (
    <div>
      <h1>Romoversikt</h1>
      {loading ? (
        <p>Laster...</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room._uuid}>
              <h2>
                {room.name} (Kapasitet: {room.capacity})
              </h2>
              <h3>Foredrag:</h3>
              {getTalksForRoom(room._uuid).length === 0 ? (
                <p>Ingen foredrag planlagt.</p>
              ) : (
                <ul>
                  {getTalksForRoom(room._uuid).map((talk) => (
                    <li key={talk._uuid}>
                      <p>
                        <strong>Tittel:</strong> {talk.title}
                      </p>
                      <p>
                        <strong>Foredragsholder:</strong>{" "}
                        {talk.speaker ? talk.speaker.name : "Ikke spesifisert"}
                      </p>
                      <p>
                        <strong>Tid:</strong> {talk.time}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomOverviewPage;
