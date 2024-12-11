import { describe, expect, it } from "@jest/globals";
import User from "../user";

describe("user", () => {
  it("should be able to create a new user", () => {
    const userData = {
      name: "adriano",
      email: "adriano@gmail.com",
    };
    const user = new User(userData.name, userData.email);

    expect(user.create()).toEqual(userData);
  });

  it("should not be able to create a new user with invalid email", () => {
    const userData = {
      name: "adriano",
      email: "adrianogmail.com",
    };
    expect(() => new User(userData.name, userData.email).create()).toThrowError(
      "Invalid email"
    );
  });

  it("should not be able to create a new user with invalid name", () => {
    const userData = {
      name: "ards",
      email: "adriano@gmail.com",
    };
    expect(() => new User(userData.name, userData.email).create()).toThrowError(
      "Invalid user"
    );
  });
});
