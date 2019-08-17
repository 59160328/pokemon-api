// https://bit.ly/2KQb0gR
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => res.send("Hello World!"));
class Pokemon {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.type2 = null;
    this.id = null;
  }
}

let pokemons = [];
pokemons.push(createPokemon("Pikachu", "Electric"));
pokemons.push(createPokemon("Pidgey", "Normal"));

app.get("/pokemons", (req, res) => res.send(pokemons));

app.post("/pokemons", (req, res) => {
  if (isSufficientParam(req.body.name) || isSufficientParam(req.body.type)) {
    res.status(400).send({
      error: "Insufficient parameter: name and type are required paremeter"
    });
    return;
  }
  let p = createPokemon(req.body.name, req.body.type);
  pokemons.push(p);
  res.sendStatus(201);
});

// GET http://localhost:3000/pokemons/1
app.get("/pokemons/:id", (req, res) => {
  let id = req.params.id;
  let p = pokemons[id - 1];
  res.send[p];
});

// ADD TYPE 2
app.put("/pokemons/:id", (req, res) => {
  if (!isSufficientParam(req.body.type)) {
    res.status(400).send({
      error: "Insufficient parameter: name and type are required paremeter"
    });
    return;
  }
  let id = req.params.id;
  if (!isSufficientParam(id)) {
    res.status(400).send({
      error: "Insufficient parameter: name and type are required paremeter"
    });
  }
  let p = pokemons[id - 1];
  if (p === undefined) {
    res
      .status(400)
      .send({ error: "Cannot update pokemon: Pokemon is not found" });
  }

  p.type2 = req.body.type2;
  pokemons[id - 1] = p;
  res.sendStatus[200];
});

app.delete("/pokemons/:id", (req, res) => {
  if (!isSufficientParam(req.body.id)) {
    res.status(400).send({
      error: "Insufficient parameter: name and type are required paremeter"
    });
    return;
  }
  let id = req.params.id;
  let p = pokemons[id - 1];
  if (p === undefined) {
    res
      .status(400)
      .send({ error: "Cannot delete pokemon: Pokemon is not found" });
      return;
  }
  delete pokemons[id - 1];
  res.sentStatus(204);
});

function createPokemon(name, type) {
  let p = new Pokemon(name, type);
  p.id = generateNewId(pokemons.length);
  return p;
}

function generateNewId(num) {
  let newId = num + 1;
  return newId;
}

function isSufficientParam(v) {
  return v !== null || v !== "" || v !== undefined;
}

app.listen(port, () => console.log(`Example app listening on port ${3000}!`));
