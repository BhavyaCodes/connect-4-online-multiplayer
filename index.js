const express = require("express");

const app = express();

app.get("/api/ping", (req, res, next) => {
  res.json({ ping: "pong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
