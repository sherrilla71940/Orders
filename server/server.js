const { app, port } = require("./index");

app.listen(port, () => {
  // console.log(path);
  console.log(process.env.DASHBOARD_CLIENT);
  console.log(`🚀 Server running on http://localhost:${port}/  ✅`);
});
