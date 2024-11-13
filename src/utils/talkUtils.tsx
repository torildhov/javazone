import { getTalks, createTalk } from "../services/TalksService";

export const createInitialTalks = async () => {
  const existingTalks = await getTalks();

  if (existingTalks.length === 0) {
    const defaultTalks = [
      {
        title: "HTML",
        speaker: "Thomas Eriksson",
        time: "20:00",
        
      },
      {
        title: "CSS",
        speaker: "Camilla Lackberg",
        time: "12:00",
        
      }];
      
      for(const talk of defaultTalks){
        await createTalk(talk);
      } }};

    