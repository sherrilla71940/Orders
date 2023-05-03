const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const { mongoose } = require("mongoose");
const { userSchema } = require("../database/models");
const { app } = require("../app");

let connection;
let UserModel;
let user;

function generateUsername() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890_";
  const usernameLength = Math.floor(Math.random() * 10) + 3; // Generates a number between 3 and 12
  const usernameArray = new Array(usernameLength).fill(alphabet);
  const username = usernameArray
    .map((letters) => letters[Math.floor(Math.random() * letters.length)])
    .join("");

  let emails = ["@gmail.com", "@hotmail.com", "@yahoo.com", "@outlook.com"];
  let randomIndex = Math.floor(Math.random() * emails.length);
  let randomEmail = emails[randomIndex];

  return username + randomEmail;
}

beforeAll(async () => {
  user = {
    email: generateUsername(),
    password: "123123",
  };
  try {
    connection = await mongoose.connect("mongodb://127.0.0.1:27017/orders");
    console.log("connected to db");
    UserModel = mongoose.model("user", userSchema);
  } catch (e) {
    console.log("error in db connection", e);
  }
});

afterAll(async () => {
  try {
    await UserModel.deleteOne(user);
    await connection.disconnect();
    console.log("disconnected from db");
    console.log(UserModel);
  } catch (e) {
    console.log("couldnt disconnect");
  }
});

describe("GET /", () => {
  test("home page '/' should send a json response and have headers of 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.text).toBe('"Hello World!"'); // when I change wrong data still passing test
    // try removing try catch
  });
  test("status code should be 404 when on non exsistent endpoint", async () => {
    const response = await request(app).get("/asdasd");
    expect(response.statusCode).toBe(404);
  });
});

describe.only("POST /signup", () => {
  test("Database should store user after successful signup", async () => {
    const registrationResponse = await request(app).post("/signup").send(user);
    expect(registrationResponse.statusCode).toBe(201);
    expect(Object.keys(registrationResponse.body)).toHaveLength(1); // should only have user id
  });
});
