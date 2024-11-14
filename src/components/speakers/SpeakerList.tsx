import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import SpeakerItem from "./SpeakerItem";
import "../../App.css";

const SpeakerList = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { speakers } = context;

  return (
    <div className="speaker-container">
      {speakers.map((speaker) => (
        <SpeakerItem key={speaker._uuid} speaker={speaker} />
      ))}
    </div>
  );
};

export default SpeakerList;
