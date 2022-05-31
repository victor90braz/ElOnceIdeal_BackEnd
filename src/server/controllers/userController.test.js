const User = require("../../database/model/User");
const { mockNewUser } = require("../../mocks/mocksUsers");
const registerUser = require("./userControllers");

jest.mock("../../database/model/User", () => ({
  ...jest.requireActual("../../database/model/User"),
  create: jest.fn(),
  findOne: jest.fn(),
  hash: jest.fn(),
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a Register funtion", () => {
  describe("When it`s invoked whith a response", () => {
    test("Then it should call the response method status with 201", async () => {
      const req = {
        body: {
          username: "Buffon",
          password: "71",
          name: "Gian Luiggi Buffon",
        },
      };

      const expectedStatus = 201;
      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
  describe("When it's called with an existen username", () => {
    test("Then it should call response with error message 'User already exists'", async () => {
      const req = {
        body: mockNewUser,
      };

      const expectErrorMessage = new Error();
      expectErrorMessage.customMessage = "User already exists";

      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue(true);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });
});
