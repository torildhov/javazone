import { getSpeakers, createSpeaker } from "../services/speakerService";

export const createInitialSpeakers = async () => {
  const existingSpeakers = await getSpeakers();

  if (existingSpeakers.items.length === 0) {
    const defaultSpeakers = [
      { name: "Eduardo Jr Co", biography: "Test Biography" },
      { name: "Eduardo Jr Co", biography: "Test Biography" },
    ];

    for (const speaker of defaultSpeakers) {
      await createSpeaker(speaker);
    }
  }
};
