import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext, Talk } from "../context/DataContext";
import TalkItem from "../components/talks/TalkItem";
import { updateTalk, deleteTalk, getTalk } from "../services/TalksService";
import AddTalk from '../components/talks/AddTalks';
import { fetchAndSetTalks } from "../utils/talkUtils";



const TalksDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const context = useContext(DataContext);
  if (!context) throw new Error("DataContext not found!");{
    
  }
const { setTalks } = context;

const [talk, setTalk] = useState<Talk | null>(null);
const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (talk) {
      setFormData(talk);
    }
  }, [talk]);

  if (!talk) {
    return <p>Talk not found</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedSpeaker && editedSpeaker._uuid) {
      try {
          await updateSpeaker(editedSpeaker._uuid, editedSpeaker);
          setSpeaker(editedSpeaker);
          setIsEditing(false);
      } catch (err) {
          console.error("Failed to update speaker", err);
      }
  }
  
  };
  fetchTalk();
}, [id]);
// slette foredrag ---
const handleDelete = async () => {
  if (!talk || !talk._uuid) {
    console.error("Talk is missing or does not have an ID.");
    return;
  }
  try {
    await deleteTalk(talk._uuid);
    await fetchAndSetTalks(setTalks);
    navigate("/talks");
  } catch (err) {
    console.error("Failed to delete talk:", err);
  }
};

// Oppdater foredrag
const handleUpdate = async () => {
  if (!talk || !talk._uuid) {
    console.error("Talk is missing or does not have an ID.");
    return;
  }
const newTilte = prompt("Enter new title", talk.title);
const newRoomId = prompt("Enter new room ID", talk.roomId);
const newSpeakerId = prompt("Enter new speaker ID", talk.speakerId);
const newTime = prompt("Enter new time", talk.time);


if(!talk._uuid){
  console.error("Talk is missing or does not have an ID.");
  return;
}
if(newTilte && newRoomId && newSpeakerId && newTime){
  try {
    await updateTalk(talk._uuid, newTilte, newRoomId, newSpeakerId, newTime);
    await fetchAndSetTalks(setTalks);
  
    const updatedEditTalk = await getTalk(talk._uuid);
    setTalk(updatedEditTalk);
  } catch (err) {
    console.error("Failed to update talk:", err);
  }

  return (
    <div className="edit-talk-form">
      <h1>Edit Talk</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="speakerId">Speaker ID:</label>
          <input
            type="text"
            id="speakerId"
            name="speakerId"
            value={formData.speakerId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="roomId">Room ID:</label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );

};

if(loading){
  return <p>Loading...</p>;
}     
if(!talk){
  return <p>ingen foredrag funnet</p>;
}
return(
  <div className="rooms-container single-room-container">
    <TalkItem talk={talk}  onDelete={handleDelete} onEdit={handleUpdate}/>
     < AddTalk />

  </div>
);
};

export default TalksDetailPage;