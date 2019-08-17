const request = require("supertest");
const chai = require("chai");
const app = require("../app");
chai.should();

describe("Pokemon API", () => {
  describe("GET /", () => {
    it('should return 200 OK with "Hello World!"', done => {
      request(app)
        .get("/")
        .expect(200)
        .end((err, res) => {
          res.body.should.deep.equal({ message: "Hello World!" });
          done();
        });
    });
  });
  describe("GET /pokemons/:id", () => {
    it('should return "Pikachu", "Electric" with "id = 1"', done => {
      request(app)
        .get("/pokemons/2")
        .expect(200)
        .end((err, res) => {
          res.body.should.have.property("name");
          res.body.should.have.property("type");
          res.body.should.deep.equal({ name: "Pidgey", type: "Normal" });
          done();
        });
    });
    it("should return 400 Bad Request", done => {
      request(app)
        .get("/pokemons/99")
        .expect(400)
        .end((err, res) => {
          res.body.error.should.equal(
            "Insufficient parameter: name and type are required paremeter"
          );
          done();
        });
    });
  });
  describe("POST /pokemons", () => {
    it("should return 201 Created and have new pokemon", done => {
      request(app)
        .post("/pokemon")
        .sent({ name: "Unknow", type: "Unknow" })
        .set("Accept", "application/json")
        .expect(201, done);
      done();
    });
    it("should return 400 Bad Request when missed require field", done => {
      request(app)
        .post("/pokemons")
        .expect(400)
        .end((err, res) => {
          res.body.error.should.equal(
            "Insufficient parameter: name and type are required paremeter"
          );
        });
      done();
    });
  });
  describe("PUT /pokemons", () => {
    it("should return 200 OK Created and the pokemon has type2", done => {
      done();
    });
    it("should return 400 Bad Request when try to update not exited pokemom", done => {
      done();
    });
  });
  describe("Integration Test", () => {
    it("GET /pokemons should return list of pokemons", done => {
      request("http://localhost:3000")
        .expect(200)
        .end((err, res) => {
          res.body.should.be.a("array");
          pokemons = res.body
          pokemons.length.should.equal(1)
          done();
        });
    });
  });
});
