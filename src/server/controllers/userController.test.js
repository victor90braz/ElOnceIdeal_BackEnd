const bcrypt = require("bcrypt");
const User = require("../../database/model/User");

const {
  mockNewUser,
  mockToken,
  mockUserCredentials,
  mockLogin,
} = require("../../mocks/mocksUsers");
const { registerUser, loginUser } = require("./userControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(() => true),
  hash: jest.fn().mockResolvedValue(() => "mockPasswordEncrypted"),
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => mockToken,
}));

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
      const message = { msg: "User created" };
      const expectedStatus = 201;

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(message);

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(message);
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
      User.findOne = jest.fn().mockResolvedValue(mockUserCredentials);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectErrorMessage);
    });
  });

  describe("When it's invoqued with a request with an invalid user and a response", () => {
    test("Then it should call the received next function with an error", async () => {
      const req = {
        body: {
          username: "",
          password: "",
          name: "",
        },
      };
      const next = jest.fn();

      const expectedError = new Error();
      expectedError.code = 400;
      expectedError.message = "Bad request";

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockRejectedValueOnce(expectedError);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given userLogin function", () => {
  describe("When it's called with correct user credentials", () => {
    test("Then it should call response method status with 200 and method json with a token", async () => {
      const req = {
        body: {
          id: 1,
          username: "username",
          password: "password",
        },
      };

      const expectedStatus = 200;

      User.findOne = jest.fn().mockResolvedValue(true);

      await loginUser(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });
  });

  describe("When it's called with incorrect username", () => {
    test("Then it should call next method with 'Incorrect username or password'", async () => {
      const req = {
        body: {
          name: "username",
          username: "passwordIncorrect",
        },
      };
      const next = jest.fn();
      const expectedError = new Error();
      expectedError.code = 401;
      expectedError.message = "Incorrect username or password";

      User.findOne = jest.fn().mockRejectedValueOnce(expectedError);

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it's called with incorrect password", () => {
    test("Then it should call next method with 'Incorrect username or password'", async () => {
      // Arrange
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const req = {
        body: {
          id: 1,
          username: "username",
          password: "incorrectPassword",
        },
      };

      const expectError = new Error();
      expectError.customMessage = "Incorrect username or password";

      const next = jest.fn();

      // Act
      await loginUser(req, null, next);

      // Assert
      expect(next).toHaveBeenCalledWith(expectError);
    });
  });

  describe("When it is called with a user that is already in the database", () => {
    test("Then it should call the 'next' middleware with an error", async () => {
      const req = {
        body: {
          mockLogin,
        },
      };

      User.findOne.mockImplementation(() => true);

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const next = jest.fn();
      await loginUser(req, res, next);

      const error = new Error();
      error.statusCode = 403;
      error.customMessage = "bad request";

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
