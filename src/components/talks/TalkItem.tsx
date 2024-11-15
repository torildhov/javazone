import { Speaker, Talk } from "../../context/DataContext";
import "./talkItem.css";

interface TalkItemProps {
  talk: Talk & { speaker?: Speaker }; // `speaker` er valgfritt
}

const TalkItem = ({ talk }: TalkItemProps) => {
  return (
    <li className="liTalkItem">
      <p className="pTalkItem">
        <strong>Tittel:</strong> {talk.title}<br />
      
        <strong>Foredragsholder:</strong>{" "}
        {talk.speaker ? talk.speaker.name : "Ikke spesifisert"}<br />
      
        <strong>Tid:</strong> {talk.time}
      </p>
    </li>
  );
};

export default TalkItem;
