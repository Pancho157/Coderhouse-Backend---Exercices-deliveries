const express = require("express");

const app = express();
const server = app.listen(3000, () => {
  console.log(`Http - Socket Server On - Port: 3000`);
});

app.get("/ingreso", async (req, res) => {
  const { number } = req.body;
});
