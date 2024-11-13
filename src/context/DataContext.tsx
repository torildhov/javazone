import { createContext, useEffect, useState, ReactNode } from "react";
import { getRooms } from "../services/roomService";
import { getTalks } from "../services/TalksService";
import { getSpeakers } from "../services/speakerService";

interface Room {
  _uuid: string;
  name: string;
  capacity: number;
}

interface Talk {
  _uuid: string;
  title: string;
  roomId: string;
  speakerId: string;
  time: string;
}

interface Speaker {
  _uuid: string;
  name: string;
  biography: string;
}

interface DataContextType {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  talks: Talk[];
  setTalks: React.Dispatch<React.SetStateAction<Talk[]>>;
  speakers: Speaker[];
  setSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [talks, setTalks] = useState<Talk[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const roomsData = await getRooms();
        const talksData = await getTalks();
        const speakersData = await getSpeakers();

        setRooms(roomsData.items);
        setTalks(talksData.items);
        setSpeakers(speakersData.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(rooms);
  }, [rooms]);

  return (
    <DataContext.Provider
      value={{
        rooms,
        setRooms,
        talks,
        setTalks,
        speakers,
        setSpeakers,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
