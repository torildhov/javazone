import { Speaker, Talk } from "../../context/DataContext";

interface TalkItemProps {
  talk: Talk & { speaker?: Speaker }; // `speaker` er valgfritt
}

const TalkItem = ({ talk }: TalkItemProps) => {
  return (
    <li>
      <p>
        <strong>Tittel:</strong> {talk.title}
      </p>
      <p>
        <strong>Foredragsholder:</strong>{" "}
        {talk.speaker ? talk.speaker.name : "Ikke spesifisert"}
      </p>
      <p>
        <strong>Tid:</strong> {talk.time}
      </p>
    </li>
  );
};

export default TalkItem;
