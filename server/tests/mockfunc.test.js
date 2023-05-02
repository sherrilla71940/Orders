const { describe, expect, test } = require("@jest/globals");
const request = require("supertest");
const { app, port } = require("../index");
const { MongoClient } = require("mongodb");

let connection;
let db;
let users;

beforeAll(async () => {
  connection = await MongoClient.connect("mongodb://127.0.0.1:27017/orders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // db = connection.db("mongodb://127.0.0.1:27017/orders");
  db = connection.db("orders");
  // const database = client.db('my-database');
  users = db.collection("users");
});

afterAll(async () => {
  await connection.close();
});

describe("home route should work", () => {
  test("home page '/' should send a json response and have headers of 200", async () => {
    try {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
    } catch (e) {
      console.log(e);
    }
  });
  test("status code should be 404 when on non exsistent endpoint", async () => {
    try {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(404);
    } catch (e) {
      console.log(e);
    }
  });
});

describe("should save user to db", () => {
  test("after sign up user email and password should be stored in db", async () => {
    try {
      const email = "12312312@gmail.com";
      const registrationResponse = await request(app).post("/register").send({
        email: email,
        password: "123123",
      });
      const found = await users.findOne({ email: email });
      // console.log("found", found);
      // console.dir(found);
      expect(found).toBeTruthy();
    } catch (e) {
      console.log(e);
    }
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
