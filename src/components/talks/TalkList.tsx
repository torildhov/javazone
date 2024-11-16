import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Talk } from '../../context/DataContext';

const TalkList = ({ talks }: { talks: Talk[] }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <ul className="talk-list">
      {talks.map((talk) => (
        <li key={talk._uuid} className="talk-item">
          <h2>{talk.title}</h2>
          <p>Time: {talk.time}</p>
          <p>Rom: {talk.roomId}</p>
          <p>Foredragholder: {talk.speakerId}</p>
          {isAuthenticated && (
            <button onClick={() => navigate(`/talks/${talk._uuid}/edit`)}>
              Edit
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TalkList;

