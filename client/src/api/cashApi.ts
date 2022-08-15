import { Cash } from "../interfaces/Cash";

export const cashApi = {
  saveCash: async (cash: Cash) => {
    const response = await fetch("/api/cash", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cash: cash }),
    });
    const body = await response.text();
    console.log(body);
  },
  getCash: async () => {
    const response = await fetch("/api/cash");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  },
};
