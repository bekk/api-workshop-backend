import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const tilsynsListe = require("./data");


const app = express();

const port = process.env.PORT || 3003;


app.get("/tilsyn", (req, res) => {
  const mappedJsonData = tilsynsListe.entries
  .map(
    (tilsyn => 
      {
        return {
         navn: tilsyn.navn,
         poststed: tilsyn.poststed,
         postnr: tilsyn.postnr,
         dato: tilsyn.dato,
         smilefjes: tilsyn.karakter1
        }
      })
  )

  res.send(mappedJsonData);
});

app.get("/tilsyn/:tilsynId", (req, res) => {
  console.log(req.params.tilsynId);
  res.send(req.params);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
