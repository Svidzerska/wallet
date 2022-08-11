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
      const json = await result.json();
      console.log(json);
      return { scheme: json.scheme, type: json.type };
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  deleteCard: async (id: string) => {
    const response = await fetch(`/api/cards/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    return body;
  },
};
