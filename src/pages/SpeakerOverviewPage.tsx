import SpeakerList from "../components/speakers/SpeakerList";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

const SpeakerOverviewPage = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { isLoading } = context;

  return (
    <div>
      <h1>Speakers</h1>
      {isLoading ? <p>Loading...</p> : <SpeakerList />}
    </div>
  );
};

export default SpeakerOverviewPage;
