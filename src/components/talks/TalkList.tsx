import { Talk } from "../../context/DataContext";
import TalkItem from "./TalkItem";

interface TalkListProps {
  talks: Talk[];
}

const TalkList = ({ talks }: TalkListProps) => {
  if (!talks || talks.length === 0) {
    return <p>Ingen foredrag tilgjengelig.</p>;
  }

  return (
    <ul>
      {talks.map((talk) => (
        <TalkItem key={talk._uuid} talk={talk} />
      ))}
    </ul>
  );
};

export default TalkList;
