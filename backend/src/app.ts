import express, { Application, Request, Response } from "express";
import { getTilsynList } from "./tilsynList";

const app: Application = express();

const port: number = 3003;

app.get("/tilsyn", (req: Request, res: Response) => {
  res.send(getTilsynList());
});

app.get("/tilsyn/:tilsynId", (req: Request, res: Response) => {
  console.log(req.params.tilsynId);
  res.send(req.params);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
