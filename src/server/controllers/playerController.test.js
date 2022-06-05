const { mockPlayers } = require("../../mocks/mockPlayers");
const { getPlayer } = require("./playerControllers");

jest.mock("../../database/model/Player", () => ({
  ...jest.requireActual("../../database/model/Player"),
  find: jest.fn().mockResolvedValue(mockPlayers),
  findById: jest.fn(),
}));

describe("Given the GET players controller", () => {
  describe("When invoked with a response", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    test("Then it should call the response status method 200", async () => {
      await getPlayer(null, res);

      const expectedStatus = 200;

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response json method with a list of players", async () => {
      const expectedGames = mockPlayers;

      await getPlayer(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedGames);
    });
  });
});
