const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectDB = require("../../database");
const app = require("../index");

const User = require("../../database/model/Player");
const { mockPlayers } = require("../../mocks/mockPlayers");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  User.create();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Given a GET '/players' endpoint", () => {
  const newPlayerRequestReceived = {
    platform: [],
    name: "Buffon",
    username: "buffon1977",
    password: "$2b$10$V6p2MNiQHgdaqKN0dQCakOoNzB32MVwogqwKhRbtP/8fffebD/9k2",
    image:
      "https://www.futbin.com/content/fifa22/img/players/p50332827.png?v=15",
    friends: [],
    enemies: [],
    id: "6288c72ae711820483d3a571",
  };

  describe("When it receives a request", () => {
    test("Then it should receive the created user object", async () => {
      const { body } = await request(app)
        .get("/players")
        .send(newPlayerRequestReceived)
        .expect(200);

      expect(body.players).toBe(mockPlayers[newPlayerRequestReceived]);
    });
  });
});
