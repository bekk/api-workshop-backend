import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./data.json");

const app = express();

const port = process.env.PORT || 3003;

app.get("/tilsyn", (req, res) => {
  res.send(data);
});

app.get("/tilsyn/:tilsynId", (req, res) => {
  console.log(req.params.tilsynId);
  res.send(req.params);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
