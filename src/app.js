import express from "express";
import { getTilsynList } from "./tilsynList.js";

const app = express();

const port = 3003;

app.get("/tilsyn", (req, res) => {
  res.send(getTilsynList());
});

app.get("/tilsyn/:tilsynId", (req, res) => {
  console.log(req.params.tilsynId);
  res.send(req.params);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
