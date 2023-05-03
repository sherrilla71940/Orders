const { Router } = require("express");
const router = new Router();
const { requireAuth } = require("./middleware/authMiddleware");

const {
  getOrders,
  postOrder,
  putOrder,
  signUp,
  logIn,
} = require("./controller/controller");

router.get("/orders", requireAuth, getOrders); // auth middleware when added breaks client

router.post("/orders", requireAuth, postOrder);

router.put("/orders", requireAuth, putOrder);

router.post("/signup", signUp);

router.post("/login", logIn);

router.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies.newUser);
});

module.exports = router;
