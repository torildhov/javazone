import { createContext, ReactNode, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export interface Room {
  _uuid: string;
  name: string;
  capacity: number;
}

export interface Talk {
  _uuid: string;
  title: string;
  roomId: string;
  speakerId: string;
  time: string;
}

export interface Speaker {
  _uuid: string;
  name: string;
  biography: string;
}

export interface DataContextType {
  rooms: Room[];
  talks: Talk[];
  speakers: Speaker[];
  isLoading: boolean;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    data: roomsData,
    loading: roomsLoading,
    error: roomsError,
  } = useFetch({
    method: "GET",
    path: "rooms",
  });

  const {
    data: talksData,
    loading: talksLoading,
    error: talksError,
  } = useFetch({
    method: "GET",
    path: "talks",
  });

  const {
    data: speakersData,
    loading: speakersLoading,
    error: speakersError,
  } = useFetch({
    method: "GET",
    path: "speakers",
  });

  const isLoading = roomsLoading || talksLoading || speakersLoading;

  // Hvis noen feil oppstår, logg dem (eller håndter på annen måte)
  useEffect(() => {
    if (roomsError || talksError || speakersError) {
      console.error(
        "Error fetching data:",
        roomsError || talksError || speakersError
      );
    }
  }, [roomsError, talksError, speakersError]);

  return (
    <DataContext.Provider
      value={{
        rooms: roomsData?.items || [],
        talks: talksData?.items || [],
        speakers: speakersData?.items || [],
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
