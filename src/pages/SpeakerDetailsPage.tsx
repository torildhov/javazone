import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext, Speaker } from "../context/DataContext";
import { getSpecificSpeaker } from "../services/speakerService";
import { fetchAndSetSpeakers } from "../utils/speakerUtils";
import SpeakerItem from "../components/speakers/SpeakerItem";

const SpeakerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const context = useContext(DataContext);
  if (!context) {
    throw new Error("Unable to find DataContext");
  }
  const { setSpeakers } = context;

  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //Fetching specific speaker
  useEffect(() => {
    const fetchSpeaker = async () => {
      if (!id) {
        console.error("Speaker ID is unknown");
        setLoading(false);
        return;
      }
      try {
        const fetchedSpeaker = await getSpecificSpeaker(id);
        setSpeaker(fetchedSpeaker);
      } catch (err) {
        console.error("Failed to fetch the speaker");
      } finally {
        setLoading(false);
      }
    };
    fetchSpeaker();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!speaker) {
    return <p>Speaker not found</p>;
  }

  return (
    <div className="speaker-container">
      <SpeakerItem speaker={speaker} />
    </div>
  );
};

export default SpeakerDetailsPage;
