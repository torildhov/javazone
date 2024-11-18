import TalkList from "../components/talks/TalkList";
import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import AddTalk from "../components/talks/AddTalks";
import { useAuth } from "../context/AuthContext";
import { fetchAndSetTalks } from "../utils/talkUtils";

const TalksOverviewPage = () => {
  const { isAuthenticated } = useAuth();
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContext not found!");
  }

  const { isLoading, talks, setTalks } = context;

useEffect(() => {
  fetchAndSetTalks(setTalks);
}, [setTalks]);


  return (
    <>
      <h1>Talks</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <TalkList talks={talks} />
          {isAuthenticated && <AddTalk />}
        </div>
      )}
    </>
  );
};

export default TalksOverviewPage;

