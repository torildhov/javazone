import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Talk } from '../../context/DataContext';
import "./TalkItem.css";


const TalkList = ({ talks }: { talks: Talk[] }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="talks-container">
      {talks.map((talk) => (
        <div key={talk._uuid} className="talk-item overview-talk">
          <h2>{talk.title}</h2>
          <p>Time: {talk.time}</p>
          <p>Room: {talk.roomId}</p>
          <p>Speaker: {talk.speakerId}</p>
          {isAuthenticated && (
            <div className="talk-buttons">
              <button onClick={() => navigate(`/talks/${talk._uuid}/edit`)}>
                Edit talk
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
);

};

export default TalkList;

