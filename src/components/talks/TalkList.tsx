import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DataContext, Talk } from "../../context/DataContext";
import "./TalkItem.css";
import { useContext } from "react";

const TalkList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const context = useContext(DataContext);

  if (!context) {
    throw new Error("Finner ikke DataContext");
  }

  const { talks, rooms, speakers } = context;
  console.log("Talks:", talks); // fungerer
  console.log("Speakers:", speakers); //fungerer
  console.log("Rooms:", rooms); //fungerer

  return (
    <div className="talks-container">
      {talks.map((talk) => {
        const room = rooms.find((room) => room._uuid === talk.roomId);
        const speaker = speakers.find(
          (speaker) => speaker._uuid === talk.speakerId
        );
        console.log("Inne i map speaker:", speaker); // undefined
        console.log("Inne i map room:", room); //undefined

        return (
          <div key={talk._uuid} className="talk-item overview-talk">
            <h2>{talk.title}</h2>
            <p>Time: {talk.time}</p>
            <p>Room: {room ? room.name : "Unknown Room"}</p>
            <p>Speaker: {speaker ? speaker.name : "Unknown Speaker"}</p>
            {isAuthenticated && (
              <div className="talk-buttons">
                <button onClick={() => navigate(`/talks/${talk._uuid}/edit`)}>
                  Edit talk
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TalkList;
