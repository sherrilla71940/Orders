const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const { app, port } = require("../app");
const { MongoClient } = require("mongodb");
const mongoose = require("../database/db");

let connection;
let db;
let users;
let orders;

// beforeAll(async () => {
//   connection = await MongoClient.connect("mongodb://127.0.0.1:27017/orders", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   // db = connection.db("mongodb://127.0.0.1:27017/orders");
//   db = connection.db("orders");
//   users = db.collection("users");
//   orders = db.collection("orders");
// });

afterAll(async () => {
  await MongoClient.disconnect();
});

describe("GET /", () => {
  test("home page '/' should send a json response and have headers of 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response).resolves.toBe("Hello World"); // when I change wrong data still passing test
    // try removing try catch
  });
  test("status code should be 404 when on non exsistent endpoint", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /signup", () => {
  test("users should be able to sign up", async () => {
    const user = {
      email: "12312312@gmail.com",
      password: "123123",
    };
    const registrationResponse = await request(app).post("/signup").send(user);
    const found = await users.findOne(user);
    // console.log("found user:", found);
    expect(registrationResponse.statusCode).toBe(201);
    expect(found).toContain(user.email);
    // console.log(found.email);
  });
});

// describe("after loggin in or signing up, users should be able to view orders page, but not if they haven't", () => {
//   test("after successful signup user should be able to use cookie to view orders page", async () => {
//     const registrationResponse = await request(app).post("/register")
//     .send({
//       email: '12312312@gmail.com',
//       password: '123123'
//     })

//   });
// })
