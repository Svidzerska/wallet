const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for this mongoDB should be used
let cards = [];
let cash = [];

//cards
app.get("/api/cards", (req, res) => {
  res.send({ express: cards });
});

app.post("/api/cards", (req, res) => {
  console.log("cards");
  let input = req.body;
  console.log(input.card);
  cards.push(input.card);
  res.send(`I received your POST request. This is what you sent me: ${input.card}`);
});

app.put("/api/cards/:id", (req, res) => {
  //card from server
  let card = cards.find((card) => card.id === req.params.id);
  let input = req.body.card;

  for (let key in card) {
    if (card[key] !== input[key]) {
      card[key] = input[key];
    }
  }

  const keyInput = Object.keys(input); //[]
  const keyCard = Object.keys(card); //[]
  const newKey = keyInput.filter((keyInput) => !keyCard.find((keyCard) => keyInput === keyCard));

  newKey.forEach((key) => {
    card[key] = input[key];
  });

  res.send(`${req.params.id}`);
});

app.delete("/api/cards/:id", (req, res) => {
  console.log(req.params.id);
  res.send(JSON.stringify(cards.find((card) => card.id === req.params.id)));
  cards = cards.filter((card) => card.id !== req.params.id);
  // res.send(`I received your DELETE request. Card with id ${req.params.id} was deleted`);
});

//cash
app.get("/api/cash", (req, res) => {
  res.send({ express: cash });
});

app.post("/api/cash", (req, res) => {
  let input = req.body;
  console.log(input.cash);
  cash.push(input.cash);
  res.send(`I received your POST request. This is what you sent me: ${input.cash}`);
});

app.put("/api/cash/:id", (req, res) => {
  let cashPocket = cash.find((cashPocket) => cashPocket.currency === req.params.id);
  let input = req.body.cashPocket;
  for (let key in cashPocket) {
    if (cashPocket[key] !== input[key]) {
      cashPocket[key] = input[key];
    }
  }
  res.send(`${req.params.id}`);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
