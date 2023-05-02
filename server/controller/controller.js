const {
  getAll,
  postOne,
  updateOne,
  createUser,
  logInUser,
} = require("../model/model");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "1d",
    algorithm: "HS256",
  });
};

const getOrders = async (req, res) => {
  try {
    console.log("reached get orders controller");
    console.log(req.cookies);
    const orders = await getAll();
    res.status(201);
    // console.log("reached get orders");
    // res.send(orders);
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("stuck in controller");
  }
};

const postOrder = (req, res) => {
  console.log("reached the controller", req.body);
  try {
    const order = postOne(req.body);
    res.status(201);
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("stuck in controller");
  }
};

const putOrder = async (req, res) => {
  try {
    const order = await updateOne(req.body);
    // res.json({message: 'ok'})
    res.send(order);
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  const { email, password } = req.body;
  let responseUser;
  try {
    responseUser = await createUser(email, password);
    // console.log('responseuser', responseUser)
    console.log("successful signup");

    if (responseUser._id) {
      const token = createToken(responseUser._id);
      res.status(201);
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 86400, // 1 day
        secure: false,
        domain: "localhost",
        path: "/",
        // maxAge: maxAge * 1000
      });
      console.log("cookie has supposedly been set");
      res.json({ user: responseUser._id });
    } else {
      res.json({ responseUser });
    }
  } catch (error) {
    res.status(400);
    res.json(error); // ?
  }
};

const logIn = async (req, res) => {
  console.log("reached login controller");
  const { email, password } = req.body;
  // console.log("login reached", req.body);
  try {
    const response = await logInUser(email, password);

    if (response._id) {
      console.log("found id");

      res.status(200);
      const token = createToken(response._id);
      console.log("created token");
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 86400, // 1 day
        domain: "localhost",
        path: "/",
        // maxAge: maxAge * 1000
      });
      res.json({ user: response._id });
    } else {
      res.json({ response });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error); // ?
  }
};

module.exports = { getOrders, postOrder, putOrder, signUp, logIn };
