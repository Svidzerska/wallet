import { Card } from "../interfaces/Card";

export const cardApi = {
  saveCard: async (card: Card) => {
    const response = await fetch("/api/cards", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ card: card }),
    });
    const body = await response.text();
    console.log(body);
  },
  getCards: async () => {
    const response = await fetch("/api/cards");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  },
  getAddCardInfo: async (digit: string) => {
    try {
      const result = await fetch(`https://lookup.binlist.net/${digit}`);
      console.log(result);
      const json = await result.json();
      return json;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};
