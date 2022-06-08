const Player = require("../../database/model/Player");
const { getPlayer, deletePlayer } = require("./playerControllers");

jest.mock("../../database/model/Player", () => ({
  ...jest.requireActual("../../database/model/Player"),
  find: jest.fn().mockResolvedValue([
    {
      id: "1990",
      name: "Ronaldo",
      username: "CR7",
      perfil: "Portugal",
      date: "18/06/1990",
      nationality: "Brasil",
      position: "Delantero",
      image:
        "https://phantom-elmundo.unidadeditorial.es/d1768bcbe2e6082856d1337df7a…",
      pac: "66",
      sho: "55",
      pass: "55",
      dri: "45",
      def: "88",
      phy: "99",
    },
    {
      id: "2",
      name: "Buffon",
      username: "bufon",
      perfil: "Italia",
      date: "18/06/1990",
      nationality: "Brasil",
      position: "Delantero",
      image:
        "https://phantom-elmundo.unidadeditorial.es/d1768bcbe2e6082856d1337df7a…",
      pac: "66",
      sho: "55",
      pass: "55",
      dri: "45",
      def: "88",
      phy: "99",
    },
    {
      id: "3",
      name: "Ricardo",
      username: "Kaka",
      perfil: "Brasil",
      date: "18/06/1990",
      nationality: "Brasil",
      position: "Delantero",
      image:
        "https://phantom-elmundo.unidadeditorial.es/d1768bcbe2e6082856d1337df7a…",
      pac: "66",
      sho: "55",
      pass: "55",
      dri: "45",
      def: "88",
      phy: "99",
    },
  ]),
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
      const expectedGames = [
        {
          id: "1990",
          name: "Ronaldo",
          username: "CR7",
          perfil: "Portugal",
          date: "18/06/1990",
          nationality: "Brasil",
          position: "Delantero",
          image:
            "https://phantom-elmundo.unidadeditorial.es/d1768bcbe2e6082856d1337df7a…",
          pac: "66",
          sho: "55",
          pass: "55",
          dri: "45",
          def: "88",
          phy: "99",
        },
        {
          id: "2",
          name: "Buffon",
          username: "bufon",
          perfil: "Italia",
          date: "18/06/1990",
          nationality: "Brasil",
          position: "Delantero",
          image:
            "https://phantom-elmundo.unidadeditorial.es/d1768bcbe2e6082856d1337df7a…",
          pac: "66",
          sho: "55",
          pass: "55",
          dri: "45",
          def: "88",
          phy: "99",
        },
        {
          id: "3",
          name: "Ricardo",
          username: "Kaka",
          perfil: "Brasil",
          date: "18/06/1990",
          nationality: "Brasil",
          position: "Delantero",
          image:
            "https://phantom-elmundo.unidadeditorial.es/d1768bcbe2e6082856d1337df7a…",
          pac: "66",
          sho: "55",
          pass: "55",
          dri: "45",
          def: "88",
          phy: "99",
        },
      ];

      await getPlayer(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedGames);
    });
  });
});

describe("Given a deletePlayer controller", () => {
  describe("When it's invoqued with a response and a request with an id to delete", () => {
    test("Then it should call the response's status method with 200 and the json method with a 'Player deleted' message", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = { params: { idPlayer: 1990 } };

      Player.findByIdAndDelete = jest.fn().mockResolvedValue();

      await deletePlayer(req, res, null);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: "Player deleted" });
    });
  });

  describe("When it's invoqued with a response and a request with a invalid id to delete", () => {
    test("Then it should call the response's status method with 200 and the json method with a 'Player deleted' message", async () => {
      const next = jest.fn();
      const req = { params: { idPlayer: 1990 } };
      const expectedError = {
        message: "No player with that id found",
        code: 404,
      };

      Player.findByIdAndDelete = jest.fn().mockRejectedValue({});
      await deletePlayer(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
