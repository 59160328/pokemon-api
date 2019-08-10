const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));

let pokemons = [{ name: "Pikachu", type: "Electric" }];

app.get("/pokemons", (req, res) => res.send(pokemons));
app.post("/pokemons", (req, res) => {
  pokemons.push(req.body)
  res.sendStatus(201)
});
app.listen(port, () => console.log(`Example app listening on port ${3000}!`));
