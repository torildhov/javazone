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
    <div className="liTalkItem">
      {talks.map((talk) => (
        <TalkItem key={talk._uuid} talk={talk} />
      ))}
    </div>
  );
};


export default TalkList;
