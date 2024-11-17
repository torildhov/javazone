import { useState, useContext, useEffect } from 'react';
import { createTalk } from '../../services/TalksService';
import { DataContext } from '../../context/DataContext';
import{fetchAndSetTalks} from '../../utils/talkUtils';

const AddTalk: React.FC = () => {
    const [newTalk, setNewTalk] = useState<string>("");
    const [newRoom, setNewRoom] = useState<string>("");
    const [newTime, setNewTime] = useState<string>("");
    const [newSpeaker, setNewSpeaker] = useState<string>("");
  
    const context = useContext(DataContext);
    if (!context) {
      throw new Error("DataContext not found");
    }
    const { talks, setTalks } = context;
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const title = String(newTalk);
      const speakerId = String(newSpeaker);
      const roomId = String(newRoom);
      const time = String(newTime);
  
      if (title && speakerId && roomId && time) {
        const newTalk = { title, speakerId, roomId, time };
        try {
          await createTalk(newTalk);
          await fetchAndSetTalks(setTalks);
          setNewTalk("");
          setNewRoom("");
          setNewTime("");
          setNewSpeaker("");
        } catch (error) {
          console.error("Failed to create talk:", error);
        }
      } else {
        alert("All fields are required");
      }
    };
  
    useEffect(() => {
      console.log(talks);
    }, [talks]);
  
    return (
      <div>
        <h1>Add New Talk</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={newTalk}
              onChange={(e) => setNewTalk(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="speaker">Speaker:</label>
            <input
              type="text"
              id="speaker"
              value={newSpeaker}
              onChange={(e) => setNewSpeaker(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="room">Room:</label>
            <input
              type="text"
              id="room"
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="time">Time:</label>
            <input
              type="text"
              id="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
          </div>
          <button type="submit">Add Talk</button>
        </form>
      </div>
    );
  };
  
  export default AddTalk;