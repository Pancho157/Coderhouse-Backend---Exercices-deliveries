const express = require("express");

const app = express();
const server = app.listen(3000, () => {
  console.log(`Http - Socket Server On - Port: 3000`);
});

app.get("/", async (req, res) => {
  res.send(
    JSON.stringify({
      FyH: new Date().toLocaleString(),
    })
  );
});
