const { describe, expect, test } = require("@jest/globals");
const mockFunc = require("./mockfunc");
const app = require("../index.js");

describe("my first tests", () => {
  test("It should return correct sum", () => {
    console.log(app);
    expect(mockFunc(1, 2)).toBe(3);
  });
});
