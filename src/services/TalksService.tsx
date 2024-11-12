const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getTalks = async ()=>{
return fetch(`${API_URL}/talks`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
    },
})
    .then((response) => {
    if (!response.ok) {
        throw new Error("Failed to fetch talks");
    }
    return response.json();
    })
    .then((data) => {
    return data;
    })
    .catch((error) => {
    console.error(error);
    return [];
    });
}

export const createTalk = async (talkData: any) => {
    try {
      const response = await fetch(`${API_URL}/talks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify([talkData]),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create talk");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };