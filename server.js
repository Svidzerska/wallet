const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for this mongoDB should be used
let cards = [
  { id: "1.1", amount: "900", card_number: "4988 4388 4388 4305", currency: "USD", cvv: "355", exp_date: "05/26" },
];

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

app.delete("/api/cards/:id", (req, res) => {
  console.log(req.params.id);
  cards = cards.filter((card) => card.id !== req.params.id);
  res.send(`I received your POST request. Card with id ${req.params.id} was deleted`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
