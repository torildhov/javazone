import { getSpeakers, createSpeaker } from "../services/speakerService";

export const createInitialSpeakers = async () => {
  const existingSpeakers = await getSpeakers();

  if (existingSpeakers.items.length === 0) {
    const defaultSpeakers = [
      { name: "Severus Snape", biography: "Potion Master" },
      { name: "Harry Potter", biography: "Youngest seeker of the century" },
      { name: "Hermione Granger", biography: "Excellent student" },
    ];

    for (const speaker of defaultSpeakers) {
      await createSpeaker(speaker);
    }
  }
};
