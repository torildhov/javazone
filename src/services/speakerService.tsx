const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Fetching the speakers list
export const getSpeakers = async () => {
  return fetch(`${API_URL}/speakers`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch speakers list!");
      }
      return response.json();
    })
    .catch((errorSpeaker) => {
      console.error(errorSpeaker);
      return [];
    });
};
