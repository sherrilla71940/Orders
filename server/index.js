const { app, port } = require("./app");
const { mongoose } = require("./database/db");

app.listen(port, async () => {
  // console.log(path);
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/orders");
    console.log("MongoDB connected via mongoose ✅");
  } catch (e) {
    console.log(e);
  }
  // added above lines above to see if I can get test working
  console.log(process.env.DASHBOARD_CLIENT);
  console.log(`🚀 Server running on http://localhost:${port}/  ✅`);
});
